'use strict';

/* ============================================================
   reports.js – MOST MEDZI STARÝM A NOVÝM SYSTÉMOM

   Tento súbor zachováva pôvodné exporty (loadReports,
   openReportModal) ktoré používajú init.js a ostatné moduly,
   ale ich implementáciu deleguje na nový Firebase systém
   v scripts/reports-system.js.
============================================================ */

import { showRewardToast } from './ui.js';

/* loadReports – init.js ho importuje, Firebase verzia
   nepotrebuje lokálnu inicializáciu, ale funkcia musí existovať */
export function loadReports() {
  // Nový systém načítava reporty priamo z Firebase pri otvorení
  // Súdnej siene – tu len ticho uspejeme
  console.log('📋 Reports systém pripravený (Firebase)');
}

/* openReportModal – deleguje na scripts/reports-system.js
   ktorý sa načítava ako samostatný modul cez index.html */
export function openReportModal(prefill = {}) {
  if (typeof window.openReportModal === 'function') {
    window.openReportModal(prefill);
  } else {
    // Fallback ak sa reports-system.js ešte nenačítal
    setTimeout(() => {
      if (typeof window.openReportModal === 'function') {
        window.openReportModal(prefill);
      } else {
        showRewardToast('Formulár sa načítava, skús znova.');
      }
    }, 500);
  }
}

/* Zachovaj staré exporty pre prípad že ich niečo iné volá */
export function persistReports() {}
export function saveReports() {}
export { openReportModal as createReportModal };
