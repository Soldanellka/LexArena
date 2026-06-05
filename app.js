'use strict';

import { $ } from './core.js';
import { renderAdminPanel } from './admin.js';

/* =========================
   Render oblastí (dlaždice)
   ========================= */
function renderFaculties(){
  const list = $('facultyList');
  if(!list || typeof catalog === 'undefined') return;

  list.innerHTML = '';

  Object.keys(catalog).forEach(key => {
    const item = catalog[key]; // priamo objekt oblasti

    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = key;

    // 🔥 Klik = okamžité otvorenie appky
    btn.onclick = () => {
      if (item?.openExternal) {
        console.log('Otváram externú appku:', item.openExternal);
        window.location.href = item.openExternal;
        return;
      }

      // fallback – interné kvízy (ak by si niekedy chcela)
      if (Array.isArray(item?.questions) && item.questions.length > 0) {
        const startBtn = $('startQuizBtn');
        if(startBtn){
          startBtn.disabled = false;
          startBtn.textContent = 'Spustiť kvíz (5 paragrafov)';
          startBtn.onclick = () => startQuiz();
        }
      }
    };

    list.appendChild(btn);
  });
}

/* =========================
   Exporty
   ========================= */
export { renderFaculties };
/* ===============================
   Nick hráča – uloženie a načítanie
   =============================== */

// Uloženie nicku po kliknutí
const saveNickBtn = document.getElementById("saveNick");
if (saveNickBtn) {
  saveNickBtn.addEventListener("click", () => {
    const nick = document.getElementById("nickname").value.trim();

    if (nick.length < 2) {
      alert("Nick musí mať aspoň 2 znaky");
      return;
    }

    localStorage.setItem("playerNick", nick);
    alert("Nick uložený!");

    const nickDisplay = document.getElementById("playerNickDisplay");
    if (nickDisplay) nickDisplay.textContent = nick;
  });
}

// Načítanie nicku pri štarte
const savedNick = localStorage.getItem("playerNick");
if (savedNick) {
  const nickInput = document.getElementById("nickname");
  if (nickInput) nickInput.value = savedNick;

  const nickDisplay = document.getElementById("playerNickDisplay");
  if (nickDisplay) nickDisplay.textContent = savedNick;
}
// --- START: Incoming challenges test helper ---
(function(){
  const listEl = document.getElementById('incomingChallengeList');
  const acceptAnyBtn = document.getElementById('acceptAnyChallenge');
  const ignoreAllBtn = document.getElementById('ignoreAllChallenges');

  function createChallengeItem(id, text) {
    const wrap = document.createElement('div');
    wrap.className = 'challenge-item';
    wrap.dataset.challengeId = id;
    wrap.style = 'padding:8px;border-radius:6px;background:var(--card-bg, #fff);box-shadow:var(--card-shadow, 0 1px 0 rgba(0,0,0,0.04));';

    const txt = document.createElement('div');
    txt.className = 'challenge-text';
    txt.textContent = text;
    wrap.appendChild(txt);

    const actions = document.createElement('div');
    actions.style = 'display:flex;gap:8px;margin-top:8px';
    const accept = document.createElement('button');
    accept.className = 'btn btn-primary accept-challenge';
    accept.type = 'button';
    accept.textContent = 'Prijať';
    accept.dataset.challengeId = id;

    const ignore = document.createElement('button');
    ignore.className = 'btn btn-ghost ignore-challenge';
    ignore.type = 'button';
    ignore.textContent = 'Ignorovať';
    ignore.dataset.challengeId = id;

    actions.appendChild(accept);
    actions.appendChild(ignore);
    wrap.appendChild(actions);

    // handlers
    accept.addEventListener('click', () => {
      // demo: spusti duel UI ak existuje
      if (typeof window.startDuelFromExternal === 'function') {
        window.startDuelFromExternal();
      } else {
        console.info('startDuelFromExternal not defined — accept simulated for', id);
      }
      // odstrániť položku z listu
      wrap.remove();
      maybeHideIncomingCard();
    });

    ignore.addEventListener('click', () => {
      wrap.remove();
      maybeHideIncomingCard();
    });

    return wrap;
  }

  function maybeHideIncomingCard() {
    const card = document.getElementById('incomingChallengeCard');
    if (!card) return;
    const has = listEl && listEl.children.length > 0;
    card.style.display = has ? 'block' : 'none';
  }

  // public helpers
  window.__addDemoChallenge = function(text) {
    if (!listEl) return;
    const id = 'demo-' + Date.now();
    const item = createChallengeItem(id, text || 'Demo výzva: Skúšobný duel');
    listEl.appendChild(item);
    // ensure card visible
    const card = document.getElementById('incomingChallengeCard');
    if (card) card.style.display = 'block';
  };

  if (acceptAnyBtn) {
    acceptAnyBtn.addEventListener('click', () => {
      const first = listEl && listEl.querySelector('.challenge-item');
      if (!first) return console.info('Žiadne výzvy na prijatie');
      const id = first.dataset.challengeId;
      // trigger accept button
      const btn = first.querySelector('.accept-challenge');
      if (btn) btn.click();
    });
  }

  if (ignoreAllBtn) {
    ignoreAllBtn.addEventListener('click', () => {
      if (!listEl) return;
      listEl.innerHTML = '';
      maybeHideIncomingCard();
    });
  }

  // auto-insert one demo item on load for quick visual test
  document.addEventListener('DOMContentLoaded', () => {
    if (listEl && listEl.children.length === 0) {
      window.__addDemoChallenge('Jana ťa vyzvala na duel – Pracovné právo');
    }
  });
})();
// --- END ---
// --- START: Safe accept handler for incoming challenges ---
(function(){
  const listEl = document.getElementById('incomingChallengeList');
  const cardEl = document.getElementById('incomingChallengeCard');

  function updateCardVisibility() {
    if (!cardEl) return;
    const has = listEl && listEl.children.length > 0;
    cardEl.style.display = has ? 'block' : 'none';
  }

  function isDuelVisible() {
    const duelEl = document.getElementById('lexarenaDuelUI');
    if (!duelEl) return false;
    // check class 'hidden' or computed display
    const hasHiddenClass = duelEl.classList && duelEl.classList.contains('hidden');
    const disp = getComputedStyle(duelEl).display;
    return !hasHiddenClass && disp !== 'none';
  }

  // show small inline loader on the challenge item while starting duel
  function showItemLoader(item) {
    if (!item) return;
    let loader = item.querySelector('.challenge-loader');
    if (!loader) {
      loader = document.createElement('span');
      loader.className = 'challenge-loader';
      loader.textContent = ' Spúšťam duel…';
      loader.style = 'font-size:13px;color:var(--muted,#666);margin-left:8px';
      item.querySelector('.challenge-text')?.appendChild(loader);
    }
    return loader;
  }

  // delegated click handler for accept buttons
  document.addEventListener('click', function onDocClick(e){
    const btn = e.target.closest && e.target.closest('.accept-challenge');
    if (!btn) return;
    e.preventDefault();

    const item = btn.closest('.challenge-item');
    if (!item) return;

    // show loader so user sees action
    const loader = showItemLoader(item);

    // Try to call startDuelFromExternal if available
    const startFn = window.startDuelFromExternal;
    if (typeof startFn === 'function') {
      try {
        startFn();
      } catch(err) {
        console.error('startDuelFromExternal threw', err);
      }
      // poll for duel UI visibility, then remove item
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (isDuelVisible() || attempts > 12) { // ~2.4s timeout
          clearInterval(poll);
          item.remove();
          updateCardVisibility();
        }
      }, 200);
      return;
    }

    // Fallback: open duel.html in new tab and remove item after short delay
    const duelUrl = '/duel.html';
    try {
      window.open(duelUrl, '_blank');
    } catch (err) {
      // if popup blocked, navigate current tab
      window.location.href = duelUrl;
    }
    setTimeout(() => {
      item.remove();
      updateCardVisibility();
    }, 700);
  });

  // delegated click handler for ignore buttons
  document.addEventListener('click', function onDocClickIgnore(e){
    const btn = e.target.closest && e.target.closest('.ignore-challenge');
    if (!btn) return;
    e.preventDefault();
    const item = btn.closest('.challenge-item');
    if (item) item.remove();
    updateCardVisibility();
  });

  // Accept first / Ignore all controls (if present)
  const acceptAny = document.getElementById('acceptAnyChallenge');
  if (acceptAny) acceptAny.addEventListener('click', () => {
    const firstAccept = listEl && listEl.querySelector('.challenge-item .accept-challenge');
    if (firstAccept) firstAccept.click();
  });

  const ignoreAll = document.getElementById('ignoreAllChallenges');
  if (ignoreAll) ignoreAll.addEventListener('click', () => {
    if (listEl) listEl.innerHTML = '';
    updateCardVisibility();
  });

  // ensure card visibility on load
  document.addEventListener('DOMContentLoaded', updateCardVisibility);
  // also expose helper for debugging
  window.__isDuelVisible = isDuelVisible;
})();
// --- END: Safe accept handler for incoming challenges ---

