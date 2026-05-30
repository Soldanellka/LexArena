// courtroom.js
// -------------------------------------------------------------
// Základná verzia Súdnej siene – inicializácia + prepínanie tabov
// -------------------------------------------------------------

console.log("Courtroom modul načítaný");

// -------------------- Pomocné funkcie ------------------------

function loadReports() {
  try {
    return JSON.parse(localStorage.getItem("legal_reports") || "[]");
  } catch {
    return [];
  }
}

// -------------------- Render zoznamu -------------------------

function renderCourtroomList(status = "new") {
  const list = document.getElementById("courtroom-list");
  const detail = document.getElementById("courtroom-detail");

  if (!list) return;

  const reports = loadReports().filter(r => (r.status || "new") === status);

  if (reports.length === 0) {
    list.innerHTML = `<p>Žiadne prípady v tejto sekcii.</p>`;
    if (detail) detail.classList.add("hidden");
    return;
  }

  list.innerHTML = reports.map(r => `
    <div class="case-card" data-id="${r.id}">
      <strong>${r.subject}</strong> • ${r.type}
      <div class="small">${new Date(r.timestamp).toLocaleString("sk-SK")}</div>
      <div class="small">${r.userComment || ""}</div>
    </div>
  `).join("");
}

// -------------------- Render detailu -------------------------

function renderCourtroomDetail(id) {
  const detail = document.getElementById("courtroom-detail");
  if (!detail) return;

  const reports = loadReports();
  const r = reports.find(x => x.id === id);

  if (!r) {
    detail.classList.add("hidden");
    return;
  }

  detail.classList.remove("hidden");

  detail.innerHTML = `
    <div class="case-detail">
      <h3>Spis: ${r.subject} – ${r.type}</h3>

      <p><strong>Text:</strong></p>
      <p>${r.text}</p>

      <p><strong>Komentár hráča:</strong></p>
      <p>${r.userComment || "—"}</p>

      <p class="small">Hlasov: ${r.votesFor || 0} 👍 / ${r.votesAgainst || 0} 👎</p>
    </div>
  `;
}

// -------------------- Inicializácia --------------------------

export function initCourtroom() {
  console.log("Inicializujem Súdnu sieň…");

  const tabs = document.querySelectorAll(".courtroom-tabs .tab-btn");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      renderCourtroomList(tab);
      const detail = document.getElementById("courtroom-detail");
      if (detail) detail.classList.add("hidden");
    });
  });

  // klik na spis
  const list = document.getElementById("courtroom-list");
  if (list) {
    list.addEventListener("click", (e) => {
      const card = e.target.closest(".case-card");
      if (!card) return;
      renderCourtroomDetail(card.dataset.id);
    });
  }

  // prvé načítanie
  renderCourtroomList("new");
}

// automatická inicializácia po načítaní stránky
document.addEventListener("DOMContentLoaded", initCourtroom);
