'use strict';

/* ============================================================
   scripts/spiderMap.js — MAPA OKRUHOV (klastre → okruhy → strom)
   Samostatný modul popri scripts/spider.js. spider.js SA NEMENÍ –
   jeho openSpiderBrowser() nemá exportované vnútro (renderAreas/
   renderOkruhy sú súkromné), takže rozšíriť ju zvonka sa nedá.
   Riešenie (schválené, rovnaký vzor ako duplikácia AREA_PATHS zo
   statnice.js v spider.js): tento modul duplikuje minimálny
   oblasť→okruh picker a NAHRÁDZA volanie spider.js openSpiderBrowser()
   v init.js (jeden riadok). Pre oblasti BEZ _map.json sa picker správa
   presne ako doteraz (plochý zoznam → openSpider). Pre oblasti S
   _map.json pribúda prepínač Strom/Mapa a dvojúrovňová mapa (Z1
   klastre → Z2 okruhy v klastri).

   Z2 → Z3 (existujúci strom okruhu): volá sa openSpider(key, areaTitle)
   z spider.js cez lazy await import() v try/catch (rovnaký containment
   vzor ako všade inde). Z2 modal sa PRED otvorením Z3 NEODSTRAŇUJE –
   zostáva v DOM pod openSpider-ovým vlastným modalom. Keď užívateľ
   zatvorí Z3 (jeho vlastné tlačidlo „Zavrieť“, nezávisle od tohto
   modulu), Z2 sa objaví presne tam, kde bol – to je efekt „späť“ bez
   toho, aby sa čokoľvek menilo na openSpider samotnom.

   Vykresľovanie Z1/Z2 je hybrid: SVG nesie len tvary/pozície/pan-zoom
   (cez viewBox), popisky klastrov/okruhov sú HTML <div> prekryté nad
   SVG a prepočítané pri každej zmene viewBox – texty sa tak zalamujú
   ako bežný HTML text (nie ručné SVG meranie, presne dôvod, prečo bol
   strom okruhu v krok A prepísaný z SVG na HTML/CSS).

   Dáta: ob-pravo-app/data/procesne/_map.json { area, clusters[], links[] }
   – links[] sa v tejto dávke ešte nevykresľuje (len kostra Z1/Z2).
   Žiadna hra, žiadny Firebase zápis, žiadny progres – rovnako ako
   spider.js, ide o nehodnotenú pomôcku.
============================================================ */

import { DASHBOARD_AREAS } from './dashboardStats.js';

const LIVE = 'https://www.lexarena.sk/';
const AREA_PATHS = {
  'Pracovné právo': LIVE + 'LuluLaw duel Pracovné právo/data/',
  'Trestné právo hmotné': LIVE + 'Trestné právo hmotné/data/',
  'Trestné právo procesné': LIVE + 'Trestné právo procesné/data/',
  'Občianske právo hmotné': LIVE + 'ob-pravo-app/data/hmotne/',
  'Občianske právo procesné': LIVE + 'ob-pravo-app/data/procesne/',
  'Európske právo': LIVE + 'eu-pravo-app/data/'
};

const AREA_COUNTS = DASHBOARD_AREAS.flatMap(a => a.subAreas)
  .reduce((acc, s) => { acc[s.areaTitle] = s.maxOkruh; return acc; }, {});

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function fetchMapJson(areaTitle) {
  const basePath = AREA_PATHS[areaTitle];
  if (!basePath) return null;
  try {
    const res = await fetch(`${basePath}_map.json`);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !Array.isArray(json.clusters) || !json.clusters.length) return null;
    return json;
  } catch (e) {
    console.warn('[MAPA] fetch _map.json zlyhal (oblasť pravdepodobne nemá mapu):', e);
    return null;
  }
}

async function fetchOkruhTitle(key, areaTitle) {
  const basePath = AREA_PATHS[areaTitle];
  if (!basePath) return key;
  try {
    const res = await fetch(`${basePath}${key}.json`);
    if (!res.ok) return key;
    const json = await res.json();
    return (json && (json.spider?.center || json.title)) || key;
  } catch (e) {
    console.warn('[MAPA] fetch okruhu zlyhal:', e);
    return key;
  }
}

function ensureSpiderMapCss() {
  if (document.getElementById('spider-map-css')) return;
  const style = document.createElement('style');
  style.id = 'spider-map-css';
  style.textContent = `
    .spider-map-host { position: relative; width: 100%; height: 60vh; max-height: 520px; border-radius: 12px; overflow: hidden; background: var(--bg, #fffafc); border: 1px solid var(--card-border, rgba(0,0,0,0.08)); touch-action: none; }
    .spider-map-svg { width: 100%; height: 100%; display: block; cursor: grab; }
    .spider-map-node { stroke: rgba(0,0,0,0.12); stroke-width: 1; cursor: pointer; }
    .spider-map-node:focus { outline: 2px solid var(--accent-3, #ff6f91); outline-offset: 2px; }
    .spider-map-labels { position: absolute; inset: 0; pointer-events: none; }
    .spider-map-label {
      position: absolute; box-sizing: border-box; display: -webkit-box; -webkit-box-orient: vertical;
      -webkit-box-pack: center; -webkit-box-align: center; text-align: center;
      font-weight: 600; color: var(--text, #2b2b2b); padding: 4px 6px;
      overflow: hidden; overflow-wrap: break-word; line-height: 1.25; pointer-events: none;
    }
    .spider-map-toolbar { display: flex; gap: 8px; flex-wrap: wrap; }
    .spider-map-c0 { fill: #cfe3fb; }
    .spider-map-c1 { fill: #cdeed9; }
    .spider-map-c2 { fill: #e3d6f7; }
    .spider-map-c3 { fill: #fce0bd; }
    .spider-map-c4 { fill: #fbd0dd; }
    .spider-map-c5 { fill: #c9ece7; }
    .spider-map-c6 { fill: #f7ecc0; }
    .spider-map-c7 { fill: #f8d0ce; }
    .spider-map-c8 { fill: #d6d9f7; }
    .spider-map-c9 { fill: #e3f0c0; }
    :root[data-theme="dark"] .spider-map-c0 { fill: #1f3a5c; }
    :root[data-theme="dark"] .spider-map-c1 { fill: #1f4a38; }
    :root[data-theme="dark"] .spider-map-c2 { fill: #3a2d54; }
    :root[data-theme="dark"] .spider-map-c3 { fill: #5a4322; }
    :root[data-theme="dark"] .spider-map-c4 { fill: #5a2c3a; }
    :root[data-theme="dark"] .spider-map-c5 { fill: #1f4e48; }
    :root[data-theme="dark"] .spider-map-c6 { fill: #5a4d1a; }
    :root[data-theme="dark"] .spider-map-c7 { fill: #5c2420; }
    :root[data-theme="dark"] .spider-map-c8 { fill: #2b2f5a; }
    :root[data-theme="dark"] .spider-map-c9 { fill: #3d4a1a; }
    :root[data-theme="dark"] .spider-map-node { stroke: rgba(255,255,255,0.14); }
    :root[data-theme="dark"] .spider-map-label { color: var(--text, #e6eef6); }
    @media (max-width: 480px) {
      .spider-map-host { height: 50vh; }
    }
  `;
  document.head.appendChild(style);
}

/* Deterministický mriežkový layout, 5 stĺpcov, žiadna fyzika/náhoda.
   cx/cy sú stredy uzlov v pevnom (base) súradnicovom priestore; ten sa
   nemení – pan/zoom mení len viewBox, ktorý sa naň pozerá. */
function gridLayout(count, { cols, nodeW, nodeH, stepX, stepY, marginX, marginY }) {
  const usedCols = Math.min(cols, Math.max(1, count));
  const positions = Array.from({ length: count }, (_, i) => ({
    cx: marginX + (i % usedCols) * stepX,
    cy: marginY + Math.floor(i / usedCols) * stepY
  }));
  const rows = Math.ceil(count / usedCols);
  const viewBox = {
    x: 0,
    y: 0,
    w: marginX + (usedCols - 1) * stepX + marginX,
    h: marginY + (rows - 1) * stepY + marginY
  };
  return { positions, nodeW, nodeH, viewBox };
}

function computeZ1Layout(count) {
  return gridLayout(count, { cols: 5, nodeW: 150, nodeH: 90, stepX: 180, stepY: 180, marginX: 100, marginY: 110 });
}

function computeZ2Layout(count) {
  return gridLayout(count, { cols: 5, nodeW: 130, nodeH: 84, stepX: 150, stepY: 110, marginX: 85, marginY: 70 });
}

/* Pan (mouse drag + 1-prst touch) a zoom (koliesko + pinch) cez SVG
   viewBox – žiadny canvas, žiadna transformačná matica na kontajneri.
   `view` je zdieľaný mutovateľný objekt {x,y,w,h}; `onChange` sa zavolá
   po každej zmene (volajúci si podľa neho prepočíta pozície HTML
   popiskov). destroy() odpojí všetky listenery (volá sa pri prechode
   na inú úroveň mapy, aby sa nehromadili na document). */
function setupPanZoom(svgEl, view, onChange) {
  const minScale = 0.5;
  const maxScale = 3;
  const baseW = view.w;
  const baseH = view.h;

  const applyViewBox = () => svgEl.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
  applyViewBox();

  function svgPointFromClient(clientX, clientY) {
    const rect = svgEl.getBoundingClientRect();
    const px = rect.width ? (clientX - rect.left) / rect.width : 0;
    const py = rect.height ? (clientY - rect.top) / rect.height : 0;
    return { x: view.x + px * view.w, y: view.y + py * view.h };
  }

  function zoomAt(clientX, clientY, factor) {
    const pt = svgPointFromClient(clientX, clientY);
    let newW = view.w * factor;
    let newH = view.h * factor;
    const scale = baseW / newW;
    if (scale < minScale) { newW = baseW / minScale; newH = baseH / minScale; }
    if (scale > maxScale) { newW = baseW / maxScale; newH = baseH / maxScale; }
    view.x = pt.x - (pt.x - view.x) * (newW / view.w);
    view.y = pt.y - (pt.y - view.y) * (newH / view.h);
    view.w = newW;
    view.h = newH;
    applyViewBox();
    onChange();
  }

  function panBy(dxClientPx, dyClientPx) {
    const rect = svgEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    view.x -= dxClientPx * (view.w / rect.width);
    view.y -= dyClientPx * (view.h / rect.height);
    applyViewBox();
    onChange();
  }

  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  const onMouseDown = e => { dragging = true; lastX = e.clientX; lastY = e.clientY; svgEl.style.cursor = 'grabbing'; };
  const onMouseMove = e => {
    if (!dragging) return;
    panBy(e.clientX - lastX, e.clientY - lastY);
    lastX = e.clientX; lastY = e.clientY;
  };
  const onMouseUp = () => { dragging = false; svgEl.style.cursor = 'grab'; };
  const onWheel = e => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY > 0 ? 1.1 : 0.9);
  };

  let touchMode = null; // 'drag' | 'pinch'
  let touchLastX = 0;
  let touchLastY = 0;
  let pinchLastDist = 0;
  const touchDist = (t0, t1) => Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
  const touchMid = (t0, t1) => ({ x: (t0.clientX + t1.clientX) / 2, y: (t0.clientY + t1.clientY) / 2 });

  const onTouchStart = e => {
    if (e.touches.length === 1) {
      touchMode = 'drag';
      touchLastX = e.touches[0].clientX;
      touchLastY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      touchMode = 'pinch';
      pinchLastDist = touchDist(e.touches[0], e.touches[1]);
    }
  };
  const onTouchMove = e => {
    if (touchMode === 'drag' && e.touches.length === 1) {
      e.preventDefault();
      const t = e.touches[0];
      panBy(t.clientX - touchLastX, t.clientY - touchLastY);
      touchLastX = t.clientX; touchLastY = t.clientY;
    } else if (touchMode === 'pinch' && e.touches.length === 2) {
      e.preventDefault();
      const dist = touchDist(e.touches[0], e.touches[1]);
      const mid = touchMid(e.touches[0], e.touches[1]);
      if (pinchLastDist > 0) zoomAt(mid.x, mid.y, pinchLastDist / dist);
      pinchLastDist = dist;
    }
  };
  const onTouchEnd = () => { touchMode = null; pinchLastDist = 0; };

  svgEl.style.cursor = 'grab';
  svgEl.style.touchAction = 'none';

  svgEl.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  svgEl.addEventListener('wheel', onWheel, { passive: false });
  svgEl.addEventListener('touchstart', onTouchStart, { passive: true });
  svgEl.addEventListener('touchmove', onTouchMove, { passive: false });
  svgEl.addEventListener('touchend', onTouchEnd, { passive: true });
  svgEl.addEventListener('touchcancel', onTouchEnd, { passive: true });

  function destroy() {
    svgEl.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    svgEl.removeEventListener('wheel', onWheel);
    svgEl.removeEventListener('touchstart', onTouchStart);
    svgEl.removeEventListener('touchmove', onTouchMove);
    svgEl.removeEventListener('touchend', onTouchEnd);
    svgEl.removeEventListener('touchcancel', onTouchEnd);
  }

  return { destroy };
}

/* Spoločné vykreslenie jednej úrovne mapy (Z1 aj Z2 zdieľajú presne
   tento kód – líšia sa len vo vstupných dátach uzlov). SVG <rect> nesie
   klik/keyboard interakciu, HTML <div> nad ním len popisok (pointer-
   events: none, klik prejde na rect pod ním). */
function renderMapNodes(container, nodesData, viewBox, { rx, ariaLabel, labelLines }) {
  container.innerHTML = `
    <div class="spider-map-host">
      <svg class="spider-map-svg" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}" preserveAspectRatio="none" role="group" aria-label="${escapeHtml(ariaLabel)}"></svg>
      <div class="spider-map-labels"></div>
    </div>`;
  const svg = container.querySelector('.spider-map-svg');
  const labelsHost = container.querySelector('.spider-map-labels');
  const view = { ...viewBox };

  nodesData.forEach(n => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', n.cx - n.w / 2);
    rect.setAttribute('y', n.cy - n.h / 2);
    rect.setAttribute('width', n.w);
    rect.setAttribute('height', n.h);
    rect.setAttribute('rx', rx);
    rect.setAttribute('class', `spider-map-node ${n.colorClass}`);
    rect.setAttribute('tabindex', '0');
    rect.setAttribute('role', 'button');
    rect.setAttribute('aria-label', n.label);
    rect.addEventListener('click', n.onClick);
    rect.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); n.onClick(); } });
    svg.appendChild(rect);

    const label = document.createElement('div');
    label.className = 'spider-map-label';
    label.textContent = n.label;
    label.title = n.label;
    label.style.webkitLineClamp = String(labelLines);
    labelsHost.appendChild(label);
    n.labelEl = label;
  });

  /* Font-size sa počíta z aktuálnej obrazovkovej výšky boxu (ph), nie
     zo statickej CSS hodnoty – text a box tak vždy škálujú spolu, aj
     pri zoome (predtým: box sa so zoomom menil, font nie – pri
     oddialení sa pomer text:box zhoršoval). FONT_RATIO vyladený tak,
     aby pri bežnom (nezoomovanom) zobrazení vyšlo cca 12px. */
  const FONT_RATIO = 0.22;
  const FONT_MIN = 9;
  const FONT_MAX = 16;

  function updateLabels() {
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    nodesData.forEach(n => {
      const px = ((n.cx - view.x) / view.w) * rect.width;
      const py = ((n.cy - view.y) / view.h) * rect.height;
      const pw = (n.w / view.w) * rect.width;
      const ph = (n.h / view.h) * rect.height;
      const fontSize = Math.max(FONT_MIN, Math.min(FONT_MAX, ph * FONT_RATIO));
      n.labelEl.style.left = `${px - pw / 2}px`;
      n.labelEl.style.top = `${py - ph / 2}px`;
      n.labelEl.style.width = `${pw}px`;
      n.labelEl.style.height = `${ph}px`;
      n.labelEl.style.fontSize = `${fontSize}px`;
    });
  }

  const panzoom = setupPanZoom(svg, view, updateLabels);
  updateLabels();

  const resizeObserver = new ResizeObserver(updateLabels);
  resizeObserver.observe(svg);

  return () => { panzoom.destroy(); resizeObserver.disconnect(); };
}

/* Z1: 10 bublín klastrov, farba = poradie v clusters[] (c0..c9).
   Vracia destroy() funkciu (pan/zoom + resize listenery). */
function renderZ1(container, mapData, onClusterClick) {
  ensureSpiderMapCss();
  const clusters = mapData.clusters;
  const layout = computeZ1Layout(clusters.length);
  const nodesData = clusters.map((cl, i) => ({
    cx: layout.positions[i].cx,
    cy: layout.positions[i].cy,
    w: layout.nodeW,
    h: layout.nodeH,
    label: cl.label,
    colorClass: `spider-map-c${i % 10}`,
    onClick: () => onClusterClick(i)
  }));
  return renderMapNodes(container, nodesData, layout.viewBox, { rx: 20, ariaLabel: 'Mapa klastrov', labelLines: 2 });
}

/* Z2: bubliny okruhov vybraného klastra, zdedená farba klastra.
   Popisok je zo začiatku "A{n}" a dobehnutím fetchOkruhTitle sa
   prepíše na spider.center (fallback title) – progresívne, nezávisle
   pre každý uzol, nič neblokuje počiatočné vykreslenie. */
function renderZ2(container, mapData, clusterIndex, areaTitle, onOkruhClick) {
  ensureSpiderMapCss();
  const cluster = mapData.clusters[clusterIndex];
  const layout = computeZ2Layout(cluster.okruhy.length);
  const colorClass = `spider-map-c${clusterIndex % 10}`;
  const nodesData = cluster.okruhy.map((n, i) => ({
    cx: layout.positions[i].cx,
    cy: layout.positions[i].cy,
    w: layout.nodeW,
    h: layout.nodeH,
    label: `A${n}`,
    colorClass,
    onClick: () => onOkruhClick(n)
  }));
  const destroy = renderMapNodes(container, nodesData, layout.viewBox, { rx: 14, ariaLabel: `Okruhy klastra ${cluster.label}`, labelLines: 3 });
  nodesData.forEach(n => {
    fetchOkruhTitle(n.label, areaTitle).then(title => {
      n.labelEl.textContent = title;
      n.labelEl.title = title;
    });
  });
  return destroy;
}

/* Vstupný bod – nahrádza volanie spider.js openSpiderBrowser() v init.js.
   Stavy: 'areas' → (oblasť má mapu?) → 'flat' (plochý zoznam, dnešné
   správanie) alebo 'z1' (klastre) → 'z2' (okruhy klastra) → Z3 (existujúci
   strom cez openSpider, mimo tohto stavového stroja). Späť ide vždy o
   jednu úroveň: z2→z1, z1→areas, flat→areas. Strom/Mapa je bočný
   prepínač medzi 'flat' a 'z1' (nepočíta sa ako krok späť). */
export function openStructureBrowser() {
  ensureSpiderMapCss();

  const existing = document.getElementById('spiderMapModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'spiderMapModal';
  modal.className = 'avatar-modal';
  document.body.appendChild(modal);
  modal.onclick = e => { if (e.target === modal) closeModal(); };

  const state = { area: null, mapData: null, destroyLevel: null };

  function cleanupLevel() {
    if (state.destroyLevel) { state.destroyLevel(); state.destroyLevel = null; }
  }

  function closeModal() { cleanupLevel(); modal.remove(); }

  async function openOkruhTree(key, areaTitle, keepUnderneath) {
    if (!keepUnderneath) { cleanupLevel(); modal.remove(); }
    try {
      const m = await import('./spider.js');
      await m.openSpider(key, areaTitle);
    } catch (e) { console.error('spiderMap: openSpider load failed', e); }
  }

  function renderAreas() {
    cleanupLevel();
    state.mapData = null;
    const items = Object.keys(AREA_PATHS).map(area =>
      `<button class="btn" style="width:100%;text-align:left;margin-bottom:6px" data-area="${escapeHtml(area)}">${escapeHtml(area)}</button>`
    ).join('');
    modal.innerHTML = `
      <div class="avatar-panel spider-panel">
        <h3 style="margin:0 0 12px 0">🕸️ Štruktúra otázok – vyber oblasť</h3>
        <div>${items}</div>
        <div style="margin-top:16px">
          <button class="btn" id="spiderMapCloseBtn" style="width:100%">Zavrieť</button>
        </div>
      </div>`;
    modal.querySelectorAll('[data-area]').forEach(btn => {
      btn.onclick = () => selectArea(btn.getAttribute('data-area'));
    });
    modal.querySelector('#spiderMapCloseBtn').onclick = closeModal;
  }

  async function selectArea(area) {
    state.area = area;
    state.mapData = await fetchMapJson(area);
    if (state.mapData) renderZ1Screen();
    else renderFlatScreen();
  }

  function renderFlatScreen() {
    cleanupLevel();
    const count = AREA_COUNTS[state.area] || 0;
    const titles = window.areaOkruhTitles?.[state.area] || {};
    const items = Array.from({ length: count }, (_, i) => {
      const key = `A${i + 1}`;
      const label = titles[key] || key;
      return `<button class="btn" style="width:100%;text-align:left;margin-bottom:6px" data-key="${key}">${escapeHtml(label)}</button>`;
    }).join('');
    const toggle = state.mapData
      ? `<button class="btn" id="spiderMapToggleBtn" style="flex:1">🗺️ Mapa</button>`
      : '';
    modal.innerHTML = `
      <div class="avatar-panel spider-panel">
        <h3 style="margin:0 0 4px 0">🕸️ ${escapeHtml(state.area)}</h3>
        <div class="small muted" style="margin-bottom:10px">Vyber okruh</div>
        <div style="max-height:50vh;overflow-y:auto">${items || '<div class="small muted">Žiadne okruhy.</div>'}</div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button class="btn" id="spiderMapBackBtn" style="flex:1">← Späť</button>
          ${toggle}
          <button class="btn" id="spiderMapCloseBtn" style="flex:1">Zavrieť</button>
        </div>
      </div>`;
    modal.querySelectorAll('[data-key]').forEach(btn => {
      btn.onclick = () => openOkruhTree(btn.getAttribute('data-key'), state.area, false);
    });
    modal.querySelector('#spiderMapBackBtn').onclick = renderAreas;
    modal.querySelector('#spiderMapCloseBtn').onclick = closeModal;
    if (state.mapData) modal.querySelector('#spiderMapToggleBtn').onclick = renderZ1Screen;
  }

  function renderZ1Screen() {
    cleanupLevel();
    modal.innerHTML = `
      <div class="avatar-panel spider-panel">
        <h3 style="margin:0 0 4px 0">🕸️ ${escapeHtml(state.area)} – mapa</h3>
        <div class="small muted" style="margin-bottom:10px">Klik na klaster · ťahaj / koliesko (pinch na mobile) na priblíženie</div>
        <div id="spiderMapZ1Host"></div>
        <div class="spider-map-toolbar" style="margin-top:12px">
          <button class="btn" id="spiderMapBackBtn" style="flex:1">← Späť</button>
          <button class="btn" id="spiderMapListBtn" style="flex:1">📋 Zoznam</button>
          <button class="btn" id="spiderMapCloseBtn" style="flex:1">Zavrieť</button>
        </div>
      </div>`;
    const host = modal.querySelector('#spiderMapZ1Host');
    state.destroyLevel = renderZ1(host, state.mapData, clusterIndex => renderZ2Screen(clusterIndex));
    modal.querySelector('#spiderMapBackBtn').onclick = renderAreas;
    modal.querySelector('#spiderMapListBtn').onclick = renderFlatScreen;
    modal.querySelector('#spiderMapCloseBtn').onclick = closeModal;
  }

  function renderZ2Screen(clusterIndex) {
    cleanupLevel();
    const cluster = state.mapData.clusters[clusterIndex];
    modal.innerHTML = `
      <div class="avatar-panel spider-panel">
        <h3 style="margin:0 0 4px 0">🕸️ ${escapeHtml(cluster.label)}</h3>
        <div class="small muted" style="margin-bottom:10px">Klik na okruh · ťahaj / koliesko (pinch na mobile) na priblíženie</div>
        <div id="spiderMapZ2Host"></div>
        <div class="spider-map-toolbar" style="margin-top:12px">
          <button class="btn" id="spiderMapBackBtn" style="flex:1">← Späť</button>
          <button class="btn" id="spiderMapCloseBtn" style="flex:1">Zavrieť</button>
        </div>
      </div>`;
    const host = modal.querySelector('#spiderMapZ2Host');
    state.destroyLevel = renderZ2(host, state.mapData, clusterIndex, state.area, n => openOkruhTree(`A${n}`, state.area, true));
    modal.querySelector('#spiderMapBackBtn').onclick = renderZ1Screen;
    modal.querySelector('#spiderMapCloseBtn').onclick = closeModal;
  }

  renderAreas();
}
