// Vercel serverless function — proxies the Anthropic Messages API.
//
// The Anthropic API key is read from process.env.ANTHROPIC_API_KEY and stays
// SERVER-SIDE. The browser only ever calls /api/generate on the same origin.
// Set the key in Vercel → Project → Settings → Environment Variables.
//
// Request body (JSON):
//   { subject, difficulty, style, count, previousStems }
//     style: "scenario" | "simple" | "mixed"
//
// Response: a clean JSON array of validated question objects, or { error }.

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 2000;

function buildSystemPrompt() {
  return [
    "You are a PharmD exam item-writer for the FULL pharmacy curriculum.",
    "Produce medically and scientifically accurate, exam-grade multiple-choice questions for the given subject.",
    "The subject may be ANY PharmD subject — basic sciences (Anatomy, Physiology), pharmaceutics-side subjects",
    "(Pharmaceutics, Dosage Form Science, Physical Pharmacy, Industrial Pharmacy), Pharmacognosy, or clinical",
    "subjects (Pharmacology, Clinical Pharmacy, Community Pharmacy).",
    "",
    "STYLE RULES:",
    '- "scenario": write realistic applied vignettes. Clinical cases where appropriate; for non-clinical subjects',
    "  write applied problem scenarios (e.g. a formulation, a lab measurement, an extraction).",
    '- "simple": write concise, direct-recall MCQs with no vignette.',
    '- "mixed": produce a blend of scenario and simple items.',
    "",
    "OUTPUT RULES:",
    "- Return ONLY a valid JSON array. No markdown, no code fences, no prose before or after.",
    "- Each element MUST be an object with EXACTLY this shape:",
    "  {",
    '    "subject": string,',
    '    "style": "scenario" | "simple",',
    '    "difficulty": "Easy" | "Moderate" | "Hard",',
    '    "scenario": string,   // the vignette for scenario style; empty string "" for simple style',
    '    "question": string,',
    '    "options": [string, string, string, string],   // EXACTLY 4, NOT pre-lettered (no "A.", "B.")',
    '    "correctIndex": 0 | 1 | 2 | 3,',
    '    "explanation": string   // 2-3 sentences: why right, why the main distractors are wrong',
    "  }",
    "- Make distractors plausible, not obviously wrong.",
    "- Do NOT prefix options with letters or numbers.",
    "- Keep explanations to 2-3 sentences.",
  ].join("\n");
}

function buildUserPrompt({ subject, difficulty, style, count, previousStems }) {
  const lines = [
    `Subject: ${subject}`,
    `Difficulty: ${difficulty}`,
    `Style: ${style}`,
    `Number of questions: ${count}`,
  ];
  if (Array.isArray(previousStems) && previousStems.length) {
    lines.push("");
    lines.push("Avoid repeating or closely paraphrasing these recent questions:");
    previousStems.slice(0, 25).forEach((stem) => lines.push(`- ${stem}`));
  }
  lines.push("");
  lines.push("Return ONLY the JSON array.");
  return lines.join("\n");
}

// Strip ```json fences / stray prose and return the JSON array text.
function extractJsonArray(text) {
  if (typeof text !== "string") return null;
  let t = text.trim();
  // Remove leading/trailing code fences.
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  // Grab the outermost [ ... ] just in case there is surrounding prose.
  const first = t.indexOf("[");
  const last = t.lastIndexOf("]");
  if (first === -1 || last === -1 || last <= first) return null;
  return t.slice(first, last + 1);
}

const VALID_DIFFICULTY = new Set(["Easy", "Moderate", "Hard"]);

function sanitizeQuestions(arr, fallbackSubject) {
  if (!Array.isArray(arr)) return [];
  const clean = [];
  for (const item of arr) {
    if (!item || typeof item !== "object") continue;
    const options = item.options;
    if (!Array.isArray(options) || options.length !== 4) continue;
    if (options.some((o) => typeof o !== "string" || !o.trim())) continue;

    const correctIndex = Number(item.correctIndex);
    if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex > 3) continue;

    if (typeof item.question !== "string" || !item.question.trim()) continue;

    const style = item.style === "simple" ? "simple" : "scenario";
    const difficulty = VALID_DIFFICULTY.has(item.difficulty) ? item.difficulty : "Moderate";

    clean.push({
      subject: typeof item.subject === "string" && item.subject.trim() ? item.subject : fallbackSubject,
      style,
      difficulty,
      scenario: typeof item.scenario === "string" ? item.scenario : "",
      question: item.question.trim(),
      options: options.map((o) => String(o).trim()),
      correctIndex,
      explanation: typeof item.explanation === "string" ? item.explanation : "",
    });
  }
  return clean;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Clear error so the frontend can fall back to the curated bank.
    return res.status(500).json({ error: "No API key configured" });
  }

  try {
    // Vercel parses JSON bodies automatically, but guard for string bodies too.
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    const subject = String(body.subject || "Pharmacology");
    const difficulty = VALID_DIFFICULTY.has(body.difficulty) ? body.difficulty : "Moderate";
    const style = ["scenario", "simple", "mixed"].includes(body.style) ? body.style : "mixed";
    let count = Number(body.count);
    if (!Number.isInteger(count) || count < 1) count = 5;
    count = Math.min(count, 10);
    const previousStems = Array.isArray(body.previousStems) ? body.previousStems : [];

    const anthropicRes = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: buildSystemPrompt(),
        messages: [
          { role: "user", content: buildUserPrompt({ subject, difficulty, style, count, previousStems }) },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text().catch(() => "");
      return res.status(502).json({ error: "Upstream API error", status: anthropicRes.status, detail: detail.slice(0, 500) });
    }

    const data = await anthropicRes.json();
    const text = Array.isArray(data.content)
      ? data.content.map((b) => (b && b.type === "text" ? b.text : "")).join("")
      : "";

    const jsonText = extractJsonArray(text);
    if (!jsonText) {
      return res.status(502).json({ error: "Model did not return JSON" });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      return res.status(502).json({ error: "Failed to parse model JSON" });
    }

    const questions = sanitizeQuestions(parsed, subject);
    if (!questions.length) {
      return res.status(502).json({ error: "No valid questions returned" });
    }

    return res.status(200).json({ questions: questions.slice(0, count) });
  } catch (err) {
    // Never crash — return JSON so the frontend fallback triggers.
    return res.status(500).json({ error: "Generation failed", detail: String(err && err.message ? err.message : err) });
  }
}
