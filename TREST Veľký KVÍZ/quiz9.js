/* =========================
   quiz.js — upravené načítanie otázok
   - Ak existuje externý súbor questions.js, ktorý definuje globálnu premennú QUESTIONS,
     použije sa automaticky.
   - Ak nie je QUESTIONS prítomné, pokúsi sa načítať questions.json cez fetch.
   - Ak ani jedno nie je dostupné, použije sa vnútorné pole FALLBACK_QUIZ (môžeš ho upraviť).
   - Po načítaní otázok sa spustí initQuiz().
========================= */

/* =========================
   FALLBACK (krátky súbor otázok, použije sa len ak nie sú externé zdroje)
========================= */
const FALLBACK_QUIZ = [
  {
    otazka: "Čo je to trestný čin v zmysle trestného práva hmotného?",
    moznosti: [
      { id: "A", text: "Protiprávne konanie, ktoré je spoločensky nebezpečné a zákon ho trestá" },
      { id: "B", text: "Akékoľvek protiprávne konanie bez ohľadu na následok" },
      { id: "C", text: "Len konanie, ktoré spôsobí škodu nad určitú hranicu" },
      { id: "D", text: "Len úmyselné konanie bez ohľadu na následok" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestný čin = spoločensky nebezpečné protiprávne konanie, ktoré zákon označuje a trestá; zahŕňa znaky skutkovej podstaty."
    }
  }
];

/* =========================
   PREMENNÁ QUIZ (bude naplnená načítanými otázkami)
========================= */
let QUIZ = [];

/* =========================
   POKUS O NAČÍTANIE OTÁZOK
   - Preferencia poradia:
     1) globálna premenná window.QUESTIONS (napr. z questions.js)
     2) fetch('questions.json')
     3) FALLBACK_QUIZ
========================= */
function loadQuestionsThenInit() {
  // 1) ak externý script (questions.js) definoval QUESTIONS, použijeme ho
  if (typeof window !== "undefined" && (window.QUESTIONS || window.QUESTIONS_LIST || window.QUESTIONS_JSON)) {
    QUIZ = window.QUESTIONS || window.QUESTIONS_LIST || window.QUESTIONS_JSON;
    // bezpečnostná kontrola: musí byť pole
    if (!Array.isArray(QUIZ)) QUIZ = FALLBACK_QUIZ;
    initQuiz();
    return;
  }

  // 2) pokus o načítanie questions.json
  fetch('questions.json')
    .then(resp => {
      if (!resp.ok) throw new Error('Network response was not ok');
      return resp.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        QUIZ = data;
      } else {
        QUIZ = FALLBACK_QUIZ;
      }
      initQuiz();
    })
    .catch(err => {
      // fallback
      console.warn('Nepodarilo sa načítať questions.json, používam fallback otázky.', err);
      QUIZ = FALLBACK_QUIZ;
      initQuiz();
    });
}

/* =========================
   PREMENNÉ A SELECTORY
========================= */
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
  const a = Array.isArray(arr) ? [...arr] : [];
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
  if (!Array.isArray(QUIZ) || QUIZ.length === 0) {
    console.warn("QUIZ pole je prázdne alebo nedefinované.");
    if (quizBox) quizBox.innerHTML = "<p>Žiadne otázky nie sú dostupné.</p>";
    return;
  }

  // vytvoríme premiešanú kópiu otázok
  currentQuiz = shuffle(QUIZ);
  totalQuestions = currentQuiz.length;
  index = 0;
  score = 0;
  if (progressBar) progressBar.style.width = "0%";
  window._confettiTriggered = false; // reset flag pri štarte
  updateScoreBar();
  renderQuestion();
}

/* =========================
   PROGRESS BAR
========================= */
function updateProgress() {
  const percent = totalQuestions > 0 ? Math.round((index / totalQuestions) * 100) : 0;
  if (progressBar) progressBar.style.width = percent + "%";
}

/* =========================
   SCORE BAR
========================= */
function updateScoreBar() {
  if (scoreLabel) scoreLabel.textContent = `${score} správnych z ${totalQuestions}`;
}

/* =========================
   RENDER OTÁZKY
========================= */
function renderQuestion() {
  if (!currentQuiz || currentQuiz.length === 0) {
    if (quizBox) quizBox.innerHTML = "<p>Žiadne otázky na zobrazenie.</p>";
    return;
  }

  if (explanationBox) explanationBox.classList.add("hidden");
  if (resultScreen) resultScreen.classList.add("hidden");

  const q = currentQuiz[index];
  const shuffled = shuffle(q.moznosti || []);

  if (quizBox) {
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
  }

  // FLIP + BOUNCE
  setTimeout(() => {
    const inner = document.getElementById("flipInner");
    if (inner) {
      inner.classList.remove("flip-start");
      inner.classList.add("flip-end");

      inner.classList.add("bounce");
      setTimeout(() => inner.classList.remove("bounce"), 500);
    }
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

  const correctOption = (q.moznosti || []).find(m => m.id === correctId) || { text: "" };
  const chosenOption = (q.moznosti || []).find(m => m.id === chosen) || { text: "" };
  const correctText = correctOption.text;
  const chosenText = chosenOption.text;
  const correctExplain = (q.vysvetlenie && q.vysvetlenie[correctId]) || "Vysvetlenie nie je dostupné.";

  // Zablokujeme ostatné odpovede
  document.querySelectorAll(".answer").forEach(b => {
    b.style.pointerEvents = "none";
  });

  // SPRÁVNA ODPOVEĎ
  if (chosen === correctId) {
    btn.classList.add("correct", "blink-correct");
    score++;

    if (explanationBox) {
      explanationBox.innerHTML = `
        <div class="correct-title">
          ✔ Správne!
        </div>
        <div class="correct-box">
          ${correctExplain}
        </div>
      `;
    }
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

    if (explanationBox) {
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
          <span>${(q.vysvetlenie && q.vysvetlenie[chosen]) || ""}</span>
        </div>
      `;
    }
  }

  // SLIDE-IN ANIMÁCIA VYSVETLENIA
  if (explanationBox) {
    explanationBox.classList.remove("hidden");
    explanationBox.classList.remove("slide-in");
    void explanationBox.offsetWidth;
    explanationBox.classList.add("slide-in");
  }

  updateScoreBar();

  // Zobrazíme tlačidlo Ďalej
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
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
}

/* =========================
   VÝSLEDOK (konfety LEN tu pri >= 80%)
   Konfety sa spustia iba po odkliknutí všetkých otázok (na konci).
========================= */
function showResult() {
  if (quizBox) quizBox.innerHTML = "";
  if (resultScreen) resultScreen.classList.remove("hidden");

  if (scoreText) scoreText.textContent = `Získal si ${score} z ${totalQuestions} bodov.`;

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
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    // pri reštarte premiešame otázky znova
    currentQuiz = shuffle(QUIZ);
    totalQuestions = currentQuiz.length;
    index = 0;
    score = 0;
    if (progressBar) progressBar.style.width = "0%";
    window._confettiTriggered = false;
    updateScoreBar();
    renderQuestion();
  });
}

/* =========================
   TÉMY
========================= */
if (themeButtons && themeButtons.length) {
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      themeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const theme = btn.dataset.theme;
      document.body.classList.remove("theme-blue", "theme-purple", "theme-green");
      if (theme) document.body.classList.add(`theme-${theme}`);
    });
  });
  document.body.classList.add("theme-blue");
}

/* =========================
   DARK MODE
========================= */
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  });
}

/* =========================
   ŠTART: načítaj otázky a inicializuj kvíz
   - Ak máš externý questions.js, načítaj ho v HTML pred quiz.js:
     <script src="questions.js"></script>
     <script src="quiz.js"></script>
   - Ak používaš questions.json, ulož ho do rovnakého adresára a quiz.js ho načíta automaticky.
========================= */
loadQuestionsThenInit();
