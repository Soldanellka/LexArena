'use strict';

/* ============================================================
   UI OSOBNÉHO PREHĽADU PROGRESU – Fáza 3
   Súkromné (len tento hráč) – žiadne prepojenie na groups/assignments,
   garant/senáty toto nevidia. Nedotýka sa duels/, leaderboard/,
   groups/, assignments/, contentOverrides.
============================================================ */
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { DASHBOARD_AREAS, computeFullDashboard } from './dashboardStats.js';
import { checkAndAwardDashboardRewards } from './dashboardRewards.js';
import { getAvatarType, getAvatarBustSrcForState } from './avatar.js';
import { ECONOMY_CONFIG } from './economyConfig.js';
import { makeCollapsible } from '../mobile-nav.js';

const $ = id => document.getElementById(id);

function getNick() { return localStorage.getItem('playerNick') || null; }

/* <30 % spiaci · 30–80 % unavený · >80 % čerstvý. Určuje AJ farbu riadku
   (mood-sleep/tired/full, styles.css), AJ ktorý stav avatara sa vykreslí
   (moodAvatarImgHtml nižšie) – žiadne emoji/textový label sa už nezobrazuje,
   stav nesie výhradne avatar + farba pozadia riadku (2026-07-19). */
function moodState(pct) {
  if (pct < 30) return 'sleep';
  if (pct <= 80) return 'tired';
  return 'full';
}

let cachedAvatarType = 'student-f';

function moodAvatarImgHtml(state) {
  const src = getAvatarBustSrcForState(cachedAvatarType, state);
  if (!src) return ''; // starý typ avatara bez bust verzie – riadok ostane bez avatara (farba pozadia stavu nesie naďalej)
  return `<img src="${src}" alt="" class="dashboard-mood-avatar" onerror="this.remove()" />`;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let cachedDashboard = null;
let activeAreaIdx = 0;

function renderAreaTabs() {
  const box = $('dashboardAreaTabs');
  if (!box) return;
  box.innerHTML = '';
  DASHBOARD_AREAS.forEach((area, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (idx === activeAreaIdx ? ' chip-active' : '');
    btn.textContent = area.title;
    btn.onclick = () => {
      activeAreaIdx = idx;
      renderAreaTabs();
      renderBody();
    };
    box.appendChild(btn);
  });
}

function temaWord(n) {
  if (n === 1) return 'téma';
  if (n >= 2 && n <= 4) return 'témy';
  return 'tém';
}

function renderBody() {
  const body = $('dashboardBody');
  if (!body || !cachedDashboard) return;

  const areaData = cachedDashboard[activeAreaIdx];
  const allOkruhy = areaData.subAreas.flatMap(s => s.okruhy);

  if (!allOkruhy.length) {
    body.innerHTML = '<div class="small muted">Táto oblasť zatiaľ nemá žiadny obsah.</div>';
    return;
  }

  const toDobrat = allOkruhy
    .filter(o => o.percent < 80)
    .sort((a, b) => a.percent - b.percent);

  /* "Ešte N tém do 100 %" – ROVNAKÝ prah ako odmena OBLAST_100 (tá vyžaduje
     VŠETKY témy oblasti na 100 %, viď dashboardRewards.js allTemy100). */
  const remainingTo100 = allOkruhy.filter(o => o.percent < 100).length;
  let html = remainingTo100 === 0
    ? `<div class="small" style="margin-bottom:10px;color:var(--muted)">🎉 Všetky témy tejto oblasti sú na 100 %!</div>`
    : `<div class="small" style="margin-bottom:10px;color:var(--muted)">Ešte ${remainingTo100} ${temaWord(remainingTo100)} do 100 % v tejto oblasti (odmena +${ECONOMY_CONFIG.DASHBOARD.OBLAST_100}§ za celú oblasť).</div>`;

  html += '<div class="small" style="font-weight:600;margin-bottom:6px">Témy</div>';
  html += '<div class="dashboard-tema-list">';
  allOkruhy.forEach(o => {
    const state = moodState(o.percent);
    const avatarHtml = moodAvatarImgHtml(state);
    html += `
      <div class="dashboard-tema-row mood-${state}" style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--card-border, rgba(0,0,0,0.06))">
        <div style="flex:1">${escapeHtml(o.title)} — ${o.percent} %</div>
        ${avatarHtml}
      </div>`;
  });
  html += '</div>';

  // Zbaliteľné, defaultne ZBALENÉ (dashboard je dlhý) – makeCollapsible sa
  // volá NANOVO po každom renderi nižšie, keďže tento kus DOM sa tu
  // zakaždým vytvára odznova (na rozdiel od štátnicovej sekcie, tá je
  // statická v index.html a volá sa len raz, viď wireStatniceCollapse()).
  html += `
    <div id="dashboardTodoSection" class="m-collapsible" style="margin-top:14px">
      <div class="dashboard-collapsible-header small" style="font-weight:600">Čo dobrať</div>
      <div class="dashboard-collapsible-body" style="margin-top:6px">`;
  if (!toDobrat.length) {
    html += '<div class="small muted">Všetky témy tejto oblasti sú na ≥80 % – skvelá práca!</div>';
  } else {
    html += '<div class="dashboard-todo-list">';
    toDobrat.forEach(o => {
      const missing = o.missingActivities.length ? o.missingActivities.join(', ') : '—';
      const zvysok = 100 - o.percent;
      html += `<div class="small" style="padding:3px 0">${escapeHtml(o.title)} – ${o.percent} % (ešte ${zvysok} % do zvládnutia): chýbajú ${escapeHtml(missing)}</div>`;
    });
    html += '</div>';
  }
  html += '</div></div>';

  body.innerHTML = html;

  const todoSection = $('dashboardTodoSection');
  const todoHeader = todoSection ? todoSection.querySelector('.dashboard-collapsible-header') : null;
  makeCollapsible(todoSection, todoHeader, 'mColl:dashboardTodo', true);
}

function skuskaWord(n) {
  if (n === 1) return 'skúška';
  if (n >= 2 && n <= 4) return 'skúšky';
  return 'skúšok';
}

/* PO OBLASTIACH, nie chronologicky deň-po-dni – zaujíma "koľko som
   zvládol/zvládla v jednotlivých oblastiach", nie presné dátumy. Zoskupené
   podľa e.area (rovnaký reťazec ako DASHBOARD_AREAS[].title – pozri
   scripts/statnice.js saveExamResult, ktoré ho tam ukladá). */
async function renderStatnice(nick) {
  const box = $('dashboardStatniceList');
  if (!box) return;
  if (!nick) { box.innerHTML = '<div class="small muted">Prihlás sa (nick), aby sa zobrazili tvoje skúšky.</div>'; return; }

  const db = window.db;
  if (!db) { box.innerHTML = '<div class="small muted">Firebase nedostupná.</div>'; return; }

  try {
    const snap = await get(ref(db, `users/${nick}/examResults`));
    if (!snap.exists()) {
      box.innerHTML = '<div class="small muted">Zatiaľ žiadna skúška v štátnicovej sieni.</div>';
      return;
    }

    const entries = Object.values(snap.val() || {});
    const byArea = {};
    entries.forEach(e => {
      const area = e.area || '—';
      if (!byArea[area]) byArea[area] = { count: 0, best: null, latest: null, latestTs: -1 };
      const g = byArea[area];
      g.count++;
      if (typeof e.znamka === 'number' && (g.best === null || e.znamka < g.best)) g.best = e.znamka;
      if ((e.ts || 0) >= g.latestTs) { g.latestTs = e.ts || 0; g.latest = e.znamka; }
    });

    const areaNames = Object.keys(byArea).sort((a, b) => a.localeCompare(b, 'sk'));
    box.innerHTML = areaNames.map(area => {
      const g = byArea[area];
      const bestTxt = g.best ?? '—';
      const latestTxt = g.latest ?? '—';
      return `<div class="small" style="padding:3px 0">${escapeHtml(area)} – ${g.count} ${skuskaWord(g.count)}, najlepšia známka ${escapeHtml(bestTxt)}, posledná ${escapeHtml(latestTxt)}</div>`;
    }).join('') || '<div class="small muted">Zatiaľ žiadna skúška v štátnicovej sieni.</div>';
  } catch (e) {
    console.warn('⚠️ Dashboard: čítanie examResults zlyhalo', e);
    box.innerHTML = '<div class="small muted">Skúšky sa nepodarilo načítať.</div>';
  }
}

// Štátnicová sekcia je STATICKÁ v index.html (na rozdiel od "Čo dobrať"
// vyššie, ktoré sa prekresľuje pri každom renderBody()) – stačí pripojiť
// zbaľovanie RAZ, nie pri každom openDashboard().
let statniceCollapseWired = false;
function wireStatniceCollapse() {
  if (statniceCollapseWired) return;
  const section = $('dashboardStatniceSection');
  const header = section ? section.querySelector('.dashboard-collapsible-header') : null;
  if (!section || !header) return;
  makeCollapsible(section, header, 'mColl:dashboardStatnice', true);
  statniceCollapseWired = true;
}

export async function openDashboard() {
  const modal = $('dashboardModal');
  if (modal) { modal.style.display = 'flex'; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }

  const body = $('dashboardBody');
  if (body) body.textContent = 'Načítavam…';

  renderAreaTabs();
  wireStatniceCollapse();

  const nick = getNick();
  if (!nick) {
    if (body) body.innerHTML = '<div class="small muted">Zadaj a ulož si nick hore, aby sme mohli sledovať tvoj progres.</div>';
    renderStatnice(null);
    return;
  }

  cachedAvatarType = await getAvatarType(nick);
  cachedDashboard = await computeFullDashboard(nick);
  renderBody();
  renderStatnice(nick);

  // Odmeny sa vyhodnotia potichu na pozadí (nový prepočet mohol prekročiť prah).
  checkAndAwardDashboardRewards(nick, cachedDashboard).catch(e => console.warn('⚠️ Dashboard rewards zlyhali', e));
}

function closeDashboard() {
  const modal = $('dashboardModal');
  if (modal) { modal.style.display = 'none'; modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
}

const openBtn = document.getElementById('openDashboardBtn');
if (openBtn) openBtn.addEventListener('click', openDashboard);

const closeBtn = document.getElementById('closeDashboard');
if (closeBtn) closeBtn.addEventListener('click', closeDashboard);
