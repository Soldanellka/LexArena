'use strict';

/* =====================================================
   IMPORTY
   ===================================================== */
import { $, loadParagrafy } from './core.js';
import { setParagrafy } from './state.js';
import { renderAreas, renderModules } from './app.js';
import { renderHeaderAvatar } from './avatars.js';
import { loadReports } from './reports.js';
import { loadAnsweredCases } from './cases.js';
import { applyTheme } from './theme.js';
import { nextQ, prevQ } from './quiz.js';
import { initDuelLeaderboard } from './scripts/leaderboard.js';
import { watchDuelBankBadge } from './scripts/duels.js';
import { initAvatarSystem } from './scripts/avatar.js';

/* =====================================================
   ČAKANIE NA DATA.JS + AREAS.JS + CATALOG
   ===================================================== */
function waitForAllData(callback) {
  let attempts = 0;
  const timer = setInterval(() => {
    attempts++;
    const areasReady =
      typeof window.areas !== 'undefined' &&
      Object.keys(window.areas).length > 0;
    const catalogReady =
      typeof window.catalog !== 'undefined' &&
      Object.keys(window.catalog).length > 0;
    const externalReady =
      typeof window.catalog !== 'undefined' &&
      typeof window.catalog.openExternal === 'function';

    if (areasReady && catalogReady && externalReady) {
      clearInterval(timer);
      console.log("🔥 ALL DATA READY → spúšťam INIT");
      callback();
    }

    if (attempts > 80) {
      clearInterval(timer);
      console.error("❌ Nepodarilo sa načítať areas alebo catalog.");
    }
  }, 100);
}

/* =====================================================
   HLAVNÁ INIT FUNKCIA
   ===================================================== */
export function init() {
  waitForAllData(() => {
    /* 🔹 Paragrafy */
    const p = loadParagrafy();
    setParagrafy(p);
    const pc = $('parCount') || $('paragrafValue');
    if (pc) pc.textContent = p;

    /* 🔹 Téma */
    applyTheme(localStorage.getItem('theme') || 'light');

    /* 🔹 UI */
    renderHeaderAvatar();
    renderAreas();
    renderModules();

    /* 🔹 Reporty a prípady */
    loadReports();
    loadAnsweredCases('TPH-A1');

    /* 🔹 Rebríček duelov */
    initDuelLeaderboard();

    /* 🔹 Udalosti */
    attachEvents();

    /* 🔹 Pulzujúci odznak na "Uložené výzvy" */
    watchDuelBankBadge();

    /* 🔹 Avatar systém (energia, login streak, kŕmenie) */
    initAvatarSystem();
  });
}

/* =====================================================
   UDALOSTI
   ===================================================== */
function attachEvents() {
  const nextBtn = $('nextBtn');
  if (nextBtn) nextBtn.addEventListener('click', nextQ);

  const prevBtn = $('prevBtn');
  if (prevBtn) prevBtn.addEventListener('click', prevQ);

  const themeToggle = $('themeToggleBtn');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light' : 'dark';
      applyTheme(current);
    });
  }

  /* 🔥 Banka duelov */
  const toggleDuelBankBtn = $('toggleDuelBankBtn');
  const duelBankBox = $('duelBank');
  if (toggleDuelBankBtn && duelBankBox) {
    toggleDuelBankBtn.addEventListener('click', () => {
      const isHidden = duelBankBox.style.display === 'none';
      duelBankBox.style.display = isHidden ? 'block' : 'none';
      if (isHidden && typeof window.renderDuelBank === 'function') {
        window.renderDuelBank();
      }
    });
  } else {
    console.warn('⚠️ toggleDuelBankBtn alebo duelBank element sa nenašiel v DOM.');
  }
}

/* =====================================================
   SPUSTENIE PO NAČÍTANÍ DOM
   ===================================================== */
document.addEventListener('DOMContentLoaded', init);
