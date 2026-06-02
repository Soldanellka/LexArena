// cases.js
// showCases implementation (cases flow with steps)

function showCases(topic, body, footer, metrics) {
  return new Promise((resolve) => {
    body.innerHTML = "";
    footer.innerHTML = `<div>Prípady</div>`;
    const cases = Array.isArray(topic.cases) ? topic.cases : [];
    if (cases.length === 0) {
      footer.innerHTML = `<button class="primary-btn btn-continue click-anim">Preskočiť prípady</button>`;
      footer.querySelector(".btn-continue").addEventListener("click", () => resolve());
      return;
    }

    metrics.cases.totalSteps = 0;
    metrics.cases.correctSteps = 0;
    let caseIndex = 0;

    function renderCase() {
      const c = cases[caseIndex];
      body.innerHTML = `<div class="case-block"><h3>${escapeHtml(c.title || "")}</h3></div>`;
      const cb = body.querySelector(".case-block");

      const realSteps = c.steps.filter(s => Array.isArray(s.options) && s.options.length > 0);
      let stepIndex = 0;

      // 🔹 Úvodné zadanie (bez možností)
      const intro = c.steps.find(s => !Array.isArray(s.options) || s.options.length === 0);
      if (intro) {
        const introEl = document.createElement("div");
        introEl.className = "case-intro";
        introEl.innerHTML = `
          <div style="border:1px solid rgba(0,0,0,0.08); border-radius:10px; padding:16px; background:rgba(255,255,255,0.6); box-shadow:0 4px 12px rgba(0,0,0,0.04);">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
              <span style="font-size:20px;">📄</span>
              <strong style="font-size:16px;">Zadanie prípadu</strong>
            </div>
            <p style="margin-bottom:12px; line-height:1.6;">${escapeHtml(intro.question || "")}</p>
            <div style="margin-top:12px; text-align:right;">
              <button class="primary-btn btn-start click-anim">Začať riešenie</button>
            </div>
          </div>
        `;
        cb.appendChild(introEl);
        introEl.querySelector(".btn-start").addEventListener("click", () => {
          cb.innerHTML = `<h3>${escapeHtml(c.title || "")}</h3>`;
          renderStep();
        });
        return;
      }

      function renderStep() {
        // 🔥 STOP: ak už krok neexistuje → ukonči prípad
        if (stepIndex >= realSteps.length) {
          renderNextOrFinish();
          return;
        }

        const s = realSteps[stepIndex];
        const stepEl = document.createElement("div");
        stepEl.className = "case-step";
        stepEl.innerHTML = `<p><strong>Krok ${Math.min(stepIndex + 1, realSteps.length)} z ${realSteps.length}: ${escapeHtml(s.question || "")}</strong></p>
          <div class="case-options" style="margin-top:8px"></div>
          <div class="case-expl" aria-live="polite" style="margin-top:8px"></div>
          <div class="case-controls" style="margin-top:12px"></div>`;
        const opts = stepEl.querySelector(".case-options");
        const expl = stepEl.querySelector(".case-expl");
        const controls = stepEl.querySelector(".case-controls");

        (s.options || []).forEach((opt, i) => {
          const b = document.createElement("button");
          b.className = "primary-btn click-anim";
          b.style.marginRight = "8px";
          b.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
          b.addEventListener("click", () => {
            opts.querySelectorAll("button").forEach(x => x.disabled = true);
            const correct = Number.isFinite(s.correct) ? s.correct : 0;

            metrics.cases.totalSteps++;
            if (i === correct) {
              expl.textContent = s.explanation?.correct || "Správne.";
              metrics.cases.correctSteps++;
            } else {
              expl.textContent = s.explanation?.wrong || `Nesprávne. Správna odpoveď: ${s.options[correct] || "—"}`;
              const correctBtn = opts.querySelectorAll("button")[correct];
              if (correctBtn) correctBtn.style.outline = "3px solid rgba(34,139,34,0.18)";
            }

            controls.innerHTML = `<button class="primary-btn btn-next click-anim">Ďalšia</button>`;
            controls.querySelector(".btn-next").addEventListener("click", () => {
              stepIndex++;
              // 🔥 ak sme na konci, ukonči hneď
              if (stepIndex >= realSteps.length) {
                renderNextOrFinish();
                return;
              }
              renderNextOrFinish();
            });
          });
          opts.appendChild(b);
        });

        cb.appendChild(stepEl);
      }

      function renderNextOrFinish() {
        // 🔥 STOP: ak už krok neexistuje → ukonči prípad
        if (stepIndex >= realSteps.length) {
          cb.innerHTML = `<h3>${escapeHtml(c.title || "")}</h3>`; // ✅ vyčistí predchádzajúci krok
          const summary = document.createElement("div");
          summary.style.marginTop = "12px";
          summary.innerHTML = `<div>Prípad dokončený.</div>
            <div style="margin-top:10px"><button class="primary-btn btn-next-case click-anim">Ďalší prípad</button></div>`;
          cb.appendChild(summary);

          summary.querySelector(".btn-next-case").addEventListener("click", () => {
            caseIndex++;
            if (caseIndex < cases.length) renderCase();
            else resolve();
          });

          return;
        }

        // 🔥 inak pokračuj ďalším krokom
        cb.innerHTML = `<h3>${escapeHtml(c.title || "")}</h3>`;
        renderStep();
      }

      renderNextOrFinish();
    }

    renderCase();
  });
}
