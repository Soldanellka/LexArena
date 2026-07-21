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

