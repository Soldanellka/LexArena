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
        // Fallback: ak totalParagraphsEarned neexistuje, použi aktuálny zostatok
        totalEarned = d.totalParagraphsEarned || d.paragrafy || 0;
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

    /* 🔹 Rola systém */
    initRoleSystem();

    /* 🔹 Garančná pečať */
    initGuarantorSeal();

    /* 🔹 Udalosti */
    attachEvents();

    /* 🔹 Pulzujúci odznak na "Uložené výzvy" */
    watchDuelBankBadge();

    /* 🔹 Avatar systém */
    initAvatarSystem();

    /* 🔹 Video systém */
    initVideoSystem();

    /* 🔹 Feedback systém */
    initFeedbackSystem();
  });
}

/* =====================================================
   💬 FEEDBACK SYSTÉM
   ===================================================== */
function initFeedbackSystem() {
  const textarea = document.getElementById('feedbackText');
  const charCount = document.getElementById('feedbackCharCount');
  const sendBtn = document.getElementById('sendFeedbackBtn');
  const form = document.getElementById('feedbackForm');
  const success = document.getElementById('feedbackSuccess');
  const againBtn = document.getElementById('feedbackAgainBtn');
  const typeBtns = document.querySelectorAll('.feedback-type-btn');

  if (!textarea) return;

  let selectedType = 'napad';

  // Výber typu
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.dataset.type;
    });
  });

  // Počítadlo znakov
  textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length} / 500`;
  });

  // Odoslanie
  sendBtn && sendBtn.addEventListener('click', async () => {
    const text = textarea.value.trim();
    if (!text) {
      textarea.focus();
      textarea.style.borderColor = 'var(--accent-3)';
      setTimeout(() => textarea.style.borderColor = '', 1500);
      return;
    }

    const db = window.db;
    const nick = localStorage.getItem('playerNick') || 'Anonymous';

    sendBtn.disabled = true;
    sendBtn.textContent = 'Odosielam...';

    try {
      if (db) {
        const { ref, push } = await import(
          "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"
        );
        await push(ref(db, 'feedback'), {
          nick,
          type: selectedType,
          text,
          createdAt: Date.now(),
          read: false
        });
      }

      // Zobraz úspech
      form.style.display = 'none';
      success.style.display = 'block';
      textarea.value = '';
      charCount.textContent = '0 / 500';

    } catch (e) {
      console.error('Feedback chyba:', e);
      sendBtn.textContent = 'Chyba – skús znova';
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Odoslať';
    }
  });

  // Ďalšia pripomienka
  againBtn && againBtn.addEventListener('click', () => {
    success.style.display = 'none';
    form.style.display = 'block';
    // Reset na prvý typ
    typeBtns.forEach(b => b.classList.remove('active'));
    typeBtns[0] && typeBtns[0].classList.add('active');
    selectedType = 'napad';
  });
}

/* =====================================================
   📺 VIDEO SYSTÉM
   ===================================================== */

// Konfigurácia videí — URL zmeň keď budeš mať skutočné videá
// Formát: YouTube embed URL alebo priamy MP4 link
const VIDEO_CONFIG = {
  v1: {
    title: 'Ako funguje LexArena?',
    url: 'https://www.youtube.com/embed/PHkX6DmuLic?autoplay=1&rel=0',
    duration: 30
  },
  v2: {
    title: 'Ako hrať duelový kvíz?',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0',
    duration: 30
  },
  v3: {
    title: 'Ako nahlasovať nezrovnalosti?',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0',
    duration: 30
  }
};

let videoRewardTimer = null;
let currentVideoId = null;

window.openVideo = function(videoId) {
  const cfg = VIDEO_CONFIG[videoId];
  if (!cfg) return;

  currentVideoId = videoId;

  const modal = document.getElementById('videoModal');
  const title = document.getElementById('videoModalTitle');
  const player = document.getElementById('videoPlayer');
  const claimBtn = document.getElementById('claimVideoRewardBtn');
  const alreadyClaimed = document.getElementById('videoAlreadyClaimed');

  if (!modal) return;

  title.textContent = cfg.title;
  player.src = cfg.url;

  // Skontroluj či odmena už bola vyzdvihnutá
  const claimed = localStorage.getItem(`video_claimed_${videoId}`);

  if (claimed) {
    claimBtn.style.display = 'none';
    alreadyClaimed.style.display = 'block';
  } else {
    claimBtn.style.display = 'none';
    alreadyClaimed.style.display = 'none';

    // Po uplynutí trvania videa sa odomkne tlačidlo odmeny
    if (videoRewardTimer) clearTimeout(videoRewardTimer);
    videoRewardTimer = setTimeout(() => {
      claimBtn.style.display = 'block';
      claimBtn.style.animation = 'duelBadgePop .4s ease';
    }, cfg.duration * 1000);
  }

  modal.style.display = 'flex';
};

function initVideoSystem() {
  // Zatvoriť modal
  const closeBtn = document.getElementById('closeVideoModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const modal = document.getElementById('videoModal');
      const player = document.getElementById('videoPlayer');
      if (modal) modal.style.display = 'none';
      if (player) player.src = ''; // zastaví video
      if (videoRewardTimer) clearTimeout(videoRewardTimer);
      currentVideoId = null;
    });
  }

  // Prevziať odmenu
  const claimBtn = document.getElementById('claimVideoRewardBtn');
  if (claimBtn) {
    claimBtn.addEventListener('click', async () => {
      if (!currentVideoId) return;

      // Ulož do localStorage (jednoduchá ochrana)
      localStorage.setItem(`video_claimed_${currentVideoId}`, Date.now());

      // Prideľ 12§ - priamo cez Firebase ako fallback
      try {
        if (typeof window.awardParagrafy === 'function') {
          await window.awardParagrafy(12, 'za pozretie videa 🎬');
        } else {
          // Fallback - priamy zápis do Firebase
          const nick = localStorage.getItem('playerNick');
          const db = window.db;
          if (db && nick) {
            const { ref, get, update } = await import(
              "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"
            );
            const snap = await get(ref(db, `users/${nick}/paragrafy`));
            const current = snap.exists() ? snap.val() : 0;
            await update(ref(db, `users/${nick}`), {
              paragrafy: current + 12,
              lastParUpdate: Date.now()
            });
            const el = document.getElementById('parCount') || document.getElementById('paragrafValue');
            if (el) el.textContent = current + 12;
          }
        }
        console.log('✅ +12§ za video pridelených');
      } catch(e) {
        console.error('❌ Chyba pri prideľovaní §:', e);
      }

      // Aktualizuj UI
      claimBtn.style.display = 'none';
      document.getElementById('videoAlreadyClaimed').style.display = 'block';

      // Označ video ako vyzdvihnuté v zozname
      const badge = document.getElementById(`reward-${currentVideoId}`);
      if (badge) badge.classList.add('claimed');

      // Zatvoriť modal po 2 sekundách
      setTimeout(() => {
        const modal = document.getElementById('videoModal');
        const player = document.getElementById('videoPlayer');
        if (modal) modal.style.display = 'none';
        if (player) player.src = '';
        currentVideoId = null;
      }, 2000);
    });
  }

  // Obnov stav claimedvideí z localStorage
  Object.keys(VIDEO_CONFIG).forEach(videoId => {
    if (localStorage.getItem(`video_claimed_${videoId}`)) {
      const badge = document.getElementById(`reward-${videoId}`);
      if (badge) badge.classList.add('claimed');
    }
  });
}



/* =====================================================
   ROLA SYSTÉM – admin panel, garant, role management
   ===================================================== */

async function initRoleSystem() {
  console.log('🔑 initRoleSystem štart');
  const db = window.db;
  const nick = localStorage.getItem('playerNick');
  console.log('🔑 db:', !!db, 'nick:', nick);
  if (!db || !nick) {
    console.warn('🔑 chýba db alebo nick');
    return;
  }

  try {
    const { ref, get, update } =
      await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");

    // Načítaj rolu z Firebase - skontroluj obe miesta
    const snapUsers = await get(ref(db, `users/${nick}/role`));
    const snapLeader = await get(ref(db, `leaderboard/${nick}/role`));
    console.log('🔑 users role:', snapUsers.val(), '| leaderboard role:', snapLeader.val());
    
    const role = snapUsers.exists()
      ? snapUsers.val()
      : snapLeader.exists()
      ? snapLeader.val()
      : 'student';
    
    console.log('🔑 Načítaná rola:', role);

    // Synchronizuj rolu do users/ ak tam nie je
    if (!snapUsers.exists() && role !== 'student') {
      await update(ref(db, `users/${nick}`), { role });
    }

  // Ulož Firebase rolu (skutočná rola) aj view rolu zvlášť
  localStorage.setItem('playerFirebaseRole', role);
  // Nastav view rolu len ak ešte nie je nastavená
  if (!localStorage.getItem('playerRole')) {
    localStorage.setItem('playerRole', role);
  }

  const viewRole = localStorage.getItem('playerRole') || role;

  // Aktualizuj badge
  initRoleBadge();

    // Zobraz admin panel podľa view roly
    if (viewRole === 'admin' || viewRole === 'garant') {
      renderAdminPanel(viewRole, db, ref, get, update, null);
    } else {
      const panel = document.getElementById('adminPanel');
      if (panel) panel.innerHTML = '<span class="small muted">Pre zobrazenie prepni rolu na garant.</span>';
    }
  } catch(e) {
    console.error('❌ initRoleSystem chyba:', e);
  }
}

function renderAdminPanel(role, db, ref, get, update, onValue) {
  const panel = document.getElementById('adminPanel');
  if (!panel) return;

  panel.innerHTML = `
    <div style="margin-bottom:12px">
      <div style="font-weight:600;margin-bottom:4px">
        ${role === 'admin' ? '👑 Admin panel' : '🔏 Garant panel'}
      </div>
      ${role === 'admin' ? `
        <div style="margin-bottom:10px">
          <input id="adminNickInput" class="form-input" type="text"
            placeholder="Nick hráča..." style="margin-bottom:6px"/>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="btn btn-primary" id="setGarantBtn">🔏 Nastaviť garanta</button>
            <button class="btn" id="setStudentBtn">👤 Odobrať garanta</button>
          </div>
          <div id="adminMsg" class="small" style="margin-top:6px;color:var(--muted)"></div>
        </div>
        <button class="btn" id="listUsersBtn" style="width:100%;margin-bottom:8px">
          👥 Zobraziť hráčov
        </button>
        <div id="usersList" style="display:none;max-height:200px;overflow-y:auto"></div>
      ` : ''}
      <div class="small muted" style="margin-top:8px">
        ${role === 'admin'
          ? 'Ako admin môžeš udeľovať rolu garanta hráčom.'
          : 'Ako garant môžeš pridávať garančnú pečať na otázky v kvíze.'}
      </div>
    </div>
  `;

  if (role === 'admin') {
    // Nastaviť garanta
    panel.querySelector('#setGarantBtn').onclick = async () => {
      const targetNick = panel.querySelector('#adminNickInput').value.trim();
      const msg = panel.querySelector('#adminMsg');
      if (!targetNick) { msg.textContent = 'Zadaj nick hráča.'; return; }
      await update(ref(db, `users/${targetNick}`), { role: 'garant' });
      msg.textContent = `✅ ${targetNick} je teraz garant.`;
      msg.style.color = 'var(--accent-3)';
    };

    // Odobrať garanta
    panel.querySelector('#setStudentBtn').onclick = async () => {
      const targetNick = panel.querySelector('#adminNickInput').value.trim();
      const msg = panel.querySelector('#adminMsg');
      if (!targetNick) { msg.textContent = 'Zadaj nick hráča.'; return; }
      await update(ref(db, `users/${targetNick}`), { role: 'student' });
      msg.textContent = `✅ ${targetNick} je teraz student.`;
      msg.style.color = 'var(--muted)';
    };

    // Zoznam hráčov
    panel.querySelector('#listUsersBtn').onclick = async () => {
      const listEl = panel.querySelector('#usersList');
      const isHidden = listEl.style.display === 'none';
      if (!isHidden) { listEl.style.display = 'none'; return; }

      listEl.innerHTML = '<div class="small muted">Načítavam...</div>';
      listEl.style.display = 'block';

      const snap = await get(ref(db, 'users'));
      const users = snap.val() || {};

      listEl.innerHTML = Object.entries(users).map(([n, u]) => `
        <div style="display:flex;justify-content:space-between;align-items:center;
          padding:6px 8px;border-bottom:1px solid var(--card-border);font-size:13px">
          <div>
            <strong>${n}</strong>
            <span class="small muted" style="margin-left:6px">${u.role || 'student'}</span>
          </div>
          <div style="display:flex;gap:4px">
            <button class="btn" style="font-size:11px;padding:3px 8px"
              onclick="(async()=>{
                const {ref,update}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');
                await update(ref(window.db,'users/${n}'),{role:'garant'});
                this.closest('div').querySelector('span').textContent='garant';
              })()">🔏 Garant</button>
            <button class="btn" style="font-size:11px;padding:3px 8px"
              onclick="(async()=>{
                const {ref,update}=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');
                await update(ref(window.db,'users/${n}'),{role:'student'});
                this.closest('div').querySelector('span').textContent='student';
              })()">👤 Student</button>
          </div>
        </div>
      `).join('');
    };
  }
}

/* =====================================================
   GARANČNÁ PEČAŤ NA OTÁZKACH
   ===================================================== */

// Zobraz tlačidlo "Pridať pečať" pre garanta počas kvízu
export function initGuarantorSeal() {
  const role = localStorage.getItem('playerRole');
  if (role !== 'garant' && role !== 'admin') return;

  // Sleduj zmeny otázky a pridaj tlačidlo
  const observer = new MutationObserver(() => {
    const qBox = document.querySelector('.question-box');
    if (!qBox || document.getElementById('sealBtn')) return;

    const sealBtn = document.createElement('button');
    sealBtn.id = 'sealBtn';
    sealBtn.className = 'btn';
    sealBtn.style.cssText = 'margin-top:10px;font-size:12px;';
    sealBtn.textContent = '🔏 Pridať garančnú pečať';
    sealBtn.onclick = addGuarantorSeal;
    qBox.appendChild(sealBtn);

    // Zobraz existujúcu pečať
    showExistingSeal(qBox);
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

async function addGuarantorSeal() {
  const nick = localStorage.getItem('playerNick');
  const area = document.getElementById('areaTitle')?.textContent?.trim();
  const qText = document.getElementById('qText')?.textContent?.trim();

  if (!nick || !area || !qText) return;

  const db = window.db;
  if (!db) return;

  const { ref, set } =
    await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");

  // Vytvor bezpečný kľúč z textu otázky
  const qKey = btoa(encodeURIComponent(qText.substring(0, 50))).replace(/[^a-zA-Z0-9]/g, '').substring(0, 30);

  await set(ref(db, `seals/questions/${area}/${qKey}`), {
    nick,
    timestamp: Date.now(),
    questionText: qText.substring(0, 100)
  });

  const btn = document.getElementById('sealBtn');
  if (btn) {
    btn.textContent = '✅ Pečať pridaná';
    btn.disabled = true;
    btn.style.color = 'var(--accent-3)';
  }

  // Zobraz pečať
  showSealBadge(nick);
}

async function showExistingSeal(container) {
  const area = document.getElementById('areaTitle')?.textContent?.trim();
  const qText = document.getElementById('qText')?.textContent?.trim();
  if (!area || !qText || !window.db) return;

  const { ref, get } =
    await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");

  const qKey = btoa(encodeURIComponent(qText.substring(0, 50))).replace(/[^a-zA-Z0-9]/g, '').substring(0, 30);
  const snap = await get(ref(window.db, `seals/questions/${area}/${qKey}`));

  if (snap.exists()) {
    showSealBadge(snap.val().nick);
  }
}

function showSealBadge(garantNick) {
  const qBox = document.querySelector('.question-box');
  if (!qBox || document.getElementById('sealBadgeOnQ')) return;

  const badge = document.createElement('div');
  badge.id = 'sealBadgeOnQ';
  badge.style.cssText = 'display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;border-radius:999px;padding:3px 10px;margin-top:8px;border:1px solid rgba(214,158,46,0.4);background:rgba(214,158,46,0.08);color:#b45309;';
  badge.innerHTML = `🔏 Overené garantom <strong>${garantNick}</strong>`;
  qBox.insertBefore(badge, qBox.firstChild);
}


/* =====================================================
   PEČATE HRÁČA V DLAŽDICI
   ===================================================== */
async function displayPlayerSeals() {
  const db = window.db;
  const nick = localStorage.getItem('playerNick');
  if (!db || !nick) return;

  try {
    const { ref, get } = await import(
      "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"
    );
    const snap = await get(ref(db, `users/${nick}`));
    if (!snap.exists()) return;

    const data = snap.val();
    const seals = data.seals || {};
    const approved = data.approvedReports || 0;

    const display = document.getElementById('sealDisplay');
    const badges = document.getElementById('sealBadges');
    if (!display || !badges) return;

    if (approved > 0) {
      display.style.display = 'block';
      badges.innerHTML = [
        seals.gold   ? `<span class="seal-badge gold">🥇 Zlatá ×${seals.gold}</span>` : '',
        seals.silver ? `<span class="seal-badge silver">🥈 Strieborná ×${seals.silver}</span>` : '',
        seals.bronze ? `<span class="seal-badge bronze">🥉 Bronzová ×${seals.bronze}</span>` : '',
        `<span class="small muted">Uznaných: ${approved}</span>`
      ].join('');
    }
  } catch(e) {}
}

/* =====================================================
   ROLA BADGE
   ===================================================== */
function initRoleBadge() {
  const badge = document.getElementById('roleBadge');
  const label = document.getElementById('roleLabel');
  if (!badge || !label) return;

  const firebaseRole = localStorage.getItem('playerFirebaseRole') || 'student';
  const currentView = localStorage.getItem('playerRole') || firebaseRole;

  label.textContent = currentView;
  badge.setAttribute('data-role', currentView);
  badge.style.cursor = 'pointer';
  badge.title = 'Klikni pre prepnutie roly';

  // Čítaj rolu v čase kliknutia (nie pri init - vtedy ešte Firebase nenačítaná)
  badge.onclick = () => {
    const fr = localStorage.getItem('playerFirebaseRole') || 'student';
    openRoleSwitcher(fr);
  };
}

function openRoleSwitcher(firebaseRole) {
  // Vždy vymaž starý modal a vytvor nový s aktuálnymi rolami
  const old = document.getElementById('roleSwitchModal');
  if (old) old.remove();
  let modal;

  // Dostupné roly podľa Firebase roly
  const available = firebaseRole === 'admin'
    ? ['admin', 'garant', 'student']
    : firebaseRole === 'garant'
    ? ['garant', 'student']
    : ['student'];

  const roleLabels = {
    admin: '👑 Admin',
    garant: '🔏 Garant',
    student: '👤 Študent'
  };

  modal = document.createElement('div');
  modal.id = 'roleSwitchModal';
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:9999;';

  modal.innerHTML = `
    <div style="background:var(--surface,#fff);border-radius:16px;padding:24px;min-width:280px;box-shadow:0 20px 60px rgba(0,0,0,0.2);">
      <h3 style="margin:0 0 16px 0">Prepnúť zobrazenie</h3>
      <div style="display:flex;flex-direction:column;gap:8px" id="roleOptions">
        ${available.map(r => `
          <button class="btn role-switch-btn ${localStorage.getItem('playerRole')===r?'btn-primary':''}"
            data-role="${r}" style="text-align:left;padding:10px 14px;font-size:14px">
            ${roleLabels[r]}
            ${localStorage.getItem('playerRole')===r ? ' ✓' : ''}
          </button>
        `).join('')}
      </div>
      <button class="btn" id="closeRoleSwitch" style="width:100%;margin-top:12px">Zavrieť</button>
    </div>`;

  document.body.appendChild(modal);

  modal.querySelector('#closeRoleSwitch').onclick = () => { modal.style.display = 'none'; };
  modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

  modal.querySelectorAll('.role-switch-btn').forEach(btn => {
    btn.onclick = () => {
      const newRole = btn.dataset.role;
      localStorage.setItem('playerRole', newRole);

      const label = document.getElementById('roleLabel');
      const badge = document.getElementById('roleBadge');
      if (label) label.textContent = newRole;
      if (badge) badge.setAttribute('data-role', newRole);

      modal.style.display = 'none';

      // Obnov admin panel
      const db = window.db;
      if (db) renderAdminPanel(newRole, db, null, null, null, null);
      initRoleSystem();
    };
  });
}

/* =====================================================
   MODAL PRÍSTUPOVÉHO KÓDU
   ===================================================== */
function openLoginCodeModal() {
  const modal = document.getElementById('loginCodeModal');
  const content = document.getElementById('loginModalContent');
  if (!modal || !content) return;

  const nick = localStorage.getItem('playerNick');
  const code = localStorage.getItem('lexarena_code');

  if (!nick) {
    content.innerHTML = `
      <p class="small" style="margin-bottom:16px">
        Zadaj najprv nick v hlavičke. Potom ti vygenerujeme tvoj prístupový kód.
      </p>`;
  } else if (!code) {
    // Vygeneruj nový kód
    const words = ['modrý','červený','zlatý','právny','rýchly','múdry','silný','tichý',
                   'zákon','súd','sova','mačka','kniha','duel','právo','hviezda',
                   'hora','rieka','vietor','oheň','ľad','more','les','obloha'];
    const pick = () => words[Math.floor(Math.random() * words.length)];
    const num = Math.floor(Math.random() * 900) + 100;
    const newCode = `${pick()}-${pick()}-${pick()}-${num}`;
    localStorage.setItem('lexarena_code', newCode);

    content.innerHTML = `
      <p class="small" style="margin-bottom:8px">
        Tvoj prístupový kód pre nick <strong>${nick}</strong>:
      </p>
      <div style="background:var(--surface);border:2px dashed var(--accent-3);border-radius:12px;
           padding:16px;text-align:center;font-size:20px;font-weight:700;letter-spacing:2px;
           color:var(--accent-3);margin-bottom:16px">
        ${newCode}
      </div>
      <p class="small muted" style="margin-bottom:16px">
        📋 Ulož si ho! Na inom zariadení zadaj tento kód a načíta sa tvoj účet.
      </p>
      <button class="btn btn-primary" onclick="navigator.clipboard.writeText('${newCode}').then(()=>alert('Kód skopírovaný!'))" style="width:100%">
        Kopírovať kód
      </button>`;
  } else {
    content.innerHTML = `
      <p class="small" style="margin-bottom:8px">
        Tvoj prístupový kód pre nick <strong>${nick}</strong>:
      </p>
      <div style="background:var(--surface);border:2px dashed var(--accent-3);border-radius:12px;
           padding:16px;text-align:center;font-size:20px;font-weight:700;letter-spacing:2px;
           color:var(--accent-3);margin-bottom:16px">
        ${code}
      </div>
      <p class="small muted" style="margin-bottom:12px">
        Na inom zariadení zadaj tento kód pre načítanie tvojho účtu.
      </p>
      <button class="btn btn-primary" onclick="navigator.clipboard.writeText('${code}').then(()=>alert('Kód skopírovaný!'))" style="width:100%;margin-bottom:8px">
        Kopírovať kód
      </button>
      <button class="btn" id="enterCodeBtn" style="width:100%">
        Zadať kód iného hráča
      </button>`;

    setTimeout(() => {
      const enterBtn = document.getElementById('enterCodeBtn');
      if (enterBtn) {
        enterBtn.onclick = () => {
          const input = prompt('Zadaj prístupový kód:');
          if (input && input.trim()) {
            const trimmed = input.trim();
            const storedCode = localStorage.getItem('lexarena_code');
            if (trimmed === storedCode) {
              alert('Toto je tvoj vlastný kód 😊');
            } else {
              localStorage.setItem('lexarena_code', trimmed);
              // Nick z kódu nie je uložený lokálne, hráč ho musí zadať
              alert('Kód uložený. Zadaj aj svoj nick a stránka sa prepne na tvoj účet.');
              window.location.reload();
            }
          }
        };
      }
    }, 100);
  }

  modal.style.display = 'flex';
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

  /* 🔥 Rola badge */
  initRoleBadge();

  /* 🔥 Nahlasovanie + Súdna sieň */
  const reportBtn = document.getElementById('reportIssueBtn');
  if (reportBtn) reportBtn.addEventListener('click', () => {
    if (typeof window.openReportModal === 'function') window.openReportModal();
  });
  const courtroomBtn = document.getElementById('openCourtroomBtn');
  if (courtroomBtn) courtroomBtn.addEventListener('click', () => {
    if (typeof window.openCourtroomModal === 'function') window.openCourtroomModal();
  });

  /* 🔥 Zobraz pečate hráča */
  displayPlayerSeals();

  /* 🔥 Modal prístupového kódu */
  const loginDeviceBtn = $('loginDeviceBtn');
  if (loginDeviceBtn) {
    loginDeviceBtn.addEventListener('click', openLoginCodeModal);
  }
  const closeLoginModal = $('closeLoginModal');
  if (closeLoginModal) {
    closeLoginModal.addEventListener('click', () => {
      const m = $('loginCodeModal');
      if (m) m.style.display = 'none';
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
