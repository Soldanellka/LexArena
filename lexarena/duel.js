// ===============================
// duel.js — FINÁLNA VERZIA
// ===============================
// ===============================
// Načítanie balíka podľa tokenu alebo URL
// ===============================

const urlParams = new URLSearchParams(location.search);
const token = urlParams.get("token");
const encoded = urlParams.get("data");

let pkg = null;

// 1️⃣ Ak je balík v URL → dekódujeme ho
if (encoded) {
  try {
    pkg = JSON.parse(atob(decodeURIComponent(encoded)));

    // uložíme ho do localStorage, aby duel fungoval ďalej
    localStorage.setItem("duel_package_" + token, JSON.stringify(pkg));
  } catch (e) {
    console.error("Chyba pri dekódovaní balíka:", e);
  }
}

// 2️⃣ Ak balík nebol v URL → skúsime localStorage (napr. odosielateľ)
if (!pkg) {
  pkg = JSON.parse(localStorage.getItem("duel_package_" + token));
}

// 3️⃣ Ak stále nič → duel sa nedá spustiť
if (!pkg) {
  alert("Balík pre tento duel sa nenašiel.");
  window.location.href = "index.html";
}

// Balík rozbalíme do globálnych premenných
window.duelQuestions = pkg.quiz || [];
window.duelTiles = pkg.tiles || [];
window.duelCases = pkg.cases || [];

// Dočasné nastavenia pre právnické duely
const settings = {
  questionsCount: 5,
  enableTiles: true,
  enableCases: true
};

// Import odmien z LexAreny
import {
  rewardChallengeAccepted,
  rewardDuelWin
} from "./lexarena/rewards.js";

// Import výziev
import { saveDuelResult } from "./lexarena/challenges.js";


// Nick hráča
const playerNick = localStorage.getItem("playerNick") || "Hráč";

// --- STAV ---
let playerScore = 0;
let opponentScore = 0;
let currentQuestionIndex = 0;
let totalQuestions = settings.questionsCount;

// --- ELEMENTY ---
const matchmakingScreen = document.getElementById("duel-matchmaking");
const countdownScreen = document.getElementById("duel-countdown");
const questionsScreen = document.getElementById("duel-phase-questions");
const resultScreen = document.getElementById("duel-result");
const nickSlot = document.getElementById("duelPlayerNick");
if (nickSlot) nickSlot.textContent = playerNick;

// --- ZRUŠENIE MATCHMAKINGU ---
document.getElementById("cancel-matchmaking").onclick = () => {
  window.location.href = "index.html";
};

// --- SIMULÁCIA NÁJDENIA SÚPERA ---

// ===============================
// ODPOČET 3–2–1
// ===============================
function startCountdown() {
  matchmakingScreen.style.display = "none";
  countdownScreen.style.display = "block";

  let n = 3;
  const el = document.getElementById("countdown-number");

  const timer = setInterval(() => {
    n--;
    el.textContent = n;

    if (n === 0) {
      clearInterval(timer);
      startQuestions();
    }
  }, 1000);
}

// ===============================
// FÁZA 1 – OTÁZKY (SIMULÁCIA)
// ===============================
function startQuestions() {
  countdownScreen.style.display = "none";
  questionsScreen.style.display = "block";
  showQuestion();
}
function showQuestion() {
  const q = window.duelQuestions[currentQuestionIndex];

  document.getElementById("questions-progress").textContent =
    `Otázka ${currentQuestionIndex + 1}/${totalQuestions}`;

  document.getElementById("question-text").textContent = q.question;

  const buttons = document.querySelectorAll(".answer-tile");
  buttons.forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.onclick = () => handleAnswer(i);
  });
}
function handleAnswer(index) {
  const q = window.duelQuestions[currentQuestionIndex];

  if (index === q.correct) {
    playerScore++;
  } else {
    opponentScore++;
  }

  document.getElementById("score-a").textContent = `Ty: ${playerScore}`;
  document.getElementById("score-b").textContent = `Súper: ${opponentScore}`;

  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestions) {
    showQuestion();
  } else {
    finishDuel();
  }
}

// ===============================
// VÝSLEDKY
// ===============================
function finishDuel() {
  questionsScreen.style.display = "none";
  resultScreen.style.display = "block";

  document.getElementById("result-score-a").textContent = playerScore + " bodov";
  document.getElementById("result-score-b").textContent = opponentScore + " bodov";

  if (playerScore > opponentScore) {
    document.getElementById("duel-result-title").textContent = "Vyhral si!";
    rewardDuelWin(); // odmena za výhru
  } else {
    document.getElementById("duel-result-title").textContent = "Prehral si";
  }
// Uloženie výsledku do výzvy

const nickResultSlot = document.getElementById("resultPlayerNick");
if (nickResultSlot) nickResultSlot.textContent = playerNick;

}

// ===============================
// TLAČIDLÁ
// ===============================
document.getElementById("play-again").onclick = () => {
  window.location.reload();
};

document.getElementById("back-home").onclick = () => {
  window.location.href = "index.html";
};
// Spustenie duelu po načítaní balíka

// Spusti duel až keď je stránka načítaná
window.addEventListener("DOMContentLoaded", () => {
  startCountdown();
});
