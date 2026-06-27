export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { subject, style, difficulty, count, previousStems } = req.body;

  const prompt = `You are a pharmacy exam question writer. Generate ${count} multiple-choice questions for PharmD students.

Subject: ${subject}
Style: ${style === "scenario" ? "clinical scenario (vignette-based)" : style === "simple" ? "direct factual" : "mix of both"}
Difficulty: ${difficulty}
Avoid repeating these question stems: ${(previousStems || []).join("; ")}

Return ONLY a valid JSON object in this exact format, no extra text:
{
  "questions": [
    {
      "subject": "${subject}",
      "style": "scenario",
      "difficulty": "${difficulty}",
      "scenario": "clinical vignette here or empty string if simple",
      "question": "question stem here?",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": 0,
      "explanation": "2-3 sentence explanation of why the correct answer is right and why others are wrong."
    }
  ]
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Generation failed" });
  }
}
