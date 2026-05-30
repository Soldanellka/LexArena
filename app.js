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

