// topics.sequence.js
// Sequence orchestration, loading topics, saving stats
// Exposes: window.loadTopics, window.openSequenceForTopicById, window.runSequence

const CONFETTI_THRESHOLD = 100; // set to 90 for >=90% celebration

let loadedTopics = [];
let topicsGrid = null;

function safeParseLS(key, fallback = {}) {
  try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { return fallback; }
}

async function runSequence(topic, opts = {}) {
  injectTopicStyles && injectTopicStyles();
  if (typeof showQuiz !== "function" || typeof showTiles !== "function" || typeof showCases !== "function") {
    console.warn("runSequence: UI modules missing (showQuiz/showTiles/showCases).");
    return;
  }

  // build modal
  const overlay = document.createElement("div");
  overlay.className = "sequence-overlay";
  const modal = document.createElement("div");
  modal.className = "sequence-modal";
  overlay.appendChild(modal);

  const header = document.createElement("div");
  header.className = "sequence-header";
  header.innerHTML = `<div class="sequence-title">${escapeHtml(topic.title || topic.id || "Okruh")}</div>`;
  const closeBtn = document.createElement("button");
  closeBtn.className = "sequence-close";
  closeBtn.title = "Zavrieť";
  closeBtn.innerHTML = "✕";
  header.appendChild(closeBtn);
  modal.appendChild(header);

  const body = document.createElement("div");
  body.className = "sequence-body";
  modal.appendChild(body);

  const footer = document.createElement("div");
  footer.className = "sequence-footer";
  modal.appendChild(footer);

  document.body.appendChild(overlay);

  // prevent accidental close by overlay click
  overlay.addEventListener("click", (ev) => {
    if (ev.target === overlay) { /* ignore */ }
  });

  function removeOverlay() {
    try { document.body.removeChild(overlay); } catch (e) {}
  }
  closeBtn.addEventListener("click", removeOverlay);

  const metrics = {
    quiz: { total: 0, correct: 0 },
    tiles: { totalPairs: 0, matched: 0 },
    cases: { totalSteps: 0, correctSteps: 0 }
  };

  try {
    await showQuiz(topic, body, footer, metrics);
    await showTiles(topic, body, footer, metrics);
    await showCases(topic, body, footer, metrics);

    const quizPct = metrics.quiz.total ? Math.round((metrics.quiz.correct / metrics.quiz.total) * 100) : 0;
    const tilesPct = metrics.tiles.totalPairs ? Math.round((metrics.tiles.matched / metrics.tiles.totalPairs) * 100) : 0;
    const casesPct = metrics.cases.totalSteps ? Math.round((metrics.cases.correctSteps / metrics.cases.totalSteps) * 100) : 0;

    const aggregated = Math.round((quizPct + tilesPct + casesPct) / 3);

    // prepare stats
    const prevAll = (typeof loadAllTopicStats === "function") ? loadAllTopicStats() : safeParseLS("topic_stats_v1", {});
    const prev = prevAll[topic.id] || {};
    const newStats = {
      percent: aggregated,
      lastUpdated: Date.now(),
      breakdown: { quizPct, tilesPct, casesPct },
      cumulative: {
        quiz_correct: (prev.cumulative?.quiz_correct || 0) + (metrics.quiz.correct || 0),
        quiz_total: (prev.cumulative?.quiz_total || 0) + (metrics.quiz.total || 0),
        tiles_matched: (prev.cumulative?.tiles_matched || 0) + (metrics.tiles.matched || 0),
        tiles_totalPairs: (prev.cumulative?.tiles_totalPairs || 0) + (metrics.tiles.totalPairs || 0),
        cases_correctSteps: (prev.cumulative?.cases_correctSteps || 0) + (metrics.cases.correctSteps || 0),
        cases_totalSteps: (prev.cumulative?.cases_totalSteps || 0) + (metrics.cases.totalSteps || 0)
      }
    };

    // confetti only after threshold
    if (typeof fireConfetti === "function" && aggregated >= CONFETTI_THRESHOLD) {
      setTimeout(() => { try { fireConfetti(); } catch (e) {} }, 220);
    }

    // save stats
    if (typeof saveTopicStats === "function") {
      try { saveTopicStats(topic.id, newStats); } catch (e) {}
    } else {
      try {
        const key = "topic_stats_v1";
        const all = safeParseLS(key, {});
        all[topic.id] = newStats;
        localStorage.setItem(key, JSON.stringify(all));
      } catch (e) {}
    }

    // update card visual
    try {
      const card = document.querySelector(`.topic-card[data-id="${topic.id}"]`);
      if (card && typeof applyTopicVisual === "function") applyTopicVisual(card, aggregated);
    } catch (e) {}

    // footer summary + close
    footer.innerHTML = `<div style="flex:1">Výsledok: <strong>${aggregated}%</strong> — (Kvíz ${quizPct}%, Dlaždice ${tilesPct}%, Prípady ${casesPct}%)</div>
      <div style="display:flex;gap:8px">
        <button class="primary-btn click-anim" id="seqCloseBtn">Zavrieť</button>
      </div>`;
    const seqCloseBtn = footer.querySelector("#seqCloseBtn");
    seqCloseBtn.addEventListener("click", removeOverlay);

  } catch (err) {
    console.error("runSequence error:", err);
    removeOverlay();
  }
}

/* loader / renderer */

async function loadTopics() {
  injectTopicStyles && injectTopicStyles();
  topicsGrid = document.getElementById("topicsGrid") || document.querySelector(".topics-grid");
  const topicIds = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);
  const topics = [];
  for (const id of topicIds) {
    try {
      const res = await fetch(`data/${id}.json`);
      if (!res.ok) { console.warn(`${id}.json - status ${res.status}`); continue; }
      const data = await res.json();
      data.id = data.id || id;
      data.title = data.title || `Okruh ${id}`;
      data.quiz = Array.isArray(data.quiz) ? data.quiz : [];
      data.tiles = Array.isArray(data.tiles) ? data.tiles : [];
      data.theory = Array.isArray(data.theory) ? data.theory : [];
      data.cases = Array.isArray(data.cases) ? data.cases : [];

      if (typeof ensureFiveQuestions === "function") ensureFiveQuestions(data);
      if (typeof ensureTwoCases === "function") ensureTwoCases(data);

      topics.push(data);
    } catch (err) {
      console.error(`Chyba pri načítaní ${id}.json:`, err);
    }
  }
  loadedTopics = topics.slice();
  if (!topicsGrid) {
    topicsGrid = document.getElementById("topicsGrid") || document.querySelector(".topics-grid");
  }
  if (!topicsGrid) {
    console.warn("loadTopics: topicsGrid not found");
    return;
  }
  if (topics.length === 0) {
    topicsGrid.innerHTML = `<div style="padding:20px;color:var(--text)">Neboli nájdené žiadne okruhy. Skontroluj priečinok <strong>data/</strong> a spusti stránku cez lokálny server (http://localhost:8000).</div>`;
    return;
  }
  if (typeof renderTopics === "function") renderTopics(topics);
}

function openSequenceForTopicById(id, opts = {}) {
  if (!loadedTopics || loadedTopics.length === 0) {
    loadTopics().then(() => {
      const t = loadedTopics.find(x => x.id === id);
      if (t) runSequence(t, opts);
      else console.warn("Topic not found after reload:", id);
    });
    return;
  }
  const topic = loadedTopics.find(t => t.id === id);
  if (!topic) { console.warn("Topic not found:", id); return; }
  runSequence(topic, opts);
}

/* Expose sequence API */
window.loadTopics = loadTopics;
window.openSequenceForTopicById = openSequenceForTopicById;
window.runSequence = runSequence;
