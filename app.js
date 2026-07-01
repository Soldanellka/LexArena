'use strict';

import { $ } from './core.js';
import { renderAdminPanel } from './admin.js';
import { startDuel } from './scripts/duels.js';

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
function renderAreas() {
  const list = $('areasList');
  if (!list || typeof window.areas === 'undefined') return;

  list.innerHTML = '';
  let selectedName = null;

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
      selectedName = name;

      const startBtn = $('startQuizBtn');
      const quizTitle = $('quizTitle');
      const areaTitle = $('areaTitle');

      if (quizTitle) quizTitle.textContent = 'Vyber oblasť do duelu';
      if (areaTitle) areaTitle.textContent = name;

      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = 'Spustiť duel';
        startBtn.onclick = () => {
          console.log("Spúšťam duel pre oblasť:", name);
          startDuel(name);
        };
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
