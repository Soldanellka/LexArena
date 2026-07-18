'use strict';

/* ============================================================
   MOBILNÁ ARCHITEKTÚRA – spodná navigácia + zbaliteľné sekcie
   Platí vizuálne len na mobile (media queries v styles.css);
   tento modul len pripája správanie, nerozhoduje o zobrazení.
============================================================ */

/* ── SPODNÁ NAVIGÁCIA ──
   Pozn.: `body { overflow-x: hidden }` (styles.css) spôsobuje, že podľa
   CSS špecifikácie sa overflow-y prepočíta na 'auto' a stránka reálne
   scrolluje cez <body>, nie cez window/<html>. Preto scrollTo() voláme
   na všetkých kandidátoch naraz (na tom, kto nie je scroller, je to no-op). */
function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || 0;
}

/* export: iné moduly (napr. init.js – uvítacie okno, tlačidlo "Otvoriť
   nástenku") znovupoužívajú TENTO scroll, nie vlastnú kópiu. */
export function scrollToTarget(target) {
  if (target === 'top') {
    const opts = { top: 0, behavior: 'smooth' };
    window.scrollTo(opts);
    document.documentElement.scrollTo(opts);
    document.body.scrollTo(opts);
    return;
  }
  if (target === 'profile') {
    const avatarWrap = document.getElementById('avatarWrap');
    if (avatarWrap) avatarWrap.click();
    return;
  }
  const el = document.getElementById(target);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initBottomNav() {
  const nav = document.querySelector('.bottom-nav');
  if (!nav) return;

  const buttons = Array.from(nav.querySelectorAll('button[data-target]'));
  buttons.forEach(btn => {
    btn.addEventListener('click', () => scrollToTarget(btn.dataset.target));
  });

  const setActive = (target) => {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.target === target));
  };

  // Zvýraznenie aktívnej položky podľa toho, ktorá sekcia je práve vo výreze
  const sectionIds = ['quizCard', 'gamesSection', 'leaderboardSection'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length && typeof IntersectionObserver === 'function') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => observer.observe(sec));
  }

  window.addEventListener('scroll', () => {
    if (getScrollTop() < 80) setActive('top');
  }, { passive: true, capture: true });
}

/* ── ZBALITEĽNÉ SEKCIE ──
   Stav v localStorage (mColl:{key} = '1' zbalené / '0' rozbalené).
   Default: zbalené, okrem rebríčka (hráči ho chcú vidieť hneď). */
const COLLAPSIBLE_SECTIONS = [
  { selector: '.highlight-noticeboard', key: 'noticeboard', defaultCollapsed: true },
  { selector: '.highlight-feedback',    key: 'feedback',    defaultCollapsed: true },
  { selector: '.highlight-video',       key: 'videos',      defaultCollapsed: true },
  { selector: '#leaderboardSection',    key: 'leaderboard', defaultCollapsed: false },
  { selector: '.highlight-bank',        key: 'duelbank',    defaultCollapsed: true },
  { selector: '.highlight-senaty',      key: 'senaty',      defaultCollapsed: true }
];

function initCollapsibleSections() {
  COLLAPSIBLE_SECTIONS.forEach(({ selector, key, defaultCollapsed }) => {
    const card = document.querySelector(selector);
    if (!card) return;

    const header = card.querySelector('h3');
    if (!header) return;

    card.classList.add('m-collapsible');

    const storageKey = `mColl:${key}`;
    const stored = localStorage.getItem(storageKey);
    const collapsed = stored !== null ? stored === '1' : defaultCollapsed;
    card.classList.toggle('m-collapsed', collapsed);

    header.addEventListener('click', () => {
      const nowCollapsed = !card.classList.contains('m-collapsed');
      card.classList.toggle('m-collapsed', nowCollapsed);
      localStorage.setItem(storageKey, nowCollapsed ? '1' : '0');
    });
  });
}

/* export: rozbalí danú sekciu (key z COLLAPSIBLE_SECTIONS vyššie), ak je
   zbalená – rovnaký stav/trieda ako klik na hlavičku. Na desktope je
   .m-collapsed vizuálne bez efektu (viď styles.css media query), takže
   toto je bezpečné volať bez ohľadu na zariadenie. */
export function uncollapseSection(key) {
  const entry = COLLAPSIBLE_SECTIONS.find(s => s.key === key);
  if (!entry) return;
  const card = document.querySelector(entry.selector);
  if (!card) return;
  card.classList.remove('m-collapsed');
  localStorage.setItem(`mColl:${entry.key}`, '0');
}

function initMobileArchitecture() {
  initBottomNav();
  initCollapsibleSections();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileArchitecture);
} else {
  initMobileArchitecture();
}
