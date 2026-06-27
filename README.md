# MZ PharmaConsult

A comprehensive **PharmD study companion** — notes & books links plus a **hybrid case-quiz engine** spanning the full pharmacy curriculum.

The quiz tries **live AI-generated questions** first (via a Vercel serverless function that keeps your Anthropic API key server-side), and **falls back to a curated, vetted question bank** if the AI is unavailable, times out, or no key is set. There's also a **"Use curated questions only"** toggle for zero-cost, fully-offline drilling.

- **Frontend:** pure HTML / CSS / vanilla JS — no React, no bundler, no build step.
- **Backend:** one serverless function, `api/generate.js`, that proxies the Anthropic Messages API.
- **Storage:** `localStorage` for quiz history and quick notes only.

---

## File structure

```
mz-pharmaconsult/
├── index.html
├── styles.css
├── app.js
├── questions.js          ← curated bank: window.QUESTION_BANK = [...]
├── api/
│   └── generate.js       ← Vercel serverless function (proxies Anthropic API)
├── vercel.json
├── .gitignore            ← ignores .env, .vercel, node_modules
├── .env.example          ← contains: ANTHROPIC_API_KEY=
└── README.md
```

---

## 1. Run locally

You have two options:

### a) Curated bank only (no AI, no setup)
Just open `index.html` in your browser. The AI call to `/api/generate` won't exist, so the quiz automatically **falls back to the curated bank**. This is the fastest way to preview the site.

> Tip: turn ON **"Use curated questions only"** in the quiz setup to skip the (failing) AI call entirely and avoid the brief loading delay.

### b) Full app with live AI (serverless function running)
The AI function needs the Vercel CLI:

```bash
npm i -g vercel          # install the Vercel CLI once
cd mz-pharmaconsult
cp .env.example .env     # then edit .env and paste your key (see below)
vercel dev               # serves the site AND the /api/generate function locally
```

Open the URL it prints (usually http://localhost:3000). Now AI generation works locally.

Your local `.env` should contain:

```
ANTHROPIC_API_KEY=sk-ant-...your key...
```

`.env` is **git-ignored** — never commit it.

---

## 2. Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
cd mz-pharmaconsult
vercel               # first run: link/create the project (answer the prompts)
vercel --prod        # deploy to production
```

### Option B — Git repository
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In the [Vercel dashboard](https://vercel.com/new), **Import** the repo.
3. No build settings needed (it's static + a serverless function). Click **Deploy**.

---

## 3. Set the API key — environment variable ONLY

**Never put the key in code or commit it to Git.** Set it in Vercel:

**Vercel → Project → Settings → Environment Variables**
- **Name:** `ANTHROPIC_API_KEY`
- **Value:** your key from <https://console.anthropic.com/>
- **Environments:** Production (and Preview/Development if you want AI there too)

Or via CLI:
```bash
vercel env add ANTHROPIC_API_KEY production
# paste the key when prompted, then redeploy:
vercel --prod
```

If the key is missing, the function returns `{ "error": "No API key configured" }` and the site **gracefully falls back to the curated bank** — it still works.

---

## 4. Set a spending limit (do this before sharing the site)

Live generation **costs per question**. Before you share the link:

1. Go to the [Anthropic Console](https://console.anthropic.com/) → **Billing / Limits**.
2. **Set a monthly spending limit** so heavy use can't produce a surprise bill.

Consider leaning on the curated bank (or defaulting the "curated only" toggle on) if cost is a concern.

---

## 5. Replace the Drive links

In `index.html`, find and replace:
- `__DRIVE_LINK_1__` → your **Lecture Notes** Google Drive folder URL
- `__DRIVE_LINK_2__` → your **Reference Books** Google Drive folder URL

Then set **both Drive folders** to **"Anyone with the link → Viewer"** so students can open them.

---

## 6. Add questions to the curated bank

Open `questions.js` and copy one object in `window.QUESTION_BANK`. The shape:

```js
{
  subject: "Clinical Pharmacy",   // must match a subject in the SUBJECTS list (app.js)
  style: "scenario",              // "scenario" or "simple"
  difficulty: "Moderate",         // "Easy" | "Moderate" | "Hard"
  scenario: "A 70-year-old ...",  // the vignette; use "" for simple-style questions
  question: "Which ... ?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"], // EXACTLY 4, not pre-lettered
  correctIndex: 1,                // 0-based index of the correct option
  explanation: "Why right, why the main distractors are wrong (2-3 sentences)."
}
```

**Vet every question for accuracy** — the curated bank is your offline fallback and your QC responsibility.

### Add a subject
1. Add the subject name to the `SUBJECTS` array near the top of `app.js`.
2. Add questions in `questions.js` using that exact subject string.

The subject chips are generated automatically from the `SUBJECTS` array.

---

## Deploy commands (quick reference)

```bash
npm i -g vercel
cd mz-pharmaconsult
vercel                                   # link & deploy a preview
vercel env add ANTHROPIC_API_KEY production   # set the key (paste when prompted)
vercel --prod                            # deploy to production
```

---

## Safety checklist (don't skip)

1. **API key as an environment variable in Vercel only** — never in code, never in Git. Confirm `.env` is git-ignored.
2. **Set a spending cap in the Anthropic Console** before sharing the link.
3. **Leave the AI disclaimer in** — it's non-negotiable for a medical study tool with unreviewed questions.
4. **Vet the curated bank** — you're the quality control; read every fallback question for accuracy.
5. **Replace the two Drive links** and set both folders to "Anyone with the link → Viewer".
6. **Test on your actual phone**, including a few live AI questions, and confirm the fallback works (try it with the key removed).
7. **Watch your API usage the first week** to decide how much to lean on the curated bank.

---

*MZ PharmaConsult is a study aid. Always verify answers against authentic textbooks before relying on them for exams.*
