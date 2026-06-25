'use strict';

/* =========================
   Konštanty a perzistencia
   ========================= */
export const LS = {
  PAR: 'lex_paragrafy',
  THEME: 'lex_theme',
  AVATAR: 'lex_avatar',
  GAMES: 'lex_games_played',
  MEMORY_STATE: 'lex_memory_state',
  LEADERBOARD: 'lex_memory_leaderboard',
  ANSWERED_CASES_PREFIX: 'lex_answered_cases_',
  REPORTS: 'lex_reports'
};

/* =========================
   Helper funkcie
   ========================= */
export function $(id){
  return document.getElementById(id);
}

export function qsa(sel){
  return Array.from(document.querySelectorAll(sel));
}

export function saveParagrafy(n){
  try { localStorage.setItem(LS.PAR, String(n)); } catch(e){}
}

export function loadParagrafy(){
  return Number(localStorage.getItem(LS.PAR) || 10);
}

export function escapeHtml(s){
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[c]));
}

export function shuffleArray(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function safeId(s){
  return String(s || '').replace(/[^\w\-]/g, '_');
}

/* =========================
   Modal helpers
   ========================= */
export function openModal(modalEl){
  if(!modalEl) return;
  modalEl.classList.add('open');
  modalEl.setAttribute('aria-hidden','false');

  const focusable = modalEl.querySelector('button, [tabindex], input, select, textarea');
  if(focusable) focusable.focus();
}

export function closeModal(modalEl){
  if(!modalEl) return;
  modalEl.classList.remove('open');
  modalEl.setAttribute('aria-hidden','true');
}
/* =========================
   PIN login + transfer účtu
   ========================= */

// jednoduchý PIN login (demo verzia)
export function loginWithPin(pin) {
  try {
    const saved = localStorage.getItem("lex_pin");
    if (!saved) {
      alert("PIN ešte nie je nastavený.");
      return false;
    }

    if (String(pin) === String(saved)) {
      alert("Prihlásenie úspešné!");
      return true;
    } else {
      alert("Nesprávny PIN.");
      return false;
    }
  } catch (e) {
    console.error("loginWithPin error:", e);
    return false;
  }
}

// jednoduchý prenos účtu (demo verzia)
export function transferAccount() {
  try {
    const data = {
      paragrafy: localStorage.getItem("lex_paragrafy") || 0,
      avatar: localStorage.getItem("lex_avatar") || null,
      theme: localStorage.getItem("lex_theme") || "light"
    };

    alert("Účet exportovaný (demo). Dáta v konzole.");
    console.log("TRANSFER DATA:", data);

    return data;
  } catch (e) {
    console.error("transferAccount error:", e);
    return null;
  }
}
