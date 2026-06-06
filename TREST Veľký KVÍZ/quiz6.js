let index = 0;
let score = 0;

const quizBox = document.getElementById("quizBox");
const explanationBox = document.getElementById("explanation");
const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progressBar");
const scoreLabel = document.getElementById("scoreLabel");

const themeButtons = document.querySelectorAll(".theme-btn");
const darkToggle = document.getElementById("darkToggle");

// currentQuiz bude premiešaná kópia pôvodného QUIZ
let currentQuiz = [];
let totalQuestions = 0;

/* =========================
   SHUFFLE
========================= */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================
   KONFETY (dynamické načítanie + trigger)
   Poznámka: konfety sa spúšťajú LEN v showResult() pri >= 80%
========================= */
function loadConfettiOnce(callback) {
  if (typeof confetti === "function") {
    callback();
    return;
  }
  if (window._confettiLoading) {
    const wait = setInterval(() => {
      if (typeof confetti === "function") {
        clearInterval(wait);
        callback();
      }
    }, 100);
    return;
  }
  window._confettiLoading = true;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  s.onload = () => {
    window._confettiLoading = false;
    callback();
  };
  s.onerror = () => {
    window._confettiLoading = false;
    console.warn("Nepodarilo sa načítať canvas-confetti.");
  };
  document.head.appendChild(s);
}

function triggerConfetti() {
  if (typeof confetti !== "function") {
    loadConfettiOnce(() => triggerConfetti());
    return;
  }

  confetti({
    particleCount: 160,
    spread: 70,
    origin: { y: 0.2 }
  });

  confetti({
    particleCount: 70,
    spread: 100,
    origin: { x: 0.2, y: 0.6 },
    scalar: 0.9
  });
  confetti({
    particleCount: 70,
    spread: 100,
    origin: { x: 0.8, y: 0.6 },
    scalar: 0.9
  });
}

/* =========================
   INIT QUIZ (pri štarte a reštarte)
========================= */
function initQuiz() {
  // vytvoríme premiešanú kópiu otázok
  currentQuiz = shuffle(QUIZ);
  totalQuestions = currentQuiz.length;
  index = 0;
  score = 0;
  progressBar.style.width = "0%";
  window._confettiTriggered = false; // reset flag pri štarte
  updateScoreBar();
  renderQuestion();
}

/* =========================
   PROGRESS BAR
========================= */
function updateProgress() {
  const percent = (index / totalQuestions) * 100;
  progressBar.style.width = percent + "%";
}

/* =========================
   SCORE BAR
   (bez konfiet tu — konfety len na konci)
========================= */
function updateScoreBar() {
  scoreLabel.textContent = `${score} správnych z ${totalQuestions}`;
}

/* =========================
   RENDER OTÁZKY
========================= */
function renderQuestion() {
  explanationBox.classList.add("hidden");
  resultScreen.classList.add("hidden");

  const q = currentQuiz[index];
  const shuffled = shuffle(q.moznosti);

  quizBox.innerHTML = `
    <div class="flip-card">
      <div id="flipInner" class="flip-inner flip-start">
        <div class="flip-front">
          <h2>${q.otazka}</h2>

          ${shuffled.map(opt => `
            <button class="answer" data-id="${opt.id}">${opt.text}</button>
          `).join("")}

          <button id="nextBtn" class="next-btn hidden">Ďalej</button>
        </div>
      </div>
    </div>
  `;

  // FLIP + BOUNCE
  setTimeout(() => {
    const inner = document.getElementById("flipInner");
    inner.classList.remove("flip-start");
    inner.classList.add("flip-end");

    inner.classList.add("bounce");
    setTimeout(() => inner.classList.remove("bounce"), 500);
  }, 50);

  // EVENTY NA ODPOVEDE
  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(q, btn));
  });

  updateProgress();
  updateScoreBar();
}

/* =========================
   VYHODNOTENIE ODPOVEDE
========================= */
function handleAnswer(q, btn) {
  const chosen = btn.dataset.id;
  const correctId = q.spravna;

  const correctText = q.moznosti.find(m => m.id === correctId).text;
  const chosenText = q.moznosti.find(m => m.id === chosen).text;
  const correctExplain = q.vysvetlenie[correctId];

  // Zablokujeme ostatné odpovede
  document.querySelectorAll(".answer").forEach(b => {
    b.style.pointerEvents = "none";
  });

  // SPRÁVNA ODPOVEĎ
  if (chosen === correctId) {
    btn.classList.add("correct", "blink-correct");
    score++;

    explanationBox.innerHTML = `
      <div class="correct-title">
        ✔ Správne!
      </div>
      <div class="correct-box">
        ${correctExplain}
      </div>
    `;
  }

  // NESPRÁVNA ODPOVEĎ
  else {
    btn.classList.add("wrong");

    // zvýrazníme správnu odpoveď v zozname tlačidiel
    document.querySelectorAll(".answer").forEach(b => {
      if (b.dataset.id === correctId) {
        b.classList.add("correct", "blink-correct");
        setTimeout(() => {
          b.classList.remove("blink-correct");
        }, 700);
      }
    });

    explanationBox.innerHTML = `
      <div class="wrong-title">
        ✘ Nesprávne.
      </div>

      <div class="correct-box">
        <b>Správna odpoveď:</b><br>
        <b>${correctId}) ${correctText}</b><br>
        <span>${correctExplain}</span>
      </div>

      <div class="wrong-box">
        <b>Tvoja odpoveď:</b><br>
        ${chosen}) ${chosenText}<br>
        <span>${q.vysvetlenie[chosen]}</span>
      </div>
    `;
  }

  // SLIDE-IN ANIMÁCIA VYSVETLENIA
  explanationBox.classList.remove("hidden");
  explanationBox.classList.remove("slide-in");
  void explanationBox.offsetWidth;
  explanationBox.classList.add("slide-in");

  updateScoreBar();

  // Zobrazíme tlačidlo Ďalej
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.classList.remove("hidden");

  // POP ANIMÁCIA NEXT BUTTON
  nextBtn.classList.remove("next-animate");
  void nextBtn.offsetWidth;
  nextBtn.classList.add("next-animate");

  nextBtn.onclick = () => {
    index++;
    if (index < totalQuestions) {
      renderQuestion();
    } else {
      showResult();
    }
  };
}

/* =========================
   VÝSLEDOK (konfety LEN tu pri >= 80%)
========================= */
function showResult() {
  quizBox.innerHTML = "";
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `Získal si ${score} z ${totalQuestions} bodov.`;

  if (!totalQuestions || totalQuestions === 0) {
    console.warn("totalQuestions je 0 alebo nedefinované");
    return;
  }

  const percent = Math.round((score / totalQuestions) * 100);

  // konfety pri >= 80% (iba raz)
  if (percent >= 80 && !window._confettiTriggered) {
    window._confettiTriggered = true;
    loadConfettiOnce(() => triggerConfetti());
  }
}

/* =========================
   REŠTART
========================= */
restartBtn.addEventListener("click", () => {
  // pri reštarte premiešame otázky znova
  currentQuiz = shuffle(QUIZ);
  totalQuestions = currentQuiz.length;
  index = 0;
  score = 0;
  progressBar.style.width = "0%";
  window._confettiTriggered = false;
  updateScoreBar();
  renderQuestion();
});

/* =========================
   TÉMY
========================= */
themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    themeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const theme = btn.dataset.theme;
    document.body.classList.remove("theme-blue", "theme-purple", "theme-green");
    document.body.classList.add(`theme-${theme}`);
  });
});

document.body.classList.add("theme-blue");

/* =========================
   DARK MODE
========================= */
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  darkToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
});

/* =========================
   ŠTART
========================= */
initQuiz();