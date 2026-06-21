'use strict';

import { $, loadParagrafy } from './core.js';
import { setParagrafy } from './state.js';
import { renderAreas, renderModules } from './app.js';
import { renderHeaderAvatar } from './avatars.js';
import { loadReports } from './reports.js';
import { loadAnsweredCases } from './cases.js';
import { applyTheme } from './theme.js';
import { startQuiz, nextQ, prevQ } from './quiz.js';

export function init() {
  // 🔹 Načítanie paragrafov
  const p = loadParagrafy();
  setParagrafy(p);

  const pc = $('paragrafValue');   // opravené ID podľa index.html
  if (pc) pc.textContent = p;

  // 🔹 Téma (light/dark)
  applyTheme(localStorage.getItem('theme') || 'light');

  // 🔹 Renderovanie hlavičky a hlavných sekcií
  renderHeaderAvatar();
  renderAreas();
  renderModules();

  // 🔹 Reporty a prípady
  loadReports();
  loadAnsweredCases('TPH-A1');

  // 🔹 Pripojenie udalostí
  attachEvents();
}

function attachEvents() {
  const startBtn = $('startQuizBtn');
  if (startBtn) startBtn.addEventListener('click', startQuiz);

  const nextBtn = $('nextBtn');
  if (nextBtn) nextBtn.addEventListener('click', nextQ);

  const prevBtn = $('prevBtn');
  if (prevBtn) prevBtn.addEventListener('click', prevQ);

  const themeToggle = $('themeToggleBtn');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current =
        document.documentElement.getAttribute('data-theme') === 'dark'
          ? 'light'
          : 'dark';
      applyTheme(current);
    });
  }
}

// 🔥 Spustenie inicializácie po načítaní DOM
document.addEventListener('DOMContentLoaded', init);
