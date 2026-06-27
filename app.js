/* MZ PharmaConsult — frontend logic (vanilla JS, no build step) */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------------
   * SUBJECTS — this single array drives the subject chips.
   * Add a subject here (and add matching questions in questions.js) to extend.
   * ------------------------------------------------------------------------- */
  var SUBJECTS = [
    "Pharmacology",
    "Pharmacognosy",
    "Industrial Pharmacy",
    "Physiology",
    "Anatomy",
    "Dosage Form Science",
    "Physical Pharmacy",
    "Community Pharmacy",
    "Clinical Pharmacy",
  ];

  var LETTERS = ["A", "B", "C", "D"];
  var HISTORY_KEY = "mzpc_history";
  var NOTES_KEY = "mzpc_quicknotes";
  var API_TIMEOUT_MS = 25000;

  /* ---------------------------- tiny helpers ------------------------------ */
  function $(id) {
    return document.getElementById(id);
  }
  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  function readStore(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* ignore quota / privacy-mode errors */
    }
  }

  /* ============================ TAB SWITCHING ============================ */
  function setupTabs() {
    var tabs = document.querySelectorAll(".tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });
        ["notes", "quiz"].forEach(function (name) {
          var panel = $("panel-" + name);
          var on = name === target;
          panel.classList.toggle("is-active", on);
          panel.hidden = !on;
        });
      });
    });
  }

  /* ============================ QUICK NOTES ============================= */
  function setupQuickNotes() {
    var form = $("quicknotes-form");
    var input = $("quicknote-input");
    var list = $("quicknotes-list");
    var empty = $("quicknotes-empty");

    function render() {
      var notes = readStore(NOTES_KEY, []);
      list.innerHTML = "";
      empty.hidden = notes.length > 0;
      notes.forEach(function (note, idx) {
        var li = el("li", "quicknote");
        var span = el("span", "quicknote-text", note.text);
        var del = el("button", "quicknote-del", "✕");
        del.setAttribute("aria-label", "Delete note");
        del.addEventListener("click", function () {
          var current = readStore(NOTES_KEY, []);
          current.splice(idx, 1);
          writeStore(NOTES_KEY, current);
          render();
        });
        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      var notes = readStore(NOTES_KEY, []);
      notes.unshift({ text: text, ts: Date.now() });
      writeStore(NOTES_KEY, notes);
      input.value = "";
      render();
    });

    render();
  }

  /* ============================ QUIZ STATE ============================= */
  var state = {
    subject: SUBJECTS[0],
    style: "scenario",
    difficulty: "Moderate",
    count: 5,
    curatedOnly: false,
    questions: [],
    index: 0,
    score: 0,
    answered: false,
  };

  /* ---- build the subject chips from SUBJECTS ---- */
  function buildSubjectChips() {
    var wrap = $("subject-chips");
    wrap.innerHTML = "";
    SUBJECTS.forEach(function (subject, i) {
      var chip = el("button", "chip" + (i === 0 ? " is-active" : ""), subject);
      chip.setAttribute("data-subject", subject);
      wrap.appendChild(chip);
    });
  }

  /* ---- generic single-select chip group wiring ---- */
  function wireChipGroup(containerId, attr, onSelect) {
    var container = $(containerId);
    container.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip || !container.contains(chip)) return;
      container.querySelectorAll(".chip").forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
      });
      onSelect(chip.getAttribute(attr));
    });
  }

  function setupSetup() {
    buildSubjectChips();
    wireChipGroup("subject-chips", "data-subject", function (v) {
      state.subject = v;
    });
    wireChipGroup("style-chips", "data-style", function (v) {
      state.style = v;
    });
    wireChipGroup("difficulty-chips", "data-difficulty", function (v) {
      state.difficulty = v;
    });
    wireChipGroup("count-chips", "data-count", function (v) {
      state.count = parseInt(v, 10);
    });

    $("curated-only").addEventListener("change", function (e) {
      state.curatedOnly = e.target.checked;
    });

    $("start-quiz").addEventListener("click", startQuiz);
    $("next-btn").addEventListener("click", nextQuestion);
    $("new-session").addEventListener("click", resetToSetup);
    $("clear-history").addEventListener("click", function () {
      writeStore(HISTORY_KEY, []);
      renderHistory();
    });
  }

  /* ====================== CURATED BANK FALLBACK ======================= */
  function curatedQuestions(subject, style, difficulty, count) {
    var bank = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];

    function pick(matchStyle, matchDiff) {
      return bank.filter(function (q) {
        if (q.subject !== subject) return false;
        if (matchStyle && style !== "mixed" && q.style !== style) return false;
        if (matchDiff && q.difficulty !== difficulty) return false;
        return true;
      });
    }

    // Prefer exact style + difficulty, then relax difficulty, then relax style.
    var pool = pick(true, true);
    if (pool.length < count) pool = pick(true, false);
    if (pool.length < count) pool = pick(false, false);
    // Last resort: any question for the subject already covered above;
    // if still empty, fall back to the whole bank so the quiz never breaks.
    if (pool.length === 0) pool = bank.slice();

    return shuffle(pool).slice(0, Math.min(count, pool.length));
  }

  /* ========================== AI GENERATION ========================== */
  function fetchAIQuestions(params) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, API_TIMEOUT_MS);

    return fetch("/api/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params),
      signal: controller.signal,
    })
      .then(function (res) {
        clearTimeout(timer);
        if (!res.ok) throw new Error("API responded " + res.status);
        return res.json();
      })
      .then(function (data) {
        var qs = data && Array.isArray(data.questions) ? data.questions : null;
        if (!qs || !qs.length) throw new Error("No questions returned");
        return qs;
      })
      .catch(function (err) {
        clearTimeout(timer);
        throw err;
      });
  }

  /* recent question stems (across sessions) so AI avoids repeats */
  function recentStems() {
    var history = readStore(HISTORY_KEY, []);
    var stems = [];
    history.slice(0, 5).forEach(function (h) {
      if (Array.isArray(h.stems)) stems = stems.concat(h.stems);
    });
    return stems.slice(0, 25);
  }

  /* ============================ QUIZ FLOW ============================ */
  function showOnly(visibleId) {
    ["quiz-setup", "quiz-loading", "quiz-active", "quiz-results"].forEach(function (id) {
      $(id).hidden = id !== visibleId;
    });
  }

  function setNotice(message, isError) {
    var notice = $("quiz-notice");
    if (!message) {
      notice.hidden = true;
      notice.textContent = "";
      return;
    }
    notice.hidden = false;
    notice.textContent = message;
    notice.classList.toggle("is-error", !!isError);
  }

  function startQuiz() {
    setNotice("");
    $("quiz-history").hidden = true;

    var params = {
      subject: state.subject,
      style: state.style,
      difficulty: state.difficulty,
      count: state.count,
      previousStems: recentStems(),
    };

    if (state.curatedOnly) {
      var curated = curatedQuestions(state.subject, state.style, state.difficulty, state.count);
      if (!curated.length) {
        setNotice("No curated questions found for this selection yet. Try another subject or style.", true);
        showOnly("quiz-setup");
        return;
      }
      beginWithQuestions(curated, "curated");
      return;
    }

    // Hybrid: try AI first, fall back to curated on any failure.
    showOnly("quiz-loading");
    $("loading-text").textContent = "Generating AI questions…";

    fetchAIQuestions(params)
      .then(function (qs) {
        beginWithQuestions(qs.slice(0, state.count), "ai");
      })
      .catch(function () {
        var curated = curatedQuestions(state.subject, state.style, state.difficulty, state.count);
        if (!curated.length) {
          setNotice("AI is unavailable and no curated questions match this selection. Try another subject or style.", true);
          showOnly("quiz-setup");
          return;
        }
        setNotice("AI generation was unavailable, so these questions come from the curated bank.", false);
        beginWithQuestions(curated, "curated");
      });
  }

  function beginWithQuestions(questions, source) {
    state.questions = questions;
    state.source = source;
    state.index = 0;
    state.score = 0;
    state.answered = false;
    showOnly("quiz-active");
    renderQuestion();
  }

  function renderQuestion() {
    state.answered = false;
    var q = state.questions[state.index];
    var total = state.questions.length;

    $("progress-label").textContent = "Question " + (state.index + 1) + " / " + total;
    $("score-label").textContent = "Score " + state.score;

    var next = $("next-btn");
    next.hidden = true;
    next.textContent = state.index === total - 1 ? "See results" : "Next";

    var card = $("qcard");
    card.innerHTML = "";
    var isScenario = q.style === "scenario" && q.scenario && q.scenario.trim();
    card.classList.toggle("is-scenario", !!isScenario);

    /* meta row (case number, subject, difficulty) */
    var meta = el("div", "qcard-meta");
    var caseNo = el("span", "qcard-case", (isScenario ? "CASE " : "Q") + String(state.index + 1).padStart(2, "0"));
    var tags = el("span", "qcard-tags");
    tags.appendChild(el("span", "qtag", q.subject));
    tags.appendChild(el("span", "qtag qtag-diff", q.difficulty));
    if (state.source) {
      tags.appendChild(el("span", "qtag qtag-src", state.source === "ai" ? "AI" : "Curated"));
    }
    meta.appendChild(caseNo);
    meta.appendChild(tags);
    card.appendChild(meta);

    /* scenario / vignette beside an accent rail */
    if (isScenario) {
      var vig = el("div", "qcard-vignette");
      vig.appendChild(el("span", "vignette-rail"));
      vig.appendChild(el("p", "vignette-text", q.scenario));
      card.appendChild(vig);
    }

    card.appendChild(el("h2", "qcard-question", q.question));

    /* options */
    var optWrap = el("div", "options");
    q.options.forEach(function (opt, i) {
      var btn = el("button", "option");
      btn.type = "button";
      var letter = el("span", "option-letter", LETTERS[i] || "");
      var text = el("span", "option-text", opt);
      btn.appendChild(letter);
      btn.appendChild(text);
      btn.addEventListener("click", function () {
        handleAnswer(i, optWrap, q);
      });
      optWrap.appendChild(btn);
    });
    card.appendChild(optWrap);

    /* explanation placeholder */
    var exp = el("div", "explanation");
    exp.id = "explanation";
    exp.hidden = true;
    card.appendChild(exp);
  }

  function handleAnswer(choice, optWrap, q) {
    if (state.answered) return;
    state.answered = true;

    var buttons = optWrap.querySelectorAll(".option");
    buttons.forEach(function (b, i) {
      b.disabled = true;
      if (i === q.correctIndex) b.classList.add("is-correct");
      if (i === choice && choice !== q.correctIndex) b.classList.add("is-wrong");
    });

    if (choice === q.correctIndex) {
      state.score += 1;
      $("score-label").textContent = "Score " + state.score;
    }

    var exp = $("explanation");
    exp.hidden = false;
    var verdict = el("p", "explanation-verdict " + (choice === q.correctIndex ? "ok" : "no"),
      choice === q.correctIndex ? "Correct" : "Incorrect — answer: " + LETTERS[q.correctIndex]);
    exp.appendChild(verdict);
    if (q.explanation) exp.appendChild(el("p", "explanation-text", q.explanation));

    var next = $("next-btn");
    next.hidden = false;
    next.focus();
  }

  function nextQuestion() {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
      $("qcard").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    var total = state.questions.length;
    var pct = total ? Math.round((state.score / total) * 100) : 0;

    $("results-score").textContent = state.score + " / " + total;
    $("results-pct").textContent = pct + "%";
    $("results-verdict").textContent = verdictFor(pct);

    showOnly("quiz-results");

    // save to history
    var history = readStore(HISTORY_KEY, []);
    history.unshift({
      ts: Date.now(),
      subject: state.subject,
      style: state.style,
      difficulty: state.difficulty,
      score: state.score,
      total: total,
      pct: pct,
      source: state.source,
      stems: state.questions.map(function (q) {
        return q.question;
      }),
    });
    writeStore(HISTORY_KEY, history.slice(0, 20));
    renderHistory();
  }

  function verdictFor(pct) {
    if (pct >= 90) return "Outstanding — exam-ready on this topic.";
    if (pct >= 70) return "Solid work. Review the ones you missed.";
    if (pct >= 50) return "Getting there — revisit the explanations and retry.";
    return "Keep studying — work through the explanations and try again.";
  }

  function resetToSetup() {
    setNotice("");
    showOnly("quiz-setup");
    renderHistory();
  }

  /* ============================ HISTORY ============================ */
  function renderHistory() {
    var history = readStore(HISTORY_KEY, []);
    var wrap = $("quiz-history");
    var list = $("history-list");
    list.innerHTML = "";

    if (!history.length) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;

    history.slice(0, 10).forEach(function (h) {
      var li = el("li", "history-item");
      var left = el("span", "history-meta");
      left.appendChild(el("span", "history-subject", h.subject));
      var d = new Date(h.ts);
      var when = d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      left.appendChild(el("span", "history-date mono-label", when + " · " + h.difficulty + " · " + (h.source === "ai" ? "AI" : "Curated")));
      var score = el("span", "history-score mono-label", h.score + "/" + h.total + " (" + h.pct + "%)");
      li.appendChild(left);
      li.appendChild(score);
      list.appendChild(li);
    });
  }

  /* ============================ INIT ============================ */
  document.addEventListener("DOMContentLoaded", function () {
    setupTabs();
    setupQuickNotes();
    setupSetup();
    renderHistory();
  });
})();
