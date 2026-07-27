'use strict';

/* ============================================================
   Rešerš judikatúry NS SR – plávajúci panel vpravo dole
   Variant A: kurátorovaný zoznam inštitútov (JUDIKATURA_CONFIG) →
   klik → api/nsud-proxy.js (searchDecision/getDecision) → zoznam
   reálnych rozhodnutí s odkazom na originál. Bez LLM, bez § ceny.

   Poradie výsledkov = NATÍVNE poradie z API (žiadne triedenie podľa
   ID/dátumu – getDecision sa volá až na finálnych ≤15 ID, dátum teda
   ani nie je k dispozícii skôr, než by sa dalo podľa neho triediť).

   ⚠️ position:fixed kolízia: ui.js showRewardToast() používa
   right:20px; bottom:20px; z-index:9999 (transientný, ~2.4s). FAB
   tlačidlo je preto posadené vyššie (bottom:90px na desktope,
   nad .bottom-nav na mobile), aby s ním nesplynulo. z-index panelu
   (8500) je pod toastom (9999) aj pod všetkými fullscreen modalmi
   (9999–10500) – ak sa niektorý z nich otvorí súčasne, prekryje
   panel, čo je žiaduce (modal je vždy nad plávajúcim panelom).
============================================================ */

import { JUDIKATURA_CONFIG } from './judikaturaConfig.js';

const MAX_RESULTS = 15;
const DETAIL_BATCH_SIZE = 4; // pozri fetchDetailsBatched – nsud.sk bolo pri diagnostike nestabilné (502) pod rýchlou záťažou

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

/* =========================
   Retrieval
   ========================= */

async function proxySearch(term) {
  const res = await fetch(`/api/nsud-proxy?action=search&term=${encodeURIComponent(term)}`);
  const json = await res.json().catch(() => null);
  if (!json || !json.ok) throw new Error((json && json.error) || 'Vyhľadávanie zlyhalo.');
  return Array.isArray(json.data) ? json.data : [];
}

async function proxyDetail(id) {
  const res = await fetch(`/api/nsud-proxy?action=detail&id=${encodeURIComponent(id)}`);
  const json = await res.json().catch(() => null);
  if (!json || !json.ok) throw new Error((json && json.error) || 'Detail rozhodnutia zlyhal.');
  return json.data;
}

// AND vnútri skupiny: pole PRVÉHO termu (zachová jeho poradie) sa
// filtruje podľa množín zvyšných termov skupiny. Skupina s jedným
// termom vráti pole prvého termu bezo zmeny (žiadne ostatné množiny
// na filtrovanie).
async function resolveGroupIds(group) {
  const termArrays = await Promise.all(group.map(proxySearch));
  const [first, ...rest] = termArrays;
  if (!first) return [];
  const restSets = rest.map(arr => new Set(arr));
  return first.filter(id => restSets.every(set => set.has(id)));
}

// OR medzi skupinami: spojenie v poradí skupín (skupina 1 celá, potom
// skupina 2, ...) + stabilný dedupe (prvý výskyt ID rozhoduje o jeho
// pozícii). Žiadne triedenie podľa ID/dátumu.
async function resolveInstitutIds(config) {
  const groupResults = await Promise.all(config.queryGroups.map(resolveGroupIds));
  const seen = new Set();
  const merged = [];
  for (const group of groupResults) {
    for (const id of group) {
      if (!seen.has(id)) {
        seen.add(id);
        merged.push(id);
      }
    }
  }
  return merged.slice(0, MAX_RESULTS);
}

function buildResultRecord(id, detail) {
  const cislo = detail.cislo || '';
  const slug = cislo.replace(/\//g, '').toLowerCase();
  return {
    id,                              // z hľadania – detail.ID chodí prázdne, NEPOUŽÍVAŤ
    cislo,
    merito: detail.merito || '',
    datum: detail.datum || '',
    kolegium: detail.kolegium != null ? String(detail.kolegium) : '',
    url: slug ? `https://www.nsud.sk/rozhodnutia/${slug}/` : null
  };
}

// getDecision sa volá len pre finálnych ≤15 ID, v malých dávkach
// (nie všetkých naraz) – nsud.sk pri diagnostike pod rýchlou súbežnou
// záťažou občas vrátilo 502. Jedno zlyhané ID sa preskočí (filter),
// nezhodí to zvyšok zoznamu.
async function fetchDetailsBatched(ids) {
  const results = [];
  for (let i = 0; i < ids.length; i += DETAIL_BATCH_SIZE) {
    const batch = ids.slice(i, i + DETAIL_BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(async id => {
      try {
        const detail = await proxyDetail(id);
        return buildResultRecord(id, detail);
      } catch (e) {
        return null;
      }
    }));
    results.push(...batchResults);
  }
  return results.filter(Boolean);
}

async function fetchInstitutResults(institutId) {
  const config = JUDIKATURA_CONFIG.instituty.find(i => i.id === institutId);
  if (!config) throw new Error('Neznámy inštitút.');
  const ids = await resolveInstitutIds(config);
  return fetchDetailsBatched(ids);
}

/* =========================
   UI – plávajúci panel
   ========================= */

const resultsCache = new Map(); // institutId -> results[] (v rámci session, nie je to proxy cache)

function renderInstitutListView(bodyEl) {
  bodyEl.innerHTML = `
    <p class="judikatura-hint">Vyber štátnicový inštitút – appka vytiahne reálne rozhodnutia NS SR.</p>
    <div class="judikatura-list">
      ${JUDIKATURA_CONFIG.instituty.map(i => `
        <button type="button" class="chip judikatura-institut-btn" data-institut="${escapeHtml(i.id)}">
          ${escapeHtml(i.nazov)}
          <span class="judikatura-oblast">${escapeHtml(i.oblast)}</span>
        </button>
      `).join('')}
    </div>
  `;
  bodyEl.querySelectorAll('.judikatura-institut-btn').forEach(btn => {
    btn.addEventListener('click', () => openInstitut(bodyEl, btn.dataset.institut));
  });
}

function renderBackRow(bodyEl, nazov) {
  const row = document.createElement('div');
  row.className = 'judikatura-back-row';
  row.innerHTML = `
    <button type="button" class="btn judikatura-back-btn">← Späť na zoznam</button>
    <span class="judikatura-active-nazov">${escapeHtml(nazov)}</span>
  `;
  row.querySelector('.judikatura-back-btn').addEventListener('click', () => renderInstitutListView(bodyEl));
  bodyEl.appendChild(row);
}

function renderLoadingView(bodyEl, config) {
  bodyEl.innerHTML = '';
  renderBackRow(bodyEl, config.nazov);
  const p = document.createElement('p');
  p.className = 'judikatura-hint';
  p.textContent = 'Načítavam rozhodnutia z NS SR…';
  bodyEl.appendChild(p);
}

function renderErrorView(bodyEl, config, message) {
  bodyEl.innerHTML = '';
  renderBackRow(bodyEl, config.nazov);
  const p = document.createElement('p');
  p.className = 'judikatura-hint judikatura-error';
  p.textContent = message;
  bodyEl.appendChild(p);
}

function renderResultsView(bodyEl, config, results) {
  bodyEl.innerHTML = '';
  renderBackRow(bodyEl, config.nazov);

  if (!results.length) {
    const p = document.createElement('p');
    p.className = 'judikatura-hint';
    p.textContent = 'Žiadne rozhodnutia sa nepodarilo načítať.';
    bodyEl.appendChild(p);
    return;
  }

  const count = document.createElement('p');
  count.className = 'judikatura-hint';
  count.textContent = `Nájdených ${results.length} rozhodnutí (poradie podľa API):`;
  bodyEl.appendChild(count);

  const list = document.createElement('div');
  list.className = 'judikatura-results';
  list.innerHTML = results.map(r => `
    <div class="card judikatura-result-card">
      <div class="judikatura-result-cislo">${escapeHtml(r.cislo || '(bez čísla)')}</div>
      <div class="judikatura-result-merito">${escapeHtml(r.merito || '(bez merita)')}</div>
      <div class="judikatura-result-meta">
        ${r.datum ? `<span>${escapeHtml(r.datum)}</span>` : ''}
        ${r.kolegium ? `<span>kolégium ${escapeHtml(r.kolegium)}</span>` : ''}
      </div>
      ${r.url ? `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener" class="btn btn-primary judikatura-result-link">Otvoriť rozhodnutie ↗</a>` : ''}
    </div>
  `).join('');
  bodyEl.appendChild(list);
}

async function openInstitut(bodyEl, institutId) {
  const config = JUDIKATURA_CONFIG.instituty.find(i => i.id === institutId);
  if (!config) return;

  if (resultsCache.has(institutId)) {
    renderResultsView(bodyEl, config, resultsCache.get(institutId));
    return;
  }

  renderLoadingView(bodyEl, config);
  try {
    const results = await fetchInstitutResults(institutId);
    resultsCache.set(institutId, results);
    renderResultsView(bodyEl, config, results);
  } catch (e) {
    renderErrorView(bodyEl, config, e.message || 'Načítanie zlyhalo.');
  }
}

function mountJudikaturaWidget() {
  if (document.getElementById('judikaturaWidget')) return; // ochrana pred dvojitým mountom

  const root = document.createElement('div');
  root.id = 'judikaturaWidget';
  root.innerHTML = `
    <button type="button" id="judikaturaFab" aria-label="Judikatúra" title="Judikatúra">⚖️</button>
    <div id="judikaturaPanel" class="judikatura-panel" hidden>
      <div class="judikatura-panel-header">
        <span class="judikatura-panel-title">⚖️ Judikatúra</span>
        <button type="button" id="judikaturaCloseBtn" aria-label="Zavrieť">✕</button>
      </div>
      <div id="judikaturaPanelBody" class="judikatura-panel-body"></div>
    </div>
  `;
  document.body.appendChild(root);

  const fab = document.getElementById('judikaturaFab');
  const panel = document.getElementById('judikaturaPanel');
  const closeBtn = document.getElementById('judikaturaCloseBtn');
  const bodyEl = document.getElementById('judikaturaPanelBody');

  renderInstitutListView(bodyEl);

  fab.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });
  closeBtn.addEventListener('click', () => {
    panel.hidden = true;
  });
}

mountJudikaturaWidget();
