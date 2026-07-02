'use strict';

import { $, escapeHtml, LS, saveParagrafy, closeModal } from './core.js';
import {
  paragrafy,
  setParagrafy,
  currentCaseSet,
  answeredCases,
  setAnsweredCases
} from './state.js';
import { showRewardToast } from './ui.js';
import { incrementGamesPlayed } from './avatars.js';

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

  const set = window.cases?.[currentCaseSet] ?? [];

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

    if(done) btn.disabled = true;

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
  const set = window.cases?.[currentCaseSet] ?? [];
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

    const pc = $('parCount');
    if(pc) pc.textContent = newPar;

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

    const pc = $('parCount');
    if(pc) pc.textContent = newPar;

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
  const set = window.cases?.[currentCaseSet] ?? [];
  if(set.length === 0) return;

  currentCaseIndex = (currentCaseIndex + 1) % set.length;
  renderCase();
}

export function prevCase(){
  const set = window.cases?.[currentCaseSet] ?? [];
  if(set.length === 0) return;

  currentCaseIndex = (currentCaseIndex - 1 + set.length) % set.length;
  renderCase();
}

/* =========================
   Internal index
   ========================= */
let currentCaseIndex = 0;

/* =========================
   LOAD CASES FROM DUEL QUESTIONS
   Načíta prípady z JSON otázok (každá otázka = prípad)
   ========================= */
export function loadCasesFromQuestions(questions, areaTitle) {
  const container = $('caseContainer');
  if (!container) return;

  if (!questions || !questions.length) {
    container.innerHTML = '<div class="small muted">Žiadne otázky pre túto oblasť.</div>';
    return;
  }

  // Konvertuj otázky do formátu prípadov
  const cases = questions.map((q, i) => ({
    id: `case_${i}`,
    title: q.question || `Prípad ${i + 1}`,
    options: q.options || [],
    correct: typeof q.correct === 'number' ? q.correct : 0,
    source: q.source || areaTitle
  }));

  // Ulož do window pre renderovanie
  window.__currentCases = cases;
  window.__currentCaseIndex = 0;
  window.__answeredCasesLocal = new Set();

  renderCasesFromQuestions(container);
}

function renderCasesFromQuestions(container) {
  const cases = window.__currentCases || [];
  const idx = window.__currentCaseIndex || 0;
  const answered = window.__answeredCasesLocal || new Set();

  if (!cases.length) return;

  const c = cases[idx];
  const isDone = answered.has(c.id);
  const total = cases.length;

  container.innerHTML = '';

  // Hlavička
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px';
  header.innerHTML = `
    <div class="small muted">Prípad ${idx + 1} z ${total}
      ${c.source ? `• <em>${c.source}</em>` : ''}
    </div>
    <div style="display:flex;gap:6px">
      <button class="btn" id="casePrevBtn" ${idx === 0 ? 'disabled' : ''} style="padding:4px 10px;font-size:12px">◀</button>
      <button class="btn" id="caseNextBtn" ${idx === total-1 ? 'disabled' : ''} style="padding:4px 10px;font-size:12px">▶</button>
    </div>`;
  container.appendChild(header);

  // Otázka
  const qEl = document.createElement('div');
  qEl.style.cssText = 'font-weight:600;font-size:14px;line-height:1.5;margin-bottom:14px;padding:12px;background:rgba(240,138,166,0.06);border-radius:10px;border-left:3px solid var(--accent-3)';
  qEl.textContent = c.title;
  container.appendChild(qEl);

  // Možnosti
  const optContainer = document.createElement('div');
  optContainer.style.cssText = 'display:flex;flex-direction:column;gap:8px';

  c.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.cssText = 'text-align:left;padding:10px 14px;font-size:13px;border-radius:10px;transition:all .18s;';
    btn.textContent = opt;

    if (isDone) {
      if (i === c.correct) {
        btn.style.background = 'rgba(34,197,94,0.12)';
        btn.style.borderColor = 'rgba(34,197,94,0.4)';
        btn.textContent = opt + '  ✓';
      }
      btn.disabled = true;
    } else {
      btn.onclick = () => {
        const isCorrect = i === c.correct;
        answered.add(c.id);
        window.__answeredCasesLocal = answered;

        optContainer.querySelectorAll('button').forEach((b, bi) => {
          b.disabled = true;
          if (bi === c.correct) {
            b.style.background = 'rgba(34,197,94,0.12)';
            b.style.borderColor = 'rgba(34,197,94,0.4)';
            b.textContent = b.textContent + '  ✓';
          } else if (bi === i && !isCorrect) {
            b.style.background = 'rgba(239,68,68,0.08)';
            b.style.borderColor = 'rgba(239,68,68,0.3)';
            b.textContent = b.textContent + '  ✗';
          }
        });

        // Správa o výsledku
        const msg = document.createElement('div');
        msg.style.cssText = `margin-top:10px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;
          background:${isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.08)'};
          color:${isCorrect ? '#16a34a' : '#dc2626'};`;
        msg.textContent = isCorrect
          ? '✅ Správne! Výborne!'
          : `❌ Nesprávne. Správna odpoveď: ${c.options[c.correct]}`;
        container.appendChild(msg);
      };
    }

    optContainer.appendChild(btn);
  });

  container.appendChild(optContainer);

  // Navigácia
  container.querySelector('#casePrevBtn')?.addEventListener('click', () => {
    window.__currentCaseIndex = Math.max(0, idx - 1);
    renderCasesFromQuestions(container);
  });

  container.querySelector('#caseNextBtn')?.addEventListener('click', () => {
    window.__currentCaseIndex = Math.min(total - 1, idx + 1);
    renderCasesFromQuestions(container);
  });

  // Progres
  const prog = document.createElement('div');
  prog.style.cssText = 'margin-top:14px';
  prog.innerHTML = `
    <div class="small muted" style="margin-bottom:4px">
      Vyriešené: ${answered.size} / ${total}
    </div>
    <div class="progress">
      <i style="width:${Math.round(answered.size/total*100)}%;display:block;height:100%;
        background:linear-gradient(90deg,var(--accent-2),var(--accent-3));border-radius:999px"></i>
    </div>`;
  container.appendChild(prog);
}

window.loadCasesFromQuestions = loadCasesFromQuestions;
