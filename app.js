'use strict';

import { $ } from './core.js';
import { renderAdminPanel } from './admin.js';

/* =====================================================
   RENDER ŠTUDIJNÝCH MODULOV (externé appky z catalog)
   ===================================================== */
function renderModules() {
  const list = $('modulesList');
  if (!list || typeof catalog === 'undefined') return;

  list.innerHTML = '';

  Object.keys(catalog).forEach(name => {
    const item = catalog[name];

    // renderujeme len moduly, ktoré majú externú appku
    if (!item.openExternal) return;

    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = name;

    btn.onclick = () => {
      console.log("Otváram externú appku:", item.openExternal);

      // 🔥 DÔLEŽITÉ: používame rovnaký mechanizmus ako v živej verzii
      if (typeof catalog.openExternal === 'function') {
        catalog.openExternal(item.openExternal);
      } else {
        // fallback ak by funkcia neexistovala
        window.location.href = item.openExternal;
      }
    };

    list.appendChild(btn);
  });
}

/* =====================================================
   RENDER OBLASTÍ NA DUEL (interné balíky z areas)
   ===================================================== */
function renderAreas() {
  const list = $('areasList');
  if (!list || typeof areas === 'undefined') return;

  list.innerHTML = '';

  Object.keys(areas).forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = name;

    btn.onclick = () => {
      const startBtn = $('startQuizBtn');
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Spustiť kvíz (5 paragrafov)';
        startBtn.onclick = () => startQuiz(name);
      }
    };

    list.appendChild(btn);
  });
}

/* =====================================================
   EXPORTY
   ===================================================== */
export { renderAreas, renderModules };

/* =====================================================
   NICK HRÁČA – uloženie a načítanie
   ===================================================== */

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

const savedNick = localStorage.getItem("playerNick");
if (savedNick) {
  const nickInput = document.getElementById("nickname");
  if (nickInput) nickInput.value = savedNick;

  const nickDisplay = document.getElementById("playerNickDisplay");
  if (nickDisplay) nickDisplay.textContent = savedNick;
}

/* =====================================================
   VÝZVY OD SPOLUHRÁČOV (bez zmeny)
   ===================================================== */

(function(){
  const listEl = document.getElementById('incomingChallengeList');
  const acceptAnyBtn = document.getElementById('acceptAnyChallenge');
  const ignoreAllBtn = document.getElementById('ignoreAllChallenges');

  function createChallengeItem(id, text) {
    const wrap = document.createElement('div');
    wrap.className = 'challenge-item';
    wrap.dataset.challengeId = id;
    wrap.style = 'padding:8px;border-radius:6px;background:var(--card-bg,#fff);box-shadow:var(--card-shadow,0 1px 0 rgba(0,0,0,0.04));';

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

    accept.addEventListener('click', () => {
      if (typeof window.startDuelFromExternal === 'function') {
        window.startDuelFromExternal();
      }
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

  window.__addDemoChallenge = function(text) {
    if (!listEl) return;
    const id = 'demo-' + Date.now();
    const item = createChallengeItem(id, text || 'Demo výzva: Skúšobný duel');
    listEl.appendChild(item);
    const card = document.getElementById('incomingChallengeCard');
    if (card) card.style.display = 'block';
  };

  if (acceptAnyBtn) {
    acceptAnyBtn.addEventListener('click', () => {
      const first = listEl && listEl.querySelector('.challenge-item');
      if (!first) return;
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

  document.addEventListener('DOMContentLoaded', () => {
    if (listEl && listEl.children.length === 0) {
      window.__addDemoChallenge('Jana ťa vyzvala na duel – Pracovné právo');
    }
  });
})();

/* =====================================================
   SAFE ACCEPT HANDLER (bez zmeny)
   ===================================================== */

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
    const hasHiddenClass = duelEl.classList && duelEl.classList.contains('hidden');
    const disp = getComputedStyle(duelEl).display;
    return !hasHiddenClass && disp !== 'none';
  }

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

  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('.accept-challenge');
    if (!btn) return;
    e.preventDefault();

    const item = btn.closest('.challenge-item');
    if (!item) return;

    showItemLoader(item);

    const startFn = window.startDuelFromExternal;
    if (typeof startFn === 'function') {
      try { startFn(); } catch(err) {}
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (isDuelVisible() || attempts > 12) {
          clearInterval(poll);
          item.remove();
          updateCardVisibility();
        }
      }, 200);
      return;
    }

    window.open('/duel.html', '_blank');
    setTimeout(() => {
      item.remove();
      updateCardVisibility();
    }, 700);
  });

  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('.ignore-challenge');
    if (!btn) return;
    e.preventDefault();
    const item = btn.closest('.challenge-item');
    if (item) item.remove();
    updateCardVisibility();
  });

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

  document.addEventListener('DOMContentLoaded', updateCardVisibility);
})();
