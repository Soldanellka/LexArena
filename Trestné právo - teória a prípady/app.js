/* © 2026 Julia – Dynamic Watermark */
(function() {
  const base = "Julia-TP";
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const signature = `${base}-${timestamp}-${random}`;

  // uloženie do globálneho priestoru
  window.__julia_watermark = signature;

  // neviditeľný log (nikto si to nevšimne)
  console.debug("wm:", signature);
})();
/* © 2026 Julia – Internal Watermark */
const __internal_signature = "Julia-2026-TP-Unique-Hash-9f3c1a7e";
const __fp = "TP-Julia-Content-Hash-4b92";

document.addEventListener("DOMContentLoaded", () => {

  const tiles = document.querySelectorAll(".tile");
  const questionsList = document.getElementById("questionsList");
  const questionDetail = document.getElementById("questionDetail");

  function clearDetail() {
    questionDetail.innerHTML = `<p class="empty-state">Vyber si okruh alebo otázku…</p>`;
  }

  /* ============================================================
     RANDOMIZÉR – Fisher-Yates shuffle
  ============================================================ */
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ============================================================
     RENDER – A/B/C (teória)
  ============================================================ */
  function renderQuestions(sectionId) {
    questionsList.innerHTML = "";
    const filtered = TRESTNE_QUESTIONS.filter(q => q.section === sectionId);

    if (filtered.length === 0) {
      questionsList.innerHTML = `<li>Žiadne otázky v tejto sekcii zatiaľ nie sú.</li>`;
      clearDetail();
      return;
    }

    filtered.forEach((q) => {
      const li = document.createElement("li");
      li.textContent = `${q.kod} ${q.nazov}`;
      li.addEventListener("click", () => renderDetail(q, li));
      questionsList.appendChild(li);
    });

    clearDetail();
  }

  function renderDetail(q, li) {
    document.querySelectorAll(".questions-list li").forEach(el => el.classList.remove("active"));
    li.classList.add("active");

    questionDetail.innerHTML = `
      <div class="question-detail animate">
        <h2>${q.kod} – ${q.nazov}</h2>

        <div class="question-section">
          <h3>Vysvetlenie</h3>
          <p>${q.vysvetlenie}</p>
        </div>

        <div class="question-section">
          <h3>Príklad</h3>
          <p>${q.priklad}</p>
        </div>

        <div class="question-section">
          <h3>Kľúčové slová</h3>
          <ul>${q.klucove_slova.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>

        <div class="question-section">
          <h3>Zapamätaj si</h3>
          <ul>${q.zapamataj_si.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>

        <div class="question-section">
          <h3>Literatúra</h3>
          <ul>${q.literatura.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
      </div>
    `;

    questionDetail.classList.remove("animate");
    void questionDetail.offsetWidth;
    questionDetail.classList.add("animate");
    questionDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ============================================================
     RENDER – TRÉNING (MIRAC)
  ============================================================ */
  function renderTrainingList() {
    questionsList.innerHTML = "";
    TRAINING_CASES.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t.nazov;
      li.addEventListener("click", () => renderMiracCase(t, li));
      questionsList.appendChild(li);
    });
    questionDetail.innerHTML = `<p class="empty-state">Vyber si tréningový prípad…</p>`;
  }

  function renderMiracCase(t, li) {
    document.querySelectorAll(".questions-list li").forEach(el => el.classList.remove("active"));
    li.classList.add("active");

    questionDetail.innerHTML = `
      <div class="question-detail animate">
        <h2>${t.nazov}</h2>
        <div class="question-section">
          <h3>Zadanie prípadu</h3>
          <p>${t.M}</p>
        </div>
      </div>
    `;
    renderMiracStep(t, 0);
  }

  function renderMiracStep(t, stepIndex) {
    const step = t.kroky[stepIndex];

    const shuffledOptions = shuffleArray(step.moznosti);

    const stepHtml = document.createElement("div");
    stepHtml.classList.add("question-section");
    stepHtml.innerHTML = `
      <h3>Krok ${stepIndex + 1}: ${step.otazka}</h3>
      <div class="training-tiles">
        ${shuffledOptions.map(m => `
          <div class="training-tile" data-id="${m.id}">${m.text}</div>
        `).join("")}
      </div>
    `;
    questionDetail.appendChild(stepHtml);

    stepHtml.querySelectorAll(".training-tile").forEach(tile => {
      tile.addEventListener("click", () => handleMiracAnswer(t, stepIndex, tile));
    });
  }

  function handleMiracAnswer(t, stepIndex, tile) {
    const step = t.kroky[stepIndex];
    const chosen = tile.dataset.id;
    let feedback = "";

    if (chosen === step.spravna) {
      tile.classList.add("correct");
      feedback = `<p class="correct">✅ Správne! ${step.vysvetlenie_spravne}</p>`;
    } else {
      tile.classList.add("wrong");
      feedback = `<p class="wrong">❌ Nesprávne. ${step.vysvetlenie_nespravne[chosen]}</p>`;
    }

    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("feedback");
    feedbackDiv.innerHTML = feedback;
    tile.parentElement.after(feedbackDiv);

    const nextStep = t.kroky[stepIndex + 1];
    if (nextStep) {
      const nextBtn = document.createElement("button");
      nextBtn.classList.add("next-btn");
      nextBtn.textContent = "➡ Pokračovať na ďalší krok";
      feedbackDiv.appendChild(nextBtn);
      nextBtn.addEventListener("click", () => renderMiracStep(t, stepIndex + 1));
    } else {
      const conclusionDiv = document.createElement("div");
      conclusionDiv.classList.add("question-section");
      conclusionDiv.innerHTML = `
        <h3>Záver</h3>
        <p>${t.C}</p>
      `;
      questionDetail.appendChild(conclusionDiv);
    }
  }

  /* ============================================================
     TILE CLICK HANDLER
  ============================================================ */
  tiles.forEach(tile => {
    tile.addEventListener("click", () => {
      const section = tile.dataset.section;

      if (section === "TRAINING") {
        renderTrainingList();
        return;
      }

      renderQuestions(section);
    });
  });

});
