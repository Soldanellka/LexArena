// lexarena/arena.js
// -------------------------------------------------------------
// Paragrafy + Duel balíky + UI pre "Hry pripravené na výzvu"
// -------------------------------------------------------------

// ---------------- PARAGRAFY ----------------

export let paragrafy = Number(localStorage.getItem("paragrafy")) || 0;

export function aktualizovatParagrafyUI() {
  const el = document.getElementById("paragrafValue");
  if (el) el.textContent = paragrafy;
}

export function pridatParagrafy(pocet = 1) {
  paragrafy += pocet;
  localStorage.setItem("paragrafy", paragrafy);
  aktualizovatParagrafyUI();
}

// ---------------- DUEL BALÍKY ----------------

const LS_DUEL_PACKAGES = "duel_packages";

// načítanie uložených balíkov
export function loadDuelPackages() {
  try {
    return JSON.parse(localStorage.getItem(LS_DUEL_PACKAGES) || "[]");
  } catch {
    return [];
  }
}

// uloženie jedného balíka
export function saveDuelPackage(pkg) {
  const all = loadDuelPackages();
  all.unshift(pkg); // najnovší hore
  localStorage.setItem(LS_DUEL_PACKAGES, JSON.stringify(all));
}

// import z lastDuelPackage (zo študijnej apky)
export function importLastDuelPackage() {
  const pkg = JSON.parse(localStorage.getItem("lastDuelPackage") || "null");
  if (!pkg) return;

  saveDuelPackage(pkg);
  localStorage.removeItem("lastDuelPackage");
}

// ---------------- UI: HRY PRIPRAVENÉ NA VÝZVU ----------------

export function renderDuelPackages() {
  const list = document.getElementById("duelPackagesList");
  if (!list) return;

  const pkgs = loadDuelPackages();

  if (pkgs.length === 0) {
    list.innerHTML = `<p>Nemáš žiadne pripravené hry.</p>`;
    return;
  }

  list.innerHTML = pkgs.map(pkg => `
    <div class="duel-card">
      <div class="duel-title">${pkg.subject}</div>
      <div class="duel-info">
        Otázky: ${pkg.quiz.length} • Prípady: ${pkg.cases.length}
      </div>
      <div class="duel-time">
        ${new Date(pkg.timestamp).toLocaleString("sk-SK")}
      </div>
      <button class="send-challenge-btn" data-id="${pkg.timestamp}">
        Poslať výzvu
      </button>
    </div>
  `).join("");
}

// ---------------- ODOŠLANIE VÝZVY ----------------

import { sendChallenge } from "./challenges.js";

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("send-challenge-btn")) return;

  const id = Number(e.target.dataset.id);
  const pkgs = loadDuelPackages();
  const pkg = pkgs.find(p => p.timestamp === id);
  if (!pkg) return;

  const token = crypto.randomUUID();
  const ONLINE_ORIGIN = "https://lex-arena-seven.vercel.app";

  // 🔥 1. Zakódujeme balík do URL
  const encoded = encodeURIComponent(btoa(JSON.stringify(pkg)));

  // 🔥 2. Uložíme výzvu (už len token)
  const toNick = localStorage.getItem("playerNick");
  sendChallenge(toNick, token);

  // 🔥 3. Vygenerujeme link s balíkom
  const url = `${ONLINE_ORIGIN}/?token=${token}&data=${encoded}`;
  navigator.clipboard.writeText(url);

  alert("Výzva bola uložená a link skopírovaný. Otvor LexArenu a prijmi výzvu.");
});

// ---------------- INIT PRI NAČÍTANÍ STRÁNKY ----------------

export function initArena() {
  aktualizovatParagrafyUI();
  importLastDuelPackage();
  renderDuelPackages();
}
