// ===============================
// duel.js — FINÁLNA VERZIA
// ===============================
// ===============================
// Načítanie balíka podľa tokenu
// ===============================

const token = new URLSearchParams(location.search).get("token");
const pkg = JSON.parse(localStorage.getItem("duel_package_" + token));

if (!pkg) {
  alert("Balík pre tento duel sa nenašiel.");
  window.location.href = "index.html";
}

// Balík rozbalíme do globálnych premenných
window.duelQuestions = pkg.quiz || [];
window.duelTiles = pkg.tiles || [];
window.duelCases = pkg.cases || [];

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
setTimeout(() => {
  // odmena za prijatú výzvu
  rewardChallengeAccepted();

  // pokračujeme do odpočtu
  startCountdown();
}, 1500);

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

  // Simulácia výsledku po 3 sekundách
  setTimeout(() => {
    playerScore = Math.floor(Math.random() * 10) + 5;
    opponentScore = Math.floor(Math.random() * 10) + 5;

    finishDuel();
  }, 3000);
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
const challengeId = sessionStorage.getItem("activeChallengeId");
if (challengeId) {
  saveDuelResult(challengeId, playerScore, opponentScore);
}

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
