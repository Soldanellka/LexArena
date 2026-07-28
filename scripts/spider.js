'use strict';

/* ============================================================
   scripts/spider.js — PAMÄŤOVÝ PAVÚK (concept-map strom per okruh)
   Samostatný, odpojený subsystém: štatická hierarchia (stred → vetvy →
   listy) pre rýchle učenie štruktúry témy. NIE hodnotená aktivita –
   nezapisuje sa nikam do progresu, nepridáva sa do computeOkruhStats.

   Zámerne DUPLIKUJE basePath tabuľku a fetch z scripts/statnice.js
   namiesto ich zdieľania: fetchOkruh tam je lokálna neexportovaná
   funkcia, ktorá navyše zahadzuje `tiles`/`spider` (vracia len 6 polí
   pre potreby hodnotenia). Menší blast radius – statnice.js sa
   nedotýka vôbec.

   Dáta (voliteľné, autorské, vedľa tiles v A{n}.json):
     topic.spider = { branches: [ { label, leaves: [string, ...] }, ... ] }
   Chýba topic.spider → fallback "hviezdica" z topic.tiles[].term (uzly
   bez detí, žiadna druhá úroveň). Chýba aj tiles → nič sa nevykreslí
   (fail-soft, len console.warn).
============================================================ */

const LIVE = 'https://www.lexarena.sk/';
const AREA_PATHS = {
  'Pracovné právo': LIVE + 'LuluLaw duel Pracovné právo/data/',
  'Trestné právo hmotné': LIVE + 'Trestné právo hmotné/data/',
  'Trestné právo procesné': LIVE + 'Trestné právo procesné/data/',
  'Občianske právo hmotné': LIVE + 'ob-pravo-app/data/hmotne/',
  'Občianske právo procesné': LIVE + 'ob-pravo-app/data/procesne/',
  'Európske právo': LIVE + 'eu-pravo-app/data/'
};

const BRANCH_COLORS = ['spider-c0', 'spider-c1', 'spider-c2', 'spider-c3', 'spider-c4', 'spider-c5'];

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function fetchTopicJson(key, areaTitle) {
  const basePath = AREA_PATHS[areaTitle];
  if (!basePath) {
    console.warn(`[PAVÚK] Neznáma areaTitle "${areaTitle}", basePath sa nedá určiť.`);
    return null;
  }
  try {
    const res = await fetch(`${basePath}${key}.json`);
    if (!res.ok) return null;
    const json = await res.json();
    return (json && json.title) ? json : null;
  } catch (e) {
    console.warn('[PAVÚK] fetch okruhu zlyhal:', e);
    return null;
  }
}

/* branches: [{ label, leaves: string[] }]. Bez topic.spider sa vezme
   hviezdica z tiles (uzly bez potomkov – klik na ne rovno otvorí detail,
   nie je čo skrývať/odkrývať). */
function buildBranches(json) {
  if (json.spider && Array.isArray(json.spider.branches) && json.spider.branches.length) {
    return json.spider.branches
      .filter(b => b && b.label)
      .map(b => ({ label: b.label, leaves: Array.isArray(b.leaves) ? b.leaves.filter(Boolean) : [] }));
  }
  if (Array.isArray(json.tiles) && json.tiles.length) {
    return json.tiles.filter(t => t && t.term).map(t => ({ label: t.term, leaves: [] }));
  }
  return [];
}

function findDefinition(json, label) {
  const tile = (json.tiles || []).find(t => t && t.term === label);
  return tile ? tile.definition : null;
}

function wrapLabel(label, maxChars) {
  const words = String(label).split(/\s+/);
  const lines = [];
  let cur = '';
  words.forEach(w => {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = next;
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function tileSvg({ x, y, w, h, colorClass, label, nodeId, hasChildren, collapsed }) {
  const lines = wrapLabel(label, 14);
  const lineHeight = 13;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  const textSpans = lines.map((line, i) =>
    `<tspan x="${x}" y="${startY + i * lineHeight}">${escapeHtml(line)}</tspan>`
  ).join('');
  const marker = hasChildren ? `<text x="${x + w / 2 - 10}" y="${y - h / 2 + 14}" class="spider-marker" text-anchor="middle">${collapsed ? '+' : '−'}</text>` : '';
  return `
    <g class="spider-node ${colorClass}" data-node-id="${nodeId}" tabindex="0" role="button">
      <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="14" class="spider-tile"></rect>
      <text text-anchor="middle" dominant-baseline="middle" class="spider-label">${textSpans}</text>
      ${marker}
    </g>`;
}

/* Radiálny layout: stred → vetvy na kružnici (radius R1) → listy vetvy
   rozložené vo výseči okolo uhla svojej vetvy (radius R2). Vetva bez
   listov (fallback hviezdica) sa správa ako list – klik rovno otvorí detail. */
function renderTree(container, json, branches, state) {
  const W = 720, H = 720, cx = W / 2, cy = H / 2;
  const R1 = branches.length > 4 ? 220 : 190;
  const R2 = R1 + 150;
  const N = branches.length;

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="spider-svg">`;
  const lines = [];
  const nodes = [];

  nodes.push(tileSvg({ x: cx, y: cy, w: 150, h: 60, colorClass: 'spider-center', label: json.title, nodeId: 'center', hasChildren: false, collapsed: false }));

  branches.forEach((branch, i) => {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
    const bx = cx + R1 * Math.cos(angle);
    const by = cy + R1 * Math.sin(angle);
    const colorClass = BRANCH_COLORS[i % BRANCH_COLORS.length];
    const collapsed = !!state.collapsed[i];
    const hasChildren = branch.leaves.length > 0;

    lines.push(`<line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" class="spider-line"></line>`);
    nodes.push(tileSvg({ x: bx, y: by, w: 130, h: 52, colorClass, label: branch.label, nodeId: `b${i}`, hasChildren, collapsed }));

    if (hasChildren && !collapsed) {
      const spread = Math.min(Math.PI / 3, (Math.PI / N) * 1.8);
      const leafCount = branch.leaves.length;
      branch.leaves.forEach((leaf, j) => {
        const leafAngle = angle - spread / 2 + (leafCount > 1 ? (j / (leafCount - 1)) * spread : spread / 2);
        const lx = cx + R2 * Math.cos(leafAngle);
        const ly = cy + R2 * Math.sin(leafAngle);
        lines.push(`<line x1="${bx}" y1="${by}" x2="${lx}" y2="${ly}" class="spider-line spider-line-leaf"></line>`);
        nodes.push(tileSvg({ x: lx, y: ly, w: 120, h: 48, colorClass, label: leaf, nodeId: `b${i}l${j}`, hasChildren: false, collapsed: false }));
      });
    }
  });

  svg += lines.join('') + nodes.join('') + '</svg>';
  container.innerHTML = svg;
}

function ensureSpiderCss() {
  if (document.getElementById('spider-css')) return;
  const style = document.createElement('style');
  style.id = 'spider-css';
  style.textContent = `
    .spider-panel { max-width: 760px; }
    .spider-svg { width: 100%; height: auto; display: block; }
    .spider-line { stroke: var(--card-border, rgba(0,0,0,0.15)); stroke-width: 2; }
    .spider-line-leaf { stroke-width: 1.5; opacity: 0.7; }
    .spider-tile { stroke: rgba(0,0,0,0.08); stroke-width: 1; cursor: pointer; }
    .spider-node { cursor: pointer; }
    .spider-label { font-size: 11px; fill: var(--text, #2b2b2b); font-family: inherit; pointer-events: none; }
    .spider-marker { font-size: 13px; font-weight: 700; fill: var(--muted, #7b6f78); pointer-events: none; }
    .spider-center .spider-tile { fill: var(--surface, #fff); stroke: var(--accent-3, #ff6f91); stroke-width: 2; }
    .spider-center .spider-label { font-weight: 700; font-size: 12px; }
    .spider-c0 .spider-tile { fill: #cfe3fb; }
    .spider-c1 .spider-tile { fill: #cdeed9; }
    .spider-c2 .spider-tile { fill: #e3d6f7; }
    .spider-c3 .spider-tile { fill: #fce0bd; }
    .spider-c4 .spider-tile { fill: #fbd0dd; }
    .spider-c5 .spider-tile { fill: #c9ece7; }
    :root[data-theme="dark"] .spider-c0 .spider-tile { fill: #1f3a5c; }
    :root[data-theme="dark"] .spider-c1 .spider-tile { fill: #1f4a38; }
    :root[data-theme="dark"] .spider-c2 .spider-tile { fill: #3a2d54; }
    :root[data-theme="dark"] .spider-c3 .spider-tile { fill: #5a4322; }
    :root[data-theme="dark"] .spider-c4 .spider-tile { fill: #5a2c3a; }
    :root[data-theme="dark"] .spider-c5 .spider-tile { fill: #1f4e48; }
    :root[data-theme="dark"] .spider-tile { stroke: rgba(255,255,255,0.12); }
    :root[data-theme="dark"] .spider-label { fill: var(--text, #e6eef6); }
    .spider-detail { margin-top: 14px; padding: 10px 12px; border-radius: 12px; background: var(--bg, #fffafc); border: 1px solid var(--card-border, rgba(0,0,0,0.06)); }
  `;
  document.head.appendChild(style);
}

export async function openSpider(key, areaTitle) {
  const json = await fetchTopicJson(key, areaTitle);
  if (!json) {
    console.warn(`[PAVÚK] Okruh ${key} (${areaTitle}) sa nepodarilo načítať – pavúk sa nezobrazí.`);
    return;
  }
  const branches = buildBranches(json);
  if (!branches.length) {
    console.warn(`[PAVÚK] Okruh ${key} nemá ani spider, ani tiles – niet čo vykresliť.`);
    return;
  }

  ensureSpiderCss();

  const existing = document.getElementById('spiderModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'spiderModal';
  modal.className = 'avatar-modal';

  modal.innerHTML = `
    <div class="avatar-panel spider-panel">
      <h3 style="margin:0 0 4px 0">${escapeHtml(json.title)}</h3>
      <div class="small muted" style="margin-bottom:10px">Klik na vetvu skryje/odkryje listy · klik na list ukáže definíciu</div>
      <div id="spiderTreeHost"></div>
      <div id="spiderDetailHost"></div>
      <div style="margin-top:16px">
        <button class="btn" id="spiderCloseBtn" style="width:100%">Zavrieť</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const treeHost = modal.querySelector('#spiderTreeHost');
  const detailHost = modal.querySelector('#spiderDetailHost');
  const state = { collapsed: {} };

  function showDetail(label) {
    const def = findDefinition(json, label);
    detailHost.innerHTML = `
      <div class="spider-detail">
        <div style="font-weight:600">${escapeHtml(label)}</div>
        ${def ? `<div class="small" style="margin-top:4px">${escapeHtml(def)}</div>` : ''}
      </div>`;
  }

  function redraw() {
    renderTree(treeHost, json, branches, state);
    treeHost.querySelectorAll('.spider-node').forEach(node => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-node-id');
        if (id === 'center') return;
        const m = id.match(/^b(\d+)(?:l(\d+))?$/);
        if (!m) return;
        const bi = Number(m[1]);
        if (m[2] === undefined && branches[bi].leaves.length > 0) {
          state.collapsed[bi] = !state.collapsed[bi];
          redraw();
        } else {
          const label = m[2] !== undefined ? branches[bi].leaves[Number(m[2])] : branches[bi].label;
          showDetail(label);
        }
      });
    });
  }
  redraw();

  const close = () => modal.remove();
  modal.querySelector('#spiderCloseBtn').onclick = close;
  modal.onclick = e => { if (e.target === modal) close(); };
}
