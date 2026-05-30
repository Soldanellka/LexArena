'use strict';

import { $, escapeHtml } from './core.js';
import {
  paragrafy,
  setParagrafy,
  currentCaseSet,
  answeredCases,
  setAnsweredCases
} from './state.js';
import { LS } from './core.js';
import { showRewardToast } from './ui.js';
import { incrementGamesPlayed } from './avatars.js';
import { saveParagrafy } from './core.js';
import { closeModal } from './core.js';

/* =========================
   Storage keys
   ========================= */
function answeredCasesStorageKey(setKey){
  return LS.ANSWERED_CASES_PREFIX + setKey;
}

/* =========================
   Load answered cases
   ========================= */
export function loadAnsweredCases(setKey){
  const raw = localStorage.getItem(answeredCasesStorageKey(setKey));
  if(raw){
    try {
      const arr = JSON.parse(raw);
      setAnsweredCases(new Set(arr));
    } catch(e){
      setAnsweredCases(new Set());
    }
  } else {
    setAnsweredCases(new Set());
  }
}

/* =========================
   Save answered cases
   ========================= */
export function saveAnsweredCases(setKey){
  try {
    localStorage.setItem(
      answeredCasesStorageKey(setKey),
      JSON.stringify(Array.from(answeredCases))
    );
  } catch(e){}
}

/* =========================
   Render case
   ========================= */
export function renderCase(){
  const container = $('caseContainer');
  if(!container) return;

  const set = (typeof cases !== 'undefined' && cases[currentCaseSet])
    ? cases[currentCaseSet]
    : [];

  if(set.length === 0){
    container.innerHTML = '<div class="small">Žiadne prípady v tejto oblasti.</div>';
    return;
  }

  const c = set[currentCaseIndex];
  const done = answeredCases.has(c.id);

  container.innerHTML = '';

  const titleWrap = document.createElement('div');
  titleWrap.style.fontWeight = '700';
  titleWrap.style.display = 'flex';
  titleWrap.style.alignItems = 'center';
  titleWrap.style.gap = '8px';
  titleWrap.textContent = c.title;

  if(done){
    const img = document.createElement('img');
    img.src = 'assets/icons/check.svg';
    img.alt = 'vyriešené';
    img.style.width = '18px';
    img.style.height = '18px';
    img.style.marginLeft = '8px';
    titleWrap.appendChild(img);
  }

  container.appendChild(titleWrap);

  const text = document.createElement('div');
  text.className = 'small';
  text.style.marginTop = '8px';
  text.textContent = c.text;
  container.appendChild(text);

  const optsWrap = document.createElement('div');
  optsWrap.style.marginTop = '12px';
  optsWrap.style.display = 'flex';
  optsWrap.style.flexDirection = 'column';
  optsWrap.style.gap = '8px';

  c.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn case-opt';
    btn.dataset.case = c.id;
    btn.dataset.opt = opt.id;
    btn.textContent = opt.text;

    if(answeredCases.has(c.id)) btn.disabled = true;

    btn.addEventListener('click', () =>
      submitCase(btn.dataset.case, btn.dataset.opt)
    );

    optsWrap.appendChild(btn);
  });

  container.appendChild(optsWrap);

  const nav = document.createElement('div');
  nav.style.marginTop = '12px';
  nav.style.display = 'flex';
  nav.style.gap = '8px';

  const prev = document.createElement('button');
  prev.className = 'btn';
  prev.textContent = 'Predchádzajúci';
  prev.addEventListener('click', prevCase);

  const next = document.createElement('button');
  next.className = 'btn btn-primary';
  next.textContent = 'Ďalší';
  next.addEventListener('click', nextCase);

  nav.appendChild(prev);
  nav.appendChild(next);
  container.appendChild(nav);
}

/* =========================
   Submit case
   ========================= */
export function submitCase(caseId, optionId){
  const set = (typeof cases !== 'undefined' && cases[currentCaseSet])
    ? cases[currentCaseSet]
    : [];

  const c = set.find(x => x.id === caseId);
  if(!c) return;

  if(answeredCases.has(caseId)){
    showRewardToast('Tento prípad už je vyriešený.');
    return;
  }

  const opt = c.options.find(o => o.id === optionId);
  if(!opt) return;

  showRewardToast(opt.feedback || 'Spätná väzba');

  if(opt.correct){
    const newPar = paragrafy + (c.reward || 1);
    setParagrafy(newPar);
    saveParagrafy(newPar);
    $('parCount').textContent = newPar;

    answeredCases.add(caseId);
    saveAnsweredCases(currentCaseSet);
  }

  renderCase();

  const total = set.length;
  const doneCount = Array.from(answeredCases)
    .filter(id => set.find(s => s.id === id))
    .length;

  if(doneCount >= total){
    const newPar = paragrafy + 1;
    setParagrafy(newPar);
    saveParagrafy(newPar);
    $('parCount').textContent = newPar;

    setTimeout(() => {
      showRewardToast(`Všetkých ${total} prípadov vyriešených • +1 paragraf`);
      const casesModal = $('casesModal');
      if(casesModal) closeModal(casesModal);
      incrementGamesPlayed();
    }, 700);
  }
}

/* =========================
   Navigation
   ========================= */
export function nextCase(){
  const set = (typeof cases !== 'undefined' && cases[currentCaseSet])
    ? cases[currentCaseSet]
    : [];

  if(set.length === 0) return;

  currentCaseIndex = (currentCaseIndex + 1) % set.length;
  renderCase();
}

export function prevCase(){
  const set = (typeof cases !== 'undefined' && cases[currentCaseSet])
    ? cases[currentCaseSet]
    : [];

  if(set.length === 0) return;

  currentCaseIndex = (currentCaseIndex - 1 + set.length) % set.length;
  renderCase();
}

/* =========================
   Internal index
   ========================= */
let currentCaseIndex = 0;
