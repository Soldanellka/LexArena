'use strict';

import { $ } from './core.js';
import { renderAdminPanel } from './admin.js';
import { startDuel, pickOkruhPair } from './scripts/duels.js';

/* =====================================================
   RENDER ŠTUDIJNÝCH MODULOV (externé appky z catalog)
   ===================================================== */
function renderModules() {
  const list = $('modulesList');
  if (!list || typeof window.catalog === 'undefined') return;

  list.innerHTML = '';

  Object.keys(window.catalog).forEach(name => {
    const item = window.catalog[name];
    if (!item || !item.openExternal) return;

    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = name;

    btn.onclick = () => {
      console.log("Otváram externú appku:", item.openExternal);

      // Ak existuje funkcia openExternal, použijeme ju
      if (typeof window.catalog.openExternal === 'function') {
        window.catalog.openExternal(item.openExternal);
      } else {
        // fallback – otvorenie URL
        window.location.href = item.openExternal;
      }
    };

    list.appendChild(btn);
  });
}

/* =====================================================
   RENDER OBLASTÍ NA DUEL (interné balíky z areas)
   ===================================================== */

/* Posledný zvolený režim výberu dvojice okruhov – prežíva prepnutie
   oblasti (pohodlnejšie pre študenta), default je 🎲 náhodne. */
let currentOkruhMode = 'random';

const OKRUH_MODES = [
  { key: 'random', label: '🎲 Náhodne' },
  { key: 'studied', label: '📗 Preštudované' },
  { key: 'unstudied', label: '📕 Nepreštudované' }
];

function renderAreas() {
  const list = $('areasList');
  if (!list || typeof window.areas === 'undefined') return;

  list.innerHTML = '';

  Object.keys(window.areas).forEach(name => {
    const btn = document.createElement('button');
    btn.className = 'chip area-chip';
    btn.textContent = name;
    btn.dataset.area = name;

    btn.onclick = () => {
      // Zruš zvýraznenie všetkých
      list.querySelectorAll('.area-chip').forEach(b => {
        b.classList.remove('chip-active');
      });

      // Zvýrazni vybraný
      btn.classList.add('chip-active');

      const quizTitle = $('quizTitle');
      const areaTitle = $('areaTitle');

      if (quizTitle) quizTitle.textContent = 'Vyber oblasť pojednávania, hry a prípady';
      if (areaTitle) areaTitle.textContent = name;

      window.__selectedAreaName = name;
      renderOkruhModePicker(name);
      applyOkruhPairSelection(name, currentOkruhMode);
    };

    list.appendChild(btn);
  });
}

/* =====================================================
   VÝBER REŽIMU DVOJICE OKRUHOV (🎲/📗/📕)
   ===================================================== */
function renderOkruhModePicker(areaName) {
  let box = document.getElementById('okruhModePicker');
  if (!box) {
    box = document.createElement('div');
    box.id = 'okruhModePicker';
    box.style.cssText = 'margin-top:10px;display:flex;gap:6px;flex-wrap:wrap';
    const areasInQuiz = document.getElementById('areasInQuiz');
    if (areasInQuiz) areasInQuiz.appendChild(box);
  }

  box.innerHTML = '';
  OKRUH_MODES.forEach(m => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip mode-chip' + (m.key === currentOkruhMode ? ' chip-active' : '');
    b.textContent = m.label;
    b.onclick = () => {
      currentOkruhMode = m.key;
      box.querySelectorAll('.mode-chip').forEach(x => x.classList.remove('chip-active'));
      b.classList.add('chip-active');
      applyOkruhPairSelection(areaName, currentOkruhMode);
    };
    box.appendChild(b);
  });
}

function modeEmptyMessage(mode) {
  if (mode === 'studied') {
    return 'Zatiaľ nemáš žiadnu tému preštudovanú na ≥80 % – vyberáme náhodne.';
  }
  if (mode === 'unstudied') {
    return 'Nenašli sa témy pod 30 % – super, skoro všetko máš rozbehnuté! Vyberáme náhodne.';
  }
  return '';
}

/* =====================================================
   EXPORTY
   ===================================================== */

/* ===============================
   PRELOAD MEMORY + CASES pre vybranú oblasť
   =============================== */
function isAreaLoaded(areaName) {
  if (areaName === 'Trestné právo') {
    return !!(window.areasLoaded?.['Trestné právo hmotné'] && window.areasLoaded?.['Trestné právo procesné']);
  }
  if (areaName === 'Občianske právo') {
    return !!(window.areasLoaded?.['Občianske právo hmotné'] && window.areasLoaded?.['Občianske právo procesné']);
  }
  return !!window.areasLoaded?.[areaName];
}

function waitAreaLoaded(areaName) {
  /* 🔥 OPRAVA: čaká na príznak "načítanie dokončené" (nie na dĺžku
     otázok) – oblasť s čiastočne/zatiaľ nenaplnenými dátami (napr.
     Európske právo pred doplnením obsahu) inak nikdy nesplní
     "length > 0" a __areaTilesForGames/__areaQuestionsForGames
     ostanú navždy zo STARŠEJ vybranej oblasti (zavádzajúce). */
  return new Promise(resolve => {
    let attempts = 0;
    const check = setInterval(() => {
      attempts++;
      if (isAreaLoaded(areaName) || attempts > 50) {
        clearInterval(check);
        resolve();
      }
    }, 100);
  });
}

/* Filtruje dlaždice/prípady presne podľa dvojice { area, key } – NIE podľa
   holého source kľúča naprieč zlúčenou oblasťou. Hmotné aj procesné podoblasti
   majú vlastné A1..A30/A40/A45 súbory s ROVNAKÝMI source kľúčmi (napr. "A15"
   existuje v oboch), takže filter len podľa kľúča by omylom zobral obsah
   z oboch okruhov naraz. */
function filterBySources(store, sources) {
  if (!Array.isArray(sources) || !sources.length) return [];
  const out = [];
  sources.forEach(({ area, key }) => {
    const list = store?.[area] || [];
    out.push(...list.filter(item => item.source === key));
  });
  return out;
}

/* Poradové číslo session-u – zabráni tomu, aby výsledok pomalšieho
   (starého) volania prepísal medzičasom vybranú novú oblasť/režim. */
let okruhSelectionToken = 0;

async function applyOkruhPairSelection(areaName, mode) {
  const token = ++okruhSelectionToken;

  const hint = document.getElementById('gamesAreaHint');
  if (hint) {
    hint.classList.remove('games-hint-ready');
    hint.innerHTML = `<span class="games-hint-dot"></span><strong>${areaName}</strong> – vyberám okruhy…`;
  }

  // Kým sa nevyberie nová dvojica, nedovoľ spustiť pojednávanie so starou (z inej oblasti/režimu).
  const startBtnEarly = $('startQuizBtn');
  if (startBtnEarly) {
    startBtnEarly.disabled = true;
    startBtnEarly.onclick = null;
  }

  await waitAreaLoaded(areaName);
  if (token !== okruhSelectionToken) return; // medzitým sa zvolila iná oblasť/režim

  const nick = localStorage.getItem('playerNick') || null;
  const result = await pickOkruhPair(areaName, mode, nick);
  if (token !== okruhSelectionToken) return;

  window.__selectedOkruhPair = { area: areaName, mode, ...result };
  window.__areaQuestionsForGames = result.questions;
  window.__areaTilesForGames = filterBySources(window.areaTiles, result.sources);
  window.__areaCasesForGames = filterBySources(window.areaCases, result.sources);

  const nTiles = window.__areaTilesForGames.length;
  const nCases = window.__areaCasesForGames.length;
  console.log(`🎮 ${areaName} [${mode}]: okruhy ${result.keys.join('+') || '—'}, ${result.questions.length} otázok, ${nTiles} dlaždíc, ${nCases} prípadov`);

  const startBtn = $('startQuizBtn');
  if (startBtn) {
    if (result.empty || !result.questions.length) {
      startBtn.disabled = true;
      startBtn.onclick = null;
    } else {
      startBtn.disabled = false;
      startBtn.textContent = 'Spustiť pojednávanie';
      startBtn.onclick = () => {
        console.log('Spúšťam duel pre oblasť:', areaName, 'okruhy:', result.keys);
        startDuel(areaName, result);
      };
    }
  }

  if (hint) {
    if (result.empty) {
      hint.classList.remove('games-hint-ready');
      hint.innerHTML = `<span class="games-hint-dot"></span><strong>${areaName}</strong> – obsah sa ešte pripravuje`;
    } else {
      const okruhLabel = result.keys.join(' + ');
      const fallbackMsg = result.usedFallback ? ` ${modeEmptyMessage(mode)}` : '';
      if (nTiles || nCases || result.questions.length) {
        hint.classList.add('games-hint-ready');
        hint.innerHTML = `<span class="games-hint-dot ready"></span>
          <strong>${areaName}</strong> – okruhy ${okruhLabel}: pripravené ${nTiles} kartičiek, ${nCases} prípadov${fallbackMsg}`;
      } else {
        hint.classList.remove('games-hint-ready');
        hint.innerHTML = `<span class="games-hint-dot"></span>
          <strong>${areaName}</strong> – okruhy ${okruhLabel} zatiaľ nemajú obsah${fallbackMsg}`;
      }
    }
  }
}

export { renderAreas, renderModules };

/* =====================================================
   NICK HRÁČA – uloženie a načítanie
   ===================================================== */

const saveNickBtn = $('saveNick');
if (saveNickBtn) {
  saveNickBtn.addEventListener("click", () => {
    const nick = $('nickname').value.trim();

    if (nick.length < 2) {
      alert("Nick musí mať aspoň 2 znaky");
      return;
    }

    localStorage.setItem("playerNick", nick);
    alert("Nick uložený!");

    const nickDisplay = $('playerNickDisplay');
    if (nickDisplay) nickDisplay.textContent = nick;

    const earnBtn = $('earnBtn');
    if (earnBtn) earnBtn.style.display = 'inline-flex';
  });
}

const savedNick = localStorage.getItem("playerNick");
if (savedNick) {
  const nickInput = $('nickname');
  if (nickInput) nickInput.value = savedNick;

  const nickDisplay = $('playerNickDisplay');
  if (nickDisplay) nickDisplay.textContent = savedNick;
}

/* =====================================================
   ADMIN PANEL (prepínač rolí)
   ===================================================== */
const toggleRoleBtn = $('toggleRoleBtn');
if (toggleRoleBtn) {
  toggleRoleBtn.addEventListener('click', () => {
    const current = localStorage.getItem('userRole') || 'student';
    const next = current === 'student' ? 'garant' : 'student';
    localStorage.setItem('userRole', next);
    toggleRoleBtn.textContent = `Role: ${next}`;
    renderAdminPanel();
  });

  // inicializácia
  const role = localStorage.getItem('userRole') || 'student';
  toggleRoleBtn.textContent = `Role: ${role}`;
  renderAdminPanel();
}
