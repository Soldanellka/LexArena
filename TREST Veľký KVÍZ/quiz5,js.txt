/* =========================
   quiz.js — kompletný súbor
   Obsahuje: databázu otázok (pôvodné + doplnené), UI logiku, dark mode, konfety
   Vlož tento súbor namiesto existujúceho quiz.js
========================= */

/* =========================
   DATABÁZA OTÁZOK (QUIZ)
   Tu sú pôvodné otázky, ktoré sme spolu pripravili.
   Ak chceš pridať ďalšie, pridaj ich do poľa nižšie.
========================= */
const QUIZ = [
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
      A: "Trestný čin = spoločensky nebezpečné protiprávne konanie, ktoré zákon označuje a trestá; zahŕňa znaky skutkovej podstaty.",
      B: "Nepresné – musí byť spoločensky nebezpečné a definované zákonom.",
      C: "Nesprávne – hranica škody nie je univerzálnym kritériom.",
      D: "Nesprávne – môže byť aj nedbanlivostný trestný čin."
    }
  },

  {
    otazka: "Ktoré tri prvky tvorí objektívna stránka trestného činu?",
    moznosti: [
      { id: "A", text: "Konanie alebo opomenutie; následok; príčinný vzťah" },
      { id: "B", text: "Úmysel; motivácia; následok" },
      { id: "C", text: "Osoba páchateľa; trest; náhrada škody" },
      { id: "D", text: "Dôkaz; svedok; znalecký posudok" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Objektívna stránka = vonkajšia podoba činu: konanie/opomenutie → následok → kauzalita.",
      B: "To sú prvky subjektívnej stránky a motívu, nie objektívnej stránky.",
      C: "Súvisia s následkami, nie s objektívnou stránkou skutku.",
      D: "Sú to procesné prostriedky dokazovania."
    }
  },

  {
    otazka: "Čo je individuálny objekt skutkovej podstaty?",
    moznosti: [
      { id: "A", text: "Konkrétny spoločenský záujem chránený daným ustanovením" },
      { id: "B", text: "Osoba páchateľa" },
      { id: "C", text: "Trest, ktorý hrozí za čin" },
      { id: "D", text: "Procesné pravidlá súdu" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Individuálny objekt odpovedá na otázku „čo toto ustanovenie chráni?“ (napr. zdravie, majetok).",
      B: "To je subjekt, nie objekt.",
      C: "Trest nie je objektom skutkovej podstaty.",
      D: "Procesné pravidlá nie sú individuálnym objektom hmotnoprávnej skutkovej podstaty."
    }
  },

  {
    otazka: "Ktoré z nasledujúcich patria medzi okolnosti vylučujúce protiprávnosť?",
    moznosti: [
      { id: "A", text: "Nutná obrana; krajné núdzové opatrenie; súhlas poškodeného" },
      { id: "B", text: "Len súhlas poškodeného" },
      { id: "C", text: "Len úmysel páchateľa" },
      { id: "D", text: "Len vek páchateľa" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Okolnosti vylučujúce protiprávnosť napr. nutná obrana, krajné núdzové opatrenie, súhlas poškodeného (ak zákon pripúšťa).",
      B: "Súhlas môže byť jednou z okolností, ale nie jedinou.",
      C: "Úmysel je súčasť subjektívnej stránky, nie okolnosť vylučujúca protiprávnosť.",
      D: "Vek môže ovplyvniť trestnú zodpovednosť, nie priamo protiprávnosť."
    }
  },

  {
    otazka: "Čo znamená pojem 'páchateľ trestného činu' v hmotnom práve?",
    moznosti: [
      { id: "A", text: "Osoba, ktorá konala alebo opomenula a spĺňa zákonné znaky páchateľa" },
      { id: "B", text: "Len osoba, ktorá bola odsúdená" },
      { id: "C", text: "Len fyzická osoba, právnické osoby nie sú páchateľmi" },
      { id: "D", text: "Osoba, ktorá podala trestné oznámenie" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Páchateľ = ten, kto spáchal trestný čin a spĺňa znaky páchateľa podľa zákona (fyzická alebo právnická osoba, ak zákon umožňuje).",
      B: "Byť odsúdený nie je definíciou páchateľa.",
      C: "Právnické osoby môžu niesť trestnú zodpovednosť podľa osobitných ustanovení.",
      D: "Podanie oznámenia nie je páchateľstvo."
    }
  },

  {
    otazka: "Ktoré oblasti patria do osobitnej časti trestného práva (druhové členenie)?",
    moznosti: [
      { id: "A", text: "Trestné činy proti životu; proti majetku; hospodárske trestné činy" },
      { id: "B", text: "Len trestné činy proti majetku" },
      { id: "C", text: "Len trestné činy proti životu" },
      { id: "D", text: "Len procesné inštitúty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Osobitná časť obsahuje skupiny trestných činov: proti životu, zdraviu, majetku, hospodárske, korupčné a pod.",
      B: "Neúplné.",
      C: "Neúplné.",
      D: "Procesné inštitúty patria do trestného práva procesného."
    }
  },

  {
    otazka: "Čo je hmotný predmet útoku v skutkovej podstate?",
    moznosti: [
      { id: "A", text: "Vec, zviera alebo človek, na ktorý páchateľ priamo pôsobí" },
      { id: "B", text: "Len majetok páchateľa" },
      { id: "C", text: "Len trest" },
      { id: "D", text: "Len miesto činu" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Hmotný predmet útoku = to, na čo páchateľ cieli (napr. 'cudzia vec' pri krádeži, 'dieťa' pri únose).",
      B: "Môže to byť majetok, ale nie len majetok páchateľa.",
      C: "Trest nie je predmet útoku.",
      D: "Miesto nie je hmotný predmet útoku."
    }
  },

  {
    otazka: "Kedy sa považuje skutok za trestný čin právnickej osoby?",
    moznosti: [
      { id: "A", text: "Ak zákon výslovne upravuje trestnú zodpovednosť právnickej osoby a sú splnené znaky" },
      { id: "B", text: "Vždy, keď koná zamestnanec" },
      { id: "C", text: "Len ak je páchateľom konateľ spoločnosti" },
      { id: "D", text: "Právnické osoby nikdy nemôžu byť trestne zodpovedné" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Právnická osoba môže niesť trestnú zodpovednosť len ak to upravuje zákon a sú splnené podmienky (napr. ziskový cieľ, nedbanlivosť pri dozore).",
      B: "Nie vždy – závisí od zákonnej úpravy a okolností.",
      C: "Nie len konateľ; závisí od konkrétnej úpravy a konania osôb v mene právnickej osoby.",
      D: "Nepravda."
    }
  },

  {
    otazka: "Ktorý princíp patrí medzi základné zásady trestného konania?",
    moznosti: [
      { id: "A", text: "Zásada presumpcie neviny" },
      { id: "B", text: "Zásada automatického trestu" },
      { id: "C", text: "Zásada verejného potrestania bez súdu" },
      { id: "D", text: "Zásada utajenia všetkých procesných úkonov" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Presumpcia neviny je základnou zásadou: obvinený sa považuje za nevinného, kým sa vina nepreukáže.",
      B: "Neexistuje.",
      C: "Protiústavné.",
      D: "Nie všeobecne platné; proces má verejnosť ako princíp s výnimkami."
    }
  }
];

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
    quizBox.innerHTML = "<p>Žiadne otázky nie sú dostupné.</p>";
    return;
  }

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
    quizBox.innerHTML = "<p>Žiadne otázky na zobrazenie.</p>";
    return;
  }

  if (explanationBox) explanationBox.classList.add("hidden");
  if (resultScreen) resultScreen.classList.add("hidden");

  const q = currentQuiz[index];
  const shuffled = shuffle(q.moznosti || []);

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
   ŠTART
========================= */
initQuiz();

/* =========================
   POZNÁMKY
   - Ak chceš, aby som pridal konkrétne otázky z PDF Paneurópskej, pošli text alebo vyznač konkrétne kapitoly.
   - Môžem tiež pripraviť export (JSON/CSV) s otázkami, ak budeš chcieť importovať do inej aplikácie.
   - Ak chceš iné prahy pre konfety (napr. 85% alebo 75%), poviem ti, kde zmeniť podmienku.
========================= */
