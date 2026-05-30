// ===============================
// duel.js — FINÁLNA VERZIA
// ===============================

// Import odmien z LexAreny
import {
  rewardChallengeAccepted,
  rewardDuelWin
} from "./lexarena/rewards.js";
// Import výziev
import { saveDuelResult } from "./lexarena/challenges.js";

// Aktívna výzva
let activeChallenge = null;

// Načítanie výzvy a balíka otázok
function loadChallenge() {
  const id = sessionStorage.getItem("activeChallengeId");
  if (!id) return;

  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  activeChallenge = all.find(c => c.id === id);

  if (!activeChallenge) return;

  // načítame balík otázok
  const allPackages = JSON.parse(localStorage.getItem("duelPackages") || "[]");
  const pkg = allPackages.find(p => p.id === activeChallenge.packageId);

  if (pkg) {
    // sem si uložíš otázky, keď ich budeš používať
    window.duelQuestions = pkg.questions || [];
    window.duelTiles = pkg.tiles || [];
    window.duelCases = pkg.cases || [];
  }
}

// Nick hráča
const playerNick = localStorage.getItem("playerNick") || "Hráč";
loadChallenge();

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
