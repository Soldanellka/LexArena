'use strict';

import { $, loadParagrafy } from './core.js';
import { setParagrafy } from './state.js';
import { renderFaculties } from './app.js';
import { renderHeaderAvatar } from './avatars.js';
import { loadReports } from './reports.js';
import { loadAnsweredCases } from './cases.js';
import { applyTheme } from './theme.js';
import { startQuiz, nextQ, prevQ } from './quiz.js';
import { buildMemory } from './memory.js';
import { renderCase } from './cases.js';

export function init(){
  const p = loadParagrafy();
  setParagrafy(p);

  const pc = $('parCount');
  if(pc) pc.textContent = p;

  applyTheme(localStorage.getItem('lex_theme') || 'light');

  renderHeaderAvatar();
  renderFaculties();   // ✔ jediný render, ktorý potrebujeme
  loadReports();
  loadAnsweredCases('TPH-A1');

  attachEvents();
}

function attachEvents(){
  const startBtn = $('startQuizBtn');
  if(startBtn) startBtn.addEventListener('click', startQuiz);

  const nextBtn = $('nextBtn');
  if(nextBtn) nextBtn.addEventListener('click', nextQ);

  const prevBtn = $('prevBtn');
  if(prevBtn) prevBtn.addEventListener('click', prevQ);

  const openMemoryBtn = $('openMemoryBtn');
  if(openMemoryBtn){
    openMemoryBtn.addEventListener('click', () => {
      $('memoryModal').classList.add('open');
      buildMemory('TPH-A1');
    });
  }

  const closeMemory = $('closeMemory');
  if(closeMemory){
    closeMemory.addEventListener('click', () => {
      $('memoryModal').classList.remove('open');
    });
  }

  const openCasesBtn = $('openCasesBtn');
  if(openCasesBtn){
    openCasesBtn.addEventListener('click', () => {
      $('casesModal').classList.add('open');
      renderCase();
    });
  }

  const closeCases = $('closeCases');
  if(closeCases){
    closeCases.addEventListener('click', () => {
      $('casesModal').classList.remove('open');
    });
  }

  const themeToggle = $('themeToggleBtn');
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';
      applyTheme(current);
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
