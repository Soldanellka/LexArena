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

const $ = id => document.getElementById(id);

function getNick() { return localStorage.getItem('playerNick') || null; }

/* <30 % spiaci · 30–80 % unavený · >80 % čerstvý. Obrázok je AVATAR HRÁČA
   (aktuálne pridelený typ vrátane taláru, ak si ho kúpil/a a nosí – viď
   getAvatarType/getAvatarBustSrcForState v scripts/avatar.js), nie
   generický – len prahy % témy sú vlastné tomuto odznaku, nie energii
   hlavného avatara v hlavičke. */
function moodBadge(pct) {
  if (pct < 30) return { emoji: '😴', label: 'spiaci', state: 'sleep' };
  if (pct <= 80) return { emoji: '😪', label: 'unavený', state: 'tired' };
  return { emoji: '😃', label: 'čerstvý', state: 'full' };
}

let cachedAvatarType = 'student-f';

function moodAvatarImgHtml(state) {
  const src = getAvatarBustSrcForState(cachedAvatarType, state);
  if (!src) return ''; // starý typ avatara bez bust verzie – bez obrázka, len emoji/label nižšie
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

  let html = '<div class="small" style="font-weight:600;margin-bottom:6px">Témy</div>';
  html += '<div class="dashboard-tema-list">';
  allOkruhy.forEach(o => {
    const mood = moodBadge(o.percent);
    const avatarHtml = moodAvatarImgHtml(mood.state);
    html += `
      <div class="dashboard-tema-row" style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--card-border, rgba(0,0,0,0.06))">
        <div style="flex:1">${escapeHtml(o.title)} — ${o.percent} %</div>
        <div class="dashboard-mood-badge" style="display:flex;align-items:center;gap:5px;font-size:12px;padding:2px 6px;border:1px solid var(--card-border, rgba(0,0,0,0.15));border-radius:10px;white-space:nowrap">
          ${avatarHtml}${mood.emoji} ${mood.label}
        </div>
      </div>`;
  });
  html += '</div>';

  html += '<div class="small" style="font-weight:600;margin:14px 0 6px 0">Čo dobrať</div>';
  if (!toDobrat.length) {
    html += '<div class="small muted">Všetky témy tejto oblasti sú na ≥80 % – skvelá práca!</div>';
  } else {
    html += '<div class="dashboard-todo-list">';
    toDobrat.forEach(o => {
      const missing = o.missingActivities.length ? o.missingActivities.join(', ') : '—';
      html += `<div class="small" style="padding:3px 0">${escapeHtml(o.title)} – ${o.percent} %: chýbajú ${escapeHtml(missing)}</div>`;
    });
    html += '</div>';
  }

  body.innerHTML = html;
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

export async function openDashboard() {
  const modal = $('dashboardModal');
  if (modal) { modal.style.display = 'flex'; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }

  const body = $('dashboardBody');
  if (body) body.textContent = 'Načítavam…';

  renderAreaTabs();

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
