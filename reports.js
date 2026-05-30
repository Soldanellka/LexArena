'use strict';

import { $, escapeHtml } from './core.js';
import {
  reports,
  addReport,
  updateReports,
  selectedFaculty,
  selectedArea
} from './state.js';
import { LS } from './core.js';
import { showRewardToast } from './ui.js';
import { closeModal, openModal } from './core.js';

/* ===============================
   Perzistencia reportov
   =============================== */
export function persistReports(){
  try {
    localStorage.setItem(LS.REPORTS, JSON.stringify(reports));
  } catch(e){}
}

export function loadReports(){
  const raw = localStorage.getItem(LS.REPORTS);
  if(!raw){
    updateReports([]);
    return;
  }

  try {
    const arr = JSON.parse(raw);
    updateReports(Array.isArray(arr) ? arr : []);
  } catch(e){
    updateReports([]);
  }
}

/* ===============================
   Vytvorenie modalu (ak neexistuje)
   =============================== */
export function createReportModal(){
  if($('reportModal')) return;

  const modal = document.createElement('div');
  modal.id = 'reportModal';
  modal.className = 'avatar-modal';
  modal.setAttribute('aria-hidden','true');

  const panel = document.createElement('div');
  panel.className = 'avatar-panel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','true');
  panel.style.maxWidth = '760px';

  /* Header */
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';

  const h3 = document.createElement('h3');
  h3.textContent = 'Nahlásiť právnu nezrovnalosť';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn';
  closeBtn.id = 'closeReportModal';
  closeBtn.textContent = 'Zavrieť';

  header.appendChild(h3);
  header.appendChild(closeBtn);
  panel.appendChild(header);

  /* Hidden ID */
  const hid = document.createElement('input');
  hid.type = 'hidden';
  hid.id = 'reportQuestionId';
  panel.appendChild(hid);

  /* Argumentácia */
  const labelArg = document.createElement('label');
  labelArg.className = 'small';
  labelArg.style.marginTop = '12px';
  labelArg.textContent = 'Argumentácia';
  panel.appendChild(labelArg);

  const taArg = document.createElement('textarea');
  taArg.id = 'reportArgument';
  taArg.rows = 4;
  panel.appendChild(taArg);

  /* Návrh novej otázky */
  const labelProp = document.createElement('label');
  labelProp.className = 'small';
  labelProp.style.marginTop = '12px';
  labelProp.textContent = 'Návrh novej otázky';
  panel.appendChild(labelProp);

  const taProp = document.createElement('textarea');
  taProp.id = 'reportProposal';
  taProp.rows = 4;
  panel.appendChild(taProp);

  /* Možnosti */
  const labelOpts = document.createElement('label');
  labelOpts.className = 'small';
  labelOpts.style.marginTop = '12px';
  labelOpts.textContent = 'Možnosti (oddelené bodkočiarkou)';
  panel.appendChild(labelOpts);

  const inpOpts = document.createElement('input');
  inpOpts.id = 'reportOptions';
  inpOpts.type = 'text';
  inpOpts.placeholder = 'A;B;C';
  panel.appendChild(inpOpts);

  /* Index správnej odpovede */
  const labelIdx = document.createElement('label');
  labelIdx.className = 'small';
  labelIdx.style.marginTop = '12px';
  labelIdx.textContent = 'Index správnej odpovede (0-based)';
  panel.appendChild(labelIdx);

  const inpIdx = document.createElement('input');
  inpIdx.id = 'reportCorrectIndex';
  inpIdx.type = 'number';
  inpIdx.min = 0;
  inpIdx.value = 0;
  panel.appendChild(inpIdx);

  /* Actions */
  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '8px';
  actions.style.justifyContent = 'flex-end';
  actions.style.marginTop = '12px';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn';
  submitBtn.id = 'submitReportBtn';
  submitBtn.textContent = 'Odoslať hlásenie';

  actions.appendChild(submitBtn);
  panel.appendChild(actions);

  modal.appendChild(panel);
  document.body.appendChild(modal);

  /* Events */
  closeBtn.addEventListener('click', () => closeModal(modal));
  submitBtn.addEventListener('click', submitReportFromModal);
}

/* ===============================
   Otvorenie modalu s predvyplnením
   =============================== */
export function openReportModal(prefill = {}){
  if(!$('reportModal')) createReportModal();

  const modal = $('reportModal');
  openModal(modal);

  if(prefill.questionId) $('reportQuestionId').value = prefill.questionId;
  if(prefill.questionText) $('reportProposal').value = prefill.questionText;
}

/* ===============================
   Odoslanie reportu
   =============================== */
export function submitReportFromModal(){
  const argument = ($('reportArgument')?.value || '').trim();
  const proposal = ($('reportProposal')?.value || '').trim();
  const options = ($('reportOptions')?.value || '')
    .split(';')
    .map(s => s.trim())
    .filter(Boolean);

  const correctIndex = Number($('reportCorrectIndex')?.value || 0);
  const questionId = $('reportQuestionId')?.value || null;

  if(!argument || !proposal){
    alert('Vyplň argumentáciu aj návrh.');
    return;
  }

  const report = {
    id: 'r_' + Date.now(),
    type: 'question',
    questionId,
    targetFaculty: selectedFaculty || null,
    targetArea: selectedArea ? selectedArea.id : null,
    argument,
    proposal,
    proposalOptions: options,
    proposalCorrectIndex: correctIndex,
    status: 'pending',
    guaranteedBy: null,
    approvedBy: null,
    createdAt: new Date().toISOString()
  };

  addReport(report);
  persistReports();

  closeModal($('reportModal'));
  showRewardToast('Hlásenie odoslané.');
}

/* ===============================
   Export pre admin panel
   =============================== */
export { persistReports as saveReports };
