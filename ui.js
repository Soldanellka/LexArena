'use strict';

/* =========================
   Reward toast
   ========================= */
export function showRewardToast(text){
  const t = document.createElement('div');
  t.textContent = text;
  t.style.position = 'fixed';
  t.style.right = '20px';
  t.style.bottom = '20px';
  t.style.padding = '12px 16px';
  t.style.background = 'linear-gradient(90deg,#f7c6d6,#ff6f91)';
  t.style.color = '#fff';
  t.style.borderRadius = '10px';
  t.style.boxShadow = '0 10px 30px rgba(240,138,166,0.12)';
  t.style.zIndex = 9999;
  t.style.opacity = '0';
  t.style.transform = 'translateY(8px)';
  document.body.appendChild(t);

  requestAnimationFrame(()=>{
    t.style.transition = 'all 260ms ease';
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
  });

  setTimeout(()=>{
    t.style.opacity = '0';
    t.style.transform = 'translateY(8px)';
    setTimeout(()=> t.remove(), 260);
  }, 2200);
}
/* =========================
   Nickname handling
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const nicknameInput = document.getElementById("nickname");
  const saveNickBtn = document.getElementById("saveNick");
  const nickBox = document.querySelector(".nick-box");
  const nickDisplay = document.getElementById("playerNickDisplay");

  // 1) Načítanie nicku z localStorage
  const savedNick = localStorage.getItem("lexarena_nick");
  if (savedNick) {
    nickDisplay.textContent = savedNick;
    nickBox.style.display = "none"; // skryjeme box
  }

  // 2) Uloženie nicku
  saveNickBtn.addEventListener("click", () => {
    const nick = nicknameInput.value.trim();
    if (nick.length < 2) return;

    localStorage.setItem("lexarena_nick", nick);

    nickDisplay.textContent = nick;
    nickBox.style.display = "none"; // skryjeme box po uložení
  });
});

