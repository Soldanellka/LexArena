// topics.ui.js
// UI: styles, card rendering, visual helpers
// Exposes: window.renderTopics, window.applyTopicVisual

function injectTopicStyles() {
  const id = "topic-overlay-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    .topic-card { transition: transform 180ms ease, box-shadow 220ms ease; position: relative; overflow: hidden; border-radius:12px; }
    .topic-overlay { transition: background 420ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease; pointer-events: none; position: absolute; inset: 0; border-radius: 12px; }
    .topic-percent-badge { transition: transform 260ms cubic-bezier(.2,.9,.3,1), opacity 260ms ease, background 260ms ease; pointer-events: none; }
    .topic-percent-badge.pulse { transform: scale(1.06); }
    .topic-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(16,12,15,0.06); }
    body.dark .topic-percent-badge { background: rgba(255,255,255,0.08); color: var(--text); }
    .primary-btn { cursor: pointer; border: none; padding: 8px 12px; border-radius:8px; background:var(--primary); color:var(--on-primary); }
    .click-anim { transition: transform 120ms ease; }
    .click-anim:active { transform: scale(0.98); }
    .tiles-board { display:flex; gap:12px; }
    .sequence-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.36); display:flex; align-items:center; justify-content:center; z-index:9999; }
    .sequence-modal { width:min(980px,96%); max-height:90vh; overflow:auto; border-radius:12px; background:var(--card,#fff); padding:18px; box-shadow:0 20px 60px rgba(16,12,15,0.18); }
    .sequence-body { min-height:220px; }
    .sequence-footer { margin-top:12px; display:flex; gap:12px; align-items:center; justify-content:flex-end; flex-wrap:wrap; }
    .sequence-header { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
    .sequence-title { font-weight:800; font-size:18px; }
    .sequence-close { background:transparent;border:none;font-size:18px;cursor:pointer; }
  `;
  document.head.appendChild(style);
}

function applyTopicVisual(cardEl, percent) {
  if (!cardEl) return;
  const existingOverlay = cardEl.querySelector(".topic-overlay");
  if (existingOverlay) existingOverlay.remove();
  const existingBadge = cardEl.querySelector(".topic-percent-badge");
  if (existingBadge) existingBadge.remove();

  const roseRgb = "215,160,170";
  const maxOpacity = 0.78;
  const overlayOpacity = Math.min(maxOpacity, (percent / 100) * maxOpacity);

  const overlay = document.createElement("div");
  overlay.className = "topic-overlay";
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.borderRadius = getComputedStyle(cardEl).borderRadius || "12px";
  overlay.style.background = `linear-gradient(rgba(${roseRgb},${overlayOpacity}), rgba(${roseRgb},${overlayOpacity}))`;
  overlay.style.pointerEvents = "none";
  overlay.style.transition = "background 420ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease";
  cardEl.appendChild(overlay);

  const badge = document.createElement("div");
  badge.className = "topic-percent-badge";
  badge.textContent = `${percent}%`;
  badge.style.position = "absolute";
  badge.style.right = "10px";
  badge.style.bottom = "8px";
  badge.style.background = "rgba(255,255,255,0.92)";
  badge.style.color = "#241B1D";
  badge.style.fontWeight = "800";
  badge.style.fontSize = "12px";
  badge.style.padding = "6px 10px";
  badge.style.borderRadius = "999px";
  badge.style.pointerEvents = "none";
  badge.style.boxShadow = "0 6px 18px rgba(16,12,15,0.06)";
  cardEl.appendChild(badge);

  badge.classList.add("pulse");
  setTimeout(() => badge.classList.remove("pulse"), 360);

  if (percent >= 90) {
    badge.style.background = `rgba(${roseRgb},0.95)`;
    badge.style.color = "#fff";
    badge.style.boxShadow = `0 8px 22px rgba(${roseRgb},0.18)`;
  } else if (percent >= 60) {
    badge.style.background = "rgba(255,255,255,0.95)";
    badge.style.color = "#241B1D";
  } else {
    badge.style.background = "rgba(255,255,255,0.9)";
    badge.style.color = "#241B1D";
  }
}

function renderTopics(topics) {
  injectTopicStyles();
  const grid = document.getElementById("topicsGrid") || document.querySelector(".topics-grid");
  if (!grid) {
    console.warn("renderTopics: topicsGrid not found");
    return;
  }
  grid.innerHTML = "";
  const stats = (typeof loadAllTopicStats === "function") ? loadAllTopicStats() : (JSON.parse(localStorage.getItem("topic_stats_v1") || "{}"));
  topics.forEach(t => {
    const card = document.createElement("div");
    card.className = "topic-card click-anim topic-card-with-badge";
    card.dataset.id = t.id || "";
    card.innerHTML = `
      <div class="topic-code" style="font-weight:700;padding:10px 12px">${escapeHtml(t.id || "")}</div>
      <div class="topic-title" style="padding:0 12px 12px">${escapeHtml(t.title || "Bez názvu")}</div>
    `;
    card.style.position = "relative";
    card.style.borderRadius = "12px";
    card.style.overflow = "hidden";
    card.style.background = "var(--card, #fff)";
    card.style.minHeight = "84px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "center";

    grid.appendChild(card);

    const st = stats[t.id];
    applyTopicVisual(card, st && typeof st.percent === "number" ? st.percent : 0);
  });

  // delegate click to open sequence
  grid.onclick = (e) => {
    const card = e.target.closest(".topic-card");
    if (!card) return;
    const id = card.dataset.id;
    if (typeof openSequenceForTopicById === "function") openSequenceForTopicById(id, { duelMode: false });
  };
}

/* Expose UI helpers */
window.renderTopics = renderTopics;
window.applyTopicVisual = applyTopicVisual;
