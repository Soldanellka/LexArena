'use strict';

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
import { initAvatarSystem, selectAvatar } from './scripts/avatar.js';

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
   MODAL VÝBERU AVATARA
   ===================================================== */
async function openAvatarSelectModal() {
  const existing = document.getElementById('avatarSelectModal');
  if (existing) {
    existing.style.display = 'flex';
    return;
  }

  const nick = localStorage.getItem('playerNick');
  const db = window.db;

  // Načítaj stav hráča pre kontrolu odomknutia
  let totalEarned = 0;
  let acceptedReports = 0;
  if (db && nick) {
    try {
      const { ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");
      const snap = await get(ref(db, `users/${nick}`));
      if (snap.exists()) {
        const d = snap.val();
        totalEarned = d.totalParagraphsEarned || 0;
        acceptedReports = d.acceptedReports || 0;
      }
    } catch(e) {}
  }

  const AVATARS = [
    { id: 'student-f', name: 'Študentka práva', emoji: '👩‍⚖️', desc: 'Dostupná pre všetkých', locked: false },
    { id: 'student-m', name: 'Študent práva',   emoji: '👨‍⚖️', desc: 'Dostupný pre všetkých', locked: false },
    { id: 'cat',       name: 'Právnická mačka', emoji: '🐱',   desc: `Za 100§ celkovo (máš ${totalEarned}§)`, locked: totalEarned < 100 },
    { id: 'owl',       name: 'Sova múdrosti',   emoji: '🦉',   desc: `Za 100 nahlásení (máš ${acceptedReports})`, locked: acceptedReports < 100 },
  ];

  const modal = document.createElement('div');
  modal.id = 'avatarSelectModal';
  modal.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,0.5);
    display:flex; align-items:center; justify-content:center;
    z-index:9999;
  `;

  const panel = document.createElement('div');
  panel.style.cssText = `
    background:var(--surface,#fff); border-radius:20px;
    padding:28px; max-width:400px; width:90%;
    box-shadow:0 20px 60px rgba(0,0,0,0.25);
  `;

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
      <div>
        <h3 style="margin:0;font-size:18px">Vyber avatar</h3>
        <div class="small" style="color:var(--muted)">Klikni na avatar ktorý chceš používať</div>
      </div>
      <button id="closeAvatarSelectModal" class="btn" style="padding:6px 12px">✕</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${AVATARS.map(av => `
        <div class="avatar-select-card" data-id="${av.id}" style="
          border:2px solid ${av.locked ? 'var(--border,#eee)' : 'var(--border,#eee)'}; border-radius:14px;
          padding:16px; text-align:center; cursor:pointer;
          transition:all .2s; opacity:${av.locked ? '0.55' : '1'};
          position:relative;
        ">
          ${av.locked ? '<div style="position:absolute;top:8px;right:8px;font-size:14px">🔒</div>' : ''}
          <div style="font-size:42px;margin-bottom:8px">${av.emoji}</div>
          <div style="font-weight:600;font-size:13px">${av.name}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:4px">${av.desc}</div>
        </div>
      `).join('')}
    </div>
  `;

  modal.appendChild(panel);
  document.body.appendChild(modal);

  // Zatvorenie
  document.getElementById('closeAvatarSelectModal').onclick = () => {
    modal.style.display = 'none';
  };
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Výber avatara
  panel.querySelectorAll('.avatar-select-card').forEach(card => {
    card.onmouseenter = () => {
      card.style.borderColor = 'var(--accent-3,#f08ab0)';
      card.style.transform = 'scale(1.04)';
    };
    card.onmouseleave = () => {
      card.style.borderColor = 'var(--border,#eee)';
      card.style.transform = 'scale(1)';
    };
    card.onclick = async () => {
      const avatarId = card.dataset.id;
      await selectAvatar(avatarId);
      modal.style.display = 'none';
    };
  });
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

    /* 🔹 Avatar systém */
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

  /* 🔥 Klik na avatar → modal výberu */
  const avatarWrap = $('avatarWrap');
  if (avatarWrap) {
    avatarWrap.addEventListener('click', openAvatarSelectModal);
    avatarWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openAvatarSelectModal();
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
