// stats.js
// LocalStorage keys and topic stats management

const LS_TOPIC_STATS = "topic_stats_v1";
const LS_COINS = "coins_v1";
const LS_CHALLENGES = "challenges_v1";
const LS_PENDING = "pending_duels_v1";
const LS_RESULTS = "duel_results_v1";

function loadAllTopicStats() {
  try {
    const raw = localStorage.getItem(LS_TOPIC_STATS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("loadAllTopicStats error", e);
    return {};
  }
}

function saveAllTopicStats(obj) {
  try {
    localStorage.setItem(LS_TOPIC_STATS, JSON.stringify(obj || {}));
  } catch (e) {
    console.warn("saveAllTopicStats error", e);
  }
}

function saveTopicStats(topicId, statsObj) {
  try {
    const all = loadAllTopicStats();
    all[topicId] = statsObj;
    localStorage.setItem(LS_TOPIC_STATS, JSON.stringify(all));
    refreshAllTopicVisuals();
    try {
      const ev = new CustomEvent("topicStatsUpdated", { detail: { topicId, stats: statsObj } });
      window.dispatchEvent(ev);
    } catch (e) {
      console.warn("topicStatsUpdated event failed", e);
    }
  } catch (e) {
    console.warn("saveTopicStats error", e);
  }
}

function refreshAllTopicVisuals() {
  const stats = loadAllTopicStats();
  const cards = document.querySelectorAll(".topic-card");
  cards.forEach(card => {
    const id = card.dataset.id;
    const st = stats[id];
    const pct = st && typeof st.percent === "number" ? st.percent : 0;
    applyTopicVisual(card, pct);
  });
}

function addRefreshControls() {
  const headerRight = document.querySelector(".header-right") || document.body;
  if (!document.getElementById("refreshTopicsBtn")) {
    const btn = document.createElement("button");
    btn.id = "refreshTopicsBtn";
    btn.className = "primary-btn click-anim";
    btn.textContent = "Obnoviť výsledky";
    btn.style.marginLeft = "10px";
    btn.addEventListener("click", () => {
      refreshAllTopicVisuals();
      document.querySelectorAll(".topic-percent-badge").forEach(b => {
        b.classList.add("pulse");
        setTimeout(() => b.classList.remove("pulse"), 600);
      });
      btn.textContent = "Aktualizované ✓";
      setTimeout(() => btn.textContent = "Obnoviť výsledky", 1200);
    });
    headerRight.appendChild(btn);
  }

  window.addEventListener("storage", (ev) => {
    if (ev.key === LS_TOPIC_STATS) {
      refreshAllTopicVisuals();
    }
  });

  window.addEventListener("topicStatsUpdated", (ev) => {
    refreshAllTopicVisuals();
  });
}
