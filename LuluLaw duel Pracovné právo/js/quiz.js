// quiz.js – finálna verzia s fade-in aj fade-out

function showQuiz(topic, body, footer, metrics) {
  return new Promise((resolve) => {
    body.innerHTML = "";
    footer.innerHTML = "";

    const questions = (Array.isArray(topic.quiz) ? topic.quiz : []).slice(0, 5);
    metrics.quiz.total = questions.length;
    let qi = 0;
    let correctCount = 0;

    // Skip button
    const skipBtn = document.createElement("button");
    skipBtn.className = "primary-btn click-anim";
    skipBtn.textContent = "Preskočiť kvíz";
    skipBtn.addEventListener("click", () => {
      metrics.quiz.total = 0;
      metrics.quiz.correct = 0;
      fadeOutAndResolve();
    });

    const skipWrap = document.createElement("div");
    skipWrap.className = "quiz-skip-wrap";
    skipWrap.style.marginBottom = "12px";
    skipWrap.appendChild(skipBtn);
    body.appendChild(skipWrap);

    const quizContainer = document.createElement("div");
    quizContainer.className = "quiz-container";
    body.appendChild(quizContainer);

    footer.innerHTML = `<div>Otázky: ${questions.length}</div>`;

    function renderQuestion() {
      const q = questions[qi];

      const rawOptions = Array.isArray(q.options)
        ? q.options.map(o =>
            typeof o === "string"
              ? o
              : o.text || o.value || o.option || o.label || ""
          )
        : [];

      const declaredCorrectIndex = Number.isFinite(q.correct) ? q.correct : 0;
      const declaredCorrectValue = rawOptions[declaredCorrectIndex] ?? rawOptions[0] ?? "";

      const displayOptions = rawOptions.length ? shuffleArray(rawOptions.slice()) : [];
      const computedCorrectIndex = displayOptions.indexOf(declaredCorrectValue);
      const correctIndexForThisQ = computedCorrectIndex >= 0 ? computedCorrectIndex : 0;

      // Fade-in wrapper
      const qWrap = document.createElement("div");
      qWrap.className = "quiz-q seq-fade-in";
      qWrap.innerHTML = `
        <p><strong>${escapeHtml(q.question || "")}</strong></p>
        <div class="quiz-options" role="list"></div>
        <div class="quiz-expl" aria-live="polite" style="margin-top:8px"></div>
        <div class="quiz-controls" style="margin-top:12px"></div>
      `;

      quizContainer.innerHTML = "";
      quizContainer.appendChild(qWrap);

      const opts = qWrap.querySelector(".quiz-options");
      const expl = qWrap.querySelector(".quiz-expl");
      const controls = qWrap.querySelector(".quiz-controls");

      if (displayOptions.length === 0) {
        opts.innerHTML = `<div style="opacity:0.8">Žiadne možnosti v otázke.</div>`;
        controls.innerHTML = `<button class="primary-btn btn-next click-anim">Pokračovať</button>`;
        controls.querySelector(".btn-next").addEventListener("click", nextStep);
        return;
      }

      displayOptions.forEach((optText, i) => {
        const b = document.createElement("button");
        b.className = "primary-btn click-anim";
        b.style.display = "block";
        b.style.margin = "8px 0";
        b.textContent = `${String.fromCharCode(65 + i)}. ${optText}`;
        b.setAttribute("data-index", i);

        b.addEventListener("click", () => {
          opts.querySelectorAll("button").forEach(x => x.disabled = true);

          const correct = correctIndexForThisQ;
          if (i === correct) {
            expl.textContent = q.explanation_correct || "Správne.";
            correctCount++;
          } else {
            expl.textContent = q.explanation_incorrect || "Nesprávne.";
            const correctBtn = opts.querySelectorAll("button")[correct];
            if (correctBtn) correctBtn.style.outline = "3px solid rgba(34,139,34,0.18)";
          }

          controls.innerHTML = `<button class="primary-btn btn-next click-anim">Ďalšia</button>`;
          controls.querySelector(".btn-next").addEventListener("click", nextStep);
        });

        opts.appendChild(b);
      });
    }

    function nextStep() {
      qi++;
      if (qi < questions.length) {
        fadeOut(() => renderQuestion());
      } else {
        metrics.quiz.correct = correctCount;
        footer.innerHTML = `
          <div>Správne odpovede: <strong>${correctCount}</strong></div>
          <button class="primary-btn btn-continue click-anim">Pokračovať na dlaždice</button>
        `;
        footer.querySelector(".btn-continue").addEventListener("click", fadeOutAndResolve);
      }
    }

    function fadeOut(callback) {
      quizContainer.classList.add("seq-fade-out");
      setTimeout(() => {
        quizContainer.classList.remove("seq-fade-out");
        callback();
      }, 260);
    }

    function fadeOutAndResolve() {
      quizContainer.classList.add("seq-fade-out");
      setTimeout(() => resolve(), 260);
    }

    if (questions.length === 0) {
      metrics.quiz.correct = 0;
      footer.innerHTML = `
        <button class="primary-btn btn-continue click-anim">Preskočiť kvíz</button>
      `;
      footer.querySelector(".btn-continue").addEventListener("click", fadeOutAndResolve);
    } else {
      renderQuestion();
    }
  });
}
