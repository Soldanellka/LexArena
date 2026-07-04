'use strict';

import { $, loadParagrafy, escapeHtml } from './core.js';
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

    /* 🔹 Výzva na duel cez zdieľateľný link (?duel=ID) */
    checkDuelChallengeLink();

    /* 🔹 Avatar systém */
    initAvatarSystem();

    /* 🔹 Video systém */
    initVideoSystem();

    /* 🔹 Feedback systém */
    initFeedbackSystem();
    renderPublishedFeedback();
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
      if (!db) throw new Error('Firebase nie je pripojená');
      const { ref, push } = await import(
        "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"
      );
      await push(ref(db, 'feedback'), {
        nick,
        type: selectedType,
        text,
        createdAt: Date.now(),
        status: 'pending',
        read: false
      });
      console.log('✅ Feedback odoslaný do Firebase');

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
    title: 'Ako hrať duelový kvíz v LexArene?',
    url: 'https://www.youtube.com/embed/OjzYMtixyJ8?autoplay=1&rel=0',
    duration: 30
  },
  v3: {
    title: 'Ako nahlásiť právnu nezrovnalosť v LexArene',
    url: 'https://www.youtube.com/embed/AiutHAdqF4E?autoplay=1&rel=0',
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
    alreadyClaimed.style.display = 'none';
    // Tlačidlo sa zobrazí po 5 sekundách (overenie že video spustil)
    claimBtn.style.display = 'none';
    if (videoRewardTimer) clearTimeout(videoRewardTimer);
    videoRewardTimer = setTimeout(() => {
      claimBtn.style.display = 'block';
      claimBtn.style.animation = 'duelBadgePop .4s ease';
    }, 5000);
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
   ADMIN FEEDBACK MANAGEMENT
   ===================================================== */
async function loadAdminFeedback(listEl) {
  listEl.innerHTML = '<div class="small muted" style="padding:8px">Načítavam...</div>';

  const db = window.db;
  if (!db) {
    listEl.innerHTML = '<div class="small muted" style="padding:8px">❌ Firebase nie je pripojená.</div>';
    return;
  }
  const { ref, get, update } = await import(
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"
  );

  const snap = await get(ref(db, 'feedback'));
  const data = snap.val() || {};
  const items = Object.entries(data)
    .sort(([,a],[,b]) => b.createdAt - a.createdAt);

  if (!items.length) {
    listEl.innerHTML = '<div class="small muted" style="padding:8px">Žiadne príspevky.</div>';
    return;
  }

  const typeEmoji = { napad: '💡', chyba: '🐛', pochvala: '⭐' };
  const fmtDate = ts => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.getDate()+'.'+(d.getMonth()+1)+'. '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');
  };
  const statusLabel = { pending: '⏳ Čaká', published: '✅ Zverejnené', hidden: '🚫 Skryté' };

  listEl.innerHTML = items.map(([id, f]) => `
    <div class="admin-feedback-item" data-id="${id}" style="
      padding:10px 12px;border-bottom:1px solid var(--card-border);font-size:13px;
      background:${f.status==='published'?'rgba(34,197,94,0.04)':f.status==='hidden'?'rgba(239,68,68,0.04)':'inherit'}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span>${typeEmoji[f.type]||'📝'} <strong>${f.nick}</strong></span>
        <div style="display:flex;gap:4px;align-items:center">
          <span class="small" style="color:var(--muted)">${statusLabel[f.status||'pending']}</span>
          <span class="small muted">${fmtDate(f.createdAt)}</span>
        </div>
      </div>
      <div style="margin-bottom:8px">${f.text}</div>
      ${f.adminReply ? `
        <div style="background:rgba(240,138,166,0.08);border-left:3px solid var(--accent-3);
          padding:6px 10px;border-radius:0 8px 8px 0;margin-bottom:8px;font-size:12px">
          💬 <strong>Admin:</strong> ${f.adminReply.text}
          <span class="small muted" style="margin-left:6px">${fmtDate(f.adminReply.createdAt)}</span>
        </div>` : ''}
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${f.status !== 'published' ? `<button class="btn fb-publish" data-id="${id}" style="font-size:11px;padding:3px 8px">✅ Zverejniť</button>` : ''}
        ${f.status !== 'hidden' ? `<button class="btn fb-hide" data-id="${id}" style="font-size:11px;padding:3px 8px">🚫 Skryť</button>` : ''}
        <button class="btn fb-reply" data-id="${id}" style="font-size:11px;padding:3px 8px">💬 Odpovedať</button>
      </div>
      <div class="fb-reply-form" data-id="${id}" style="display:none;margin-top:8px">
        <textarea class="feedback-textarea fb-reply-text" rows="2"
          placeholder="Napíš odpoveď..." maxlength="500"
          style="font-size:12px">${f.adminReply?.text||''}</textarea>
        <button class="btn btn-primary fb-reply-send" data-id="${id}"
          style="font-size:11px;padding:4px 10px;margin-top:4px">Odoslať odpoveď</button>
      </div>
    </div>
  `).join('');

  // Event listenery
  listEl.querySelectorAll('.fb-publish').forEach(btn => {
    btn.onclick = async () => {
      await update(ref(db, `feedback/${btn.dataset.id}`), { status: 'published' });
      await loadAdminFeedback(listEl);
      renderPublishedFeedback();
    };
  });

  listEl.querySelectorAll('.fb-hide').forEach(btn => {
    btn.onclick = async () => {
      await update(ref(db, `feedback/${btn.dataset.id}`), { status: 'hidden' });
      await loadAdminFeedback(listEl);
      renderPublishedFeedback();
    };
  });

  listEl.querySelectorAll('.fb-reply').forEach(btn => {
    btn.onclick = () => {
      const form = listEl.querySelector(`.fb-reply-form[data-id="${btn.dataset.id}"]`);
      if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
    };
  });

  listEl.querySelectorAll('.fb-reply-send').forEach(btn => {
    btn.onclick = async () => {
      const form = listEl.querySelector(`.fb-reply-form[data-id="${btn.dataset.id}"]`);
      const text = form?.querySelector('.fb-reply-text')?.value?.trim();
      if (!text) return;
      await update(ref(db, `feedback/${btn.dataset.id}`), {
        adminReply: { text, createdAt: Date.now() }
      });
      await loadAdminFeedback(listEl);
      renderPublishedFeedback();
    };
  });
}

/* =====================================================
   VEREJNÁ NÁSTENKA – zverejnené príspevky
   ===================================================== */
async function renderPublishedFeedback() {
  const box = document.getElementById('publishedFeedbackBox');
  if (!box) return;

  const db = window.db;
  if (!db) return;

  const { ref, get } = await import(
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"
  );

  const snap = await get(ref(db, 'feedback'));
  const data = snap.val() || {};
  const published = Object.values(data)
    .filter(f => f.status === 'published')
    .sort((a, b) => b.createdAt - a.createdAt);

  if (!published.length) {
    box.innerHTML = '<div class="small muted">Zatiaľ žiadne zverejnené príspevky.</div>';
    return;
  }

  const typeEmoji = { napad: '💡', chyba: '🐛', pochvala: '⭐' };
  const fmtDate = ts => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.getDate()+'.'+(d.getMonth()+1)+'.';
  };

  box.innerHTML = published.slice(0, 10).map(f => `
    <div style="padding:10px 0;border-bottom:1px solid var(--card-border)">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
        <span class="small">${typeEmoji[f.type]||'📝'} <strong>${f.nick}</strong></span>
        <span class="small muted">${fmtDate(f.createdAt)}</span>
      </div>
      <div style="font-size:13px;margin-bottom:${f.adminReply?'6px':'0'}">${f.text}</div>
      ${f.adminReply ? `
        <div style="background:rgba(240,138,166,0.08);border-left:3px solid var(--accent-3);
          padding:5px 8px;border-radius:0 6px 6px 0;font-size:12px">
          💬 <em>${f.adminReply.text}</em>
        </div>` : ''}
    </div>
  `).join('');
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
        <button class="btn" id="listUsersBtn" style="width:100%;margin-bottom:6px">
          👥 Zobraziť hráčov
        </button>
        <div id="usersList" style="display:none;max-height:200px;overflow-y:auto;margin-bottom:8px"></div>
        <button class="btn" id="listFeedbackBtn" style="width:100%;margin-bottom:6px">
          💬 Zobraziť pripomienky
        </button>
        <div id="feedbackList" style="display:none;max-height:250px;overflow-y:auto"></div>
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

    // Zoznam pripomienok s admin akciami
    panel.querySelector('#listFeedbackBtn').onclick = async () => {
      const listEl = panel.querySelector('#feedbackList');
      const isHidden = listEl.style.display === 'none';
      if (!isHidden) { listEl.style.display = 'none'; return; }
      listEl.style.display = 'block';
      await loadAdminFeedback(listEl);
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
   VÝZVA NA DUEL CEZ ZDIEĽATEĽNÝ LINK (?duel=ID)
   ===================================================== */
async function checkDuelChallengeLink() {
  const params = new URLSearchParams(window.location.search);
  const duelId = params.get('duel');
  if (!duelId) return;

  const db = window.db;
  if (!db) return;

  try {
    const { ref, get } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");
    const snap = await get(ref(db, `duels/${duelId}`));
    const duel = snap.exists() ? snap.val() : null;

    if (!duel || duel.status !== 'pending') {
      showDuelChallengeModal(null, duelId);
      return;
    }
    showDuelChallengeModal(duel, duelId);
  } catch (e) {
    console.error('❌ checkDuelChallengeLink chyba:', e);
    showDuelChallengeModal(null, duelId);
  }
}

function closeDuelChallengeModal() {
  const modal = document.getElementById('duelChallengeModal');
  if (modal) modal.remove();

  // Odstráň ?duel= z URL bez znovunačítania stránky
  const url = new URL(window.location.href);
  url.searchParams.delete('duel');
  window.history.replaceState({}, '', url);
}

function showDuelChallengeModal(duel, duelId) {
  const old = document.getElementById('duelChallengeModal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'duelChallengeModal';
  modal.className = 'duel-challenge-modal-overlay';

  if (!duel) {
    modal.innerHTML = `
      <div class="duel-challenge-modal">
        <div class="duel-challenge-title">⚔️ Výzva na duel</div>
        <p class="small" style="margin:12px 0">Táto výzva už nie je aktívna.</p>
        <button class="btn btn-primary" id="closeDuelChallengeModal" style="width:100%">Zavrieť</button>
      </div>`;
    document.body.appendChild(modal);
    document.getElementById('closeDuelChallengeModal').onclick = closeDuelChallengeModal;
    modal.onclick = e => { if (e.target === modal) closeDuelChallengeModal(); };
    return;
  }

  const existingNick = localStorage.getItem('playerNick') || '';

  modal.innerHTML = `
    <div class="duel-challenge-modal">
      <div class="duel-challenge-title">⚔️ ${escapeHtml(duel.from)} ťa vyzýva na duel z oblasti ${escapeHtml(duel.areaTitle)}!</div>
      <input type="text" id="duelChallengeNick" class="form-input" placeholder="Zadaj svoj nick..." value="${escapeHtml(existingNick)}" style="margin:14px 0" />
      <div id="duelChallengeMsg" class="small" style="min-height:16px;margin-bottom:8px"></div>
      <button class="btn btn-primary" id="acceptChallengeBtn" style="width:100%">Prijať výzvu</button>
    </div>`;

  document.body.appendChild(modal);
  modal.onclick = e => { if (e.target === modal) closeDuelChallengeModal(); };

  document.getElementById('acceptChallengeBtn').onclick = async () => {
    const input = document.getElementById('duelChallengeNick');
    const msg = document.getElementById('duelChallengeMsg');
    const nick = input.value.trim();
    if (nick.length < 2) {
      msg.textContent = 'Zadaj nick (aspoň 2 znaky).';
      msg.style.color = 'var(--accent-3)';
      return;
    }
    await acceptDuelChallenge(duel, duelId, nick, msg);
  };
}

async function acceptDuelChallenge(duel, duelId, nick, msgEl) {
  const db = window.db;
  if (!db) return;

  const { ref, get, update } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");

  // Over, že výzva ešte nebola medzičasom prijatá niekým iným
  const freshSnap = await get(ref(db, `duels/${duelId}`));
  const freshDuel = freshSnap.exists() ? freshSnap.val() : null;
  if (!freshDuel || freshDuel.status !== 'pending') {
    if (msgEl) { msgEl.textContent = 'Táto výzva už nie je aktívna.'; msgEl.style.color = 'var(--accent-3)'; }
    return;
  }

  // Nový hráč = nick ešte neexistuje v users/
  const userSnap = await get(ref(db, `users/${nick}`));
  const isNewPlayer = !userSnap.exists();

  // Bežný flow registrácie nicku (rovnaký ako pri manuálnom zadaní v hlavičke)
  localStorage.setItem('playerNick', nick);
  const nickDisplay = document.getElementById('playerNickDisplay');
  if (nickDisplay) nickDisplay.textContent = nick;
  const nickInput = document.getElementById('nickname');
  if (nickInput) nickInput.value = nick;

  window.currentUser = nick;
  window.currentDuelId = duelId;
  window.currentDuelMeta = freshDuel;
  window.currentDuel = freshDuel;
  window.duelQuestions = freshDuel.questions;
  window.currentOpponent = freshDuel.from;
  window.__pendingChallengeReward = { duelId, nick, isNewPlayer };

  await update(ref(db, `duels/${duelId}`), { status: 'accepted', acceptedBy: nick });

  if (typeof window.startDuelQuiz === 'function') {
    window.startDuelQuiz(freshDuel.questions);
  } else {
    console.error('❌ startDuelQuiz() neexistuje!');
  }

  closeDuelChallengeModal();
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

  /* 🔥 Kartičky Memory */
  const openMemoryBtn = $('openMemoryBtn');
  if (openMemoryBtn) {
    openMemoryBtn.addEventListener('click', () => {
      const modal = $('memoryModal');
      if (modal) { modal.style.display = 'flex'; modal.classList.add('open'); }

      const areaTiles = window.__areaTilesForGames;
      const areaQs = window.__areaQuestionsForGames;
      if (areaTiles && areaTiles.length && typeof window.buildMemoryFromTiles === 'function') {
        // 🃏 Dlaždice z JSON (pojem ↔ definícia)
        window.buildMemoryFromTiles(areaTiles);
      } else if (areaQs && areaQs.length && typeof window.buildMemoryFromQuestions === 'function') {
        // Fallback: otázka ↔ správna odpoveď
        window.buildMemoryFromQuestions(areaQs);
      } else if (typeof window.buildMemory === 'function') {
        window.buildMemory('TPH-A1');
      }
    });
  }

  const restartMemoryBtn = $('restartMemory');
  if (restartMemoryBtn) {
    restartMemoryBtn.addEventListener('click', () => {
      const areaTiles = window.__areaTilesForGames;
      const areaQs = window.__areaQuestionsForGames;
      if (areaTiles && areaTiles.length && typeof window.buildMemoryFromTiles === 'function') {
        window.buildMemoryFromTiles(areaTiles);
      } else if (areaQs && areaQs.length && typeof window.buildMemoryFromQuestions === 'function') {
        window.buildMemoryFromQuestions(areaQs);
      } else if (typeof window.buildMemory === 'function') {
        window.buildMemory('TPH-A1');
      }
    });
  }

  const closeMemoryBtn = $('closeMemory');
  if (closeMemoryBtn) {
    closeMemoryBtn.addEventListener('click', () => {
      const modal = $('memoryModal');
      if (modal) { modal.style.display = 'none'; modal.classList.remove('open'); }
    });
  }

  /* 🔥 Prípady z praxe */
  const openCasesBtn = $('openCasesBtn');
  if (openCasesBtn) {
    openCasesBtn.addEventListener('click', () => {
      const modal = $('casesModal');
      if (modal) { modal.style.display = 'flex'; modal.classList.add('open'); }

      const areaCases = window.__areaCasesForGames;
      const areaQs = window.__areaQuestionsForGames;
      const areaName = window.__selectedAreaName || '';
      if (areaCases && areaCases.length && typeof window.loadCasesFromJson === 'function') {
        // 📋 Skutočné prípady z JSON (viackrokové)
        window.loadCasesFromJson(areaCases, areaName);
      } else if (areaQs && areaQs.length && typeof window.loadCasesFromQuestions === 'function') {
        // Fallback: otázky ako jednoduché prípady
        window.loadCasesFromQuestions(areaQs, areaName);
      }
    });
  }

  const closeCasesBtn = $('closeCases');
  if (closeCasesBtn) {
    closeCasesBtn.addEventListener('click', () => {
      const modal = $('casesModal');
      if (modal) { modal.style.display = 'none'; modal.classList.remove('open'); }
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
