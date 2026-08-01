'use strict';

/* ============================================================
   scripts/spiderGames.js — 🐦 KUKUČKA (edukačná hra nad stromom okruhu)
   Samostatný modul, nezávislý od spider.js aj spiderMap.js
   (spider.js SA NEDOTÝKA). Volá sa výhradne lazy importom zo
   spiderMap.js (openOkruhTree, keepUnderneath blok) – rovnaký
   containment vzor ako spiderRelated.js. Jediný verejný export je
   startCuckoo(areaTitle, okruhCislo, panel).

   Pravidlá hry: v jednej vetve aktuálneho okruhu je premiešaných
   niekoľko jej vlastných listov + jeden "cudzí" list (kukučka)
   vylosovaný z INÉHO okruhu toho istého klastra (_map.json.clusters).
   Hráč hľadá kukučku. 5 kôl, skóre = počet trafení na prvý pokus.

   AREA_PATHS je DUPLIKOVANÉ (rovnaký vzor ako spider.js/spiderMap.js/
   spiderRelated.js – menší blast radius než zdieľanie cez import;
   existujúce fetch funkcie tam nie sú exportované). Fetch cesta aj tvar
   dát (_map.json {clusters[]}, A{n}.json {spider.branches[].leaves[]})
   sú prevzaté 1:1 z týchto modulov, nič sa nehádalo.

   Žiadny Firebase, žiadny localStorage, žiadny server, žiadny progres –
   rovnako ako spider.js/spiderMap.js ide o nehodnotenú pomôcku. Stav
   sedenia je výlučne v lokálnych premenných closure startCuckoo.

   Farby/štýly: vlastný injektovaný <style> (ensureGameCss), rovnaký
   prístup ako ensureRelatedCss v spiderRelated.js (CSS premenné +
   dark-theme override), nezávislý od spider-map palety.
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

const ROUNDS = 5;

/* Fetch A{n}.json / _map.json – identický vzor ako spider.js
   fetchTopicJson / spiderMap.js fetchMapJson (basePath + key + '.json').
   Vracia parsovaný JSON alebo null (fail-soft, len console.warn). */
async function fetchJson(areaKey, key) {
  const basePath = AREA_PATHS[areaKey];
  if (!basePath) {
    console.warn(`[KUKUČKA] Neznáma areaTitle "${areaKey}", basePath sa nedá určiť.`);
    return null;
  }
  try {
    const res = await fetch(`${basePath}${key}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('[KUKUČKA] fetch zlyhal:', key, e);
    return null;
  }
}

/* Vetvy okruhu v tvare [{ label, leaves: string[] }] – rovnaká
   normalizácia ako buildBranches v spider.js (filtrovanie prázdnych),
   ale BEZ tiles fallbacku: hra potrebuje reálne listy vo vetvách,
   hviezdica z tiles (leaves=[]) je pre kukučku nepoužiteľná. */
function branchesOf(json) {
  if (json && json.spider && Array.isArray(json.spider.branches)) {
    return json.spider.branches
      .filter(b => b && b.label)
      .map(b => ({ label: b.label, leaves: Array.isArray(b.leaves) ? b.leaves.filter(Boolean) : [] }));
  }
  return [];
}

/* Krátky názov okruhu pre hlášku "patrí do okruhu: ..." – rovnaké
   poradie preferencií ako fetchOkruhTitle v spiderMap.js. */
function okruhTitleOf(json, n) {
  return (json && (json.title || json.spider?.center)) || `A${n}`;
}

function randOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Fisher–Yates (nemutuje vstup). */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function ensureGameCss() {
  if (document.getElementById('spider-games-css')) return;
  const style = document.createElement('style');
  style.id = 'spider-games-css';
  style.textContent = `
    .spiderGameSec { margin-top: 12px; }
    .spider-game-header { font-size: 14px; font-weight: 700; color: var(--text, #2b2b2b); margin-bottom: 4px; }
    .spider-game-hint { font-size: 12px; color: var(--muted, #6b7280); margin-bottom: 10px; }
    .spider-game-cards { display: flex; flex-direction: column; gap: 8px; }
    .spider-game-card {
      display: block; width: 100%; text-align: left; box-sizing: border-box;
      background: var(--surface, #fff); border: 1px solid var(--card-border, rgba(0,0,0,0.12));
      border-radius: 10px; padding: 10px 12px; font: inherit; font-size: 12px; line-height: 1.35;
      color: var(--text, #2b2b2b); cursor: pointer; min-height: 44px; max-height: 7em; overflow: auto;
    }
    .spider-game-card:hover:not(:disabled) { border-color: var(--accent-3, #ff6f91); }
    .spider-game-card:disabled { cursor: default; }
    .spider-game-card-correct { background: #d7f4dd; border-color: #38a169; }
    .spider-game-card-cuckoo { background: #d7f4dd; border-color: #38a169; box-shadow: 0 0 0 2px rgba(56,161,105,0.4); }
    .spider-game-card-wrong { background: #fbdce0; border-color: #e15563; }
    .spider-game-card-locked { opacity: 0.55; }
    .spider-game-feedback { font-size: 12px; margin-top: 10px; min-height: 1.2em; }
    .spider-game-feedback-ok { color: #2f855a; font-weight: 600; }
    .spider-game-feedback-bad { color: #c53030; font-weight: 600; }
    .spider-game-nextwrap { margin-top: 10px; }
    .spider-game-endbtn { margin-top: 8px; }
    .spider-game-score { font-size: 22px; font-weight: 800; color: var(--accent-3, #ff6f91); margin: 6px 0 12px; }
    .spider-game-loading { font-size: 12px; color: var(--muted, #6b7280); padding: 10px 0; }
    .spider-game-error { font-size: 12px; color: #c53030; padding: 8px 0; }
    :root[data-theme="dark"] .spider-game-header { color: var(--text, #e6eef6); }
    :root[data-theme="dark"] .spider-game-card { background: var(--surface, #1c2430); border-color: rgba(255,255,255,0.12); color: var(--text, #e6eef6); }
    :root[data-theme="dark"] .spider-game-card-correct { background: #1f4a38; border-color: #38a169; }
    :root[data-theme="dark"] .spider-game-card-cuckoo { background: #1f4a38; border-color: #38a169; }
    :root[data-theme="dark"] .spider-game-card-wrong { background: #5a2c3a; border-color: #e15563; }
  `;
  document.head.appendChild(style);
}

/* Jediný verejný vstup. panel = .avatar-panel Z3 modalu (spiderMap ho
   odovzdáva). Počas hry sa #spiderTreeHost a #spiderDetailHost skryjú a
   po ukončení/návrate obnovia. Všetok stav ostáva v tejto closure. */
export async function startCuckoo(areaTitle, okruhCislo, panel) {
  if (!panel) return;
  ensureGameCss();

  let sec = panel.querySelector('.spiderGameSec');
  if (!sec) {
    sec = document.createElement('div');
    sec.className = 'spiderGameSec';
    panel.appendChild(sec);
  }

  const treeHost = document.getElementById('spiderTreeHost');
  const detailHost = document.getElementById('spiderDetailHost');
  const prevTreeDisplay = treeHost ? treeHost.style.display : '';
  const prevDetailDisplay = detailHost ? detailHost.style.display : '';

  const okruhCache = new Map(); // n(number) -> { branches, title }
  let candidates = [];          // čísla iných okruhov v klastri
  let currentBranches = [];     // vetvy aktuálneho okruhu
  let session = null;

  function hideTree() {
    if (treeHost) treeHost.style.display = 'none';
    if (detailHost) detailHost.style.display = 'none';
  }
  function restoreTree() {
    if (treeHost) treeHost.style.display = prevTreeDisplay;
    if (detailHost) detailHost.style.display = prevDetailDisplay;
  }

  async function getOkruh(n) {
    if (okruhCache.has(n)) return okruhCache.get(n);
    const json = await fetchJson(areaTitle, `A${n}`);
    const entry = { branches: branchesOf(json), title: okruhTitleOf(json, n) };
    okruhCache.set(n, entry);
    return entry;
  }

  function showError(msg) {
    restoreTree();
    sec.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'spider-game-error';
    box.textContent = msg;
    const back = document.createElement('button');
    back.className = 'btn';
    back.style.width = '100%';
    back.style.marginTop = '10px';
    back.textContent = '← Späť na strom';
    back.onclick = () => renderLauncher();
    sec.append(box, back);
  }

  function renderLauncher() {
    restoreTree();
    sec.innerHTML = '';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.width = '100%';
    btn.style.marginTop = '10px';
    btn.textContent = '🐦 Kukučka';
    btn.onclick = () => startSession();
    sec.appendChild(btn);
  }

  /* Zostaví jedno kolo: cieľová vetva (>=3 listy, fallback >=2) + kukučka
     z iného okruhu klastra. Dedup: text kukučky sa nesmie presne zhodovať
     so žiadnym listom cieľovej vetvy (do 10 pokusov na okruh, potom iný
     zdrojový okruh; každý kandidát sa skúsi najviac raz). */
  async function buildRound() {
    const branch = randOf(session.pool);
    const tried = new Set();
    let guard = 0;
    const maxOkruhTries = candidates.length + 2;

    while (guard < maxOkruhTries) {
      guard++;
      const remaining = candidates.filter(c => !tried.has(c));
      if (!remaining.length) break;
      const srcN = randOf(remaining);
      tried.add(srcN);

      const src = await getOkruh(srcN);
      const srcPool = src.branches.filter(b => b.leaves.length > 0);
      if (!srcPool.length) continue;

      for (let t = 0; t < 10; t++) {
        const srcBranch = randOf(srcPool);
        const cuckoo = randOf(srcBranch.leaves);
        if (!branch.leaves.includes(cuckoo)) {
          return {
            branchLabel: branch.label,
            cuckooText: cuckoo,
            cuckooOkruhTitle: src.title,
            cards: shuffle(branch.leaves.concat([cuckoo]))
          };
        }
      }
    }
    return null;
  }

  function renderRound(round) {
    hideTree();
    sec.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'spider-game-header';
    header.textContent = `Kolo ${session.round}/${ROUNDS} · ${round.branchLabel}`;

    const hint = document.createElement('div');
    hint.className = 'spider-game-hint';
    hint.textContent = 'Ktorý list do tejto vetvy NEPATRÍ? (kukučka z iného okruhu)';

    const cardsWrap = document.createElement('div');
    cardsWrap.className = 'spider-game-cards';

    const feedback = document.createElement('div');
    feedback.className = 'spider-game-feedback';

    const nextWrap = document.createElement('div');
    nextWrap.className = 'spider-game-nextwrap';

    let roundDone = false;
    let wrongCount = 0;

    function finishRound(firstTry) {
      roundDone = true;
      if (firstTry) session.correctFirstTry++;
      cardsWrap.querySelectorAll('.spider-game-card').forEach(c => {
        c.disabled = true;
        if (c.getAttribute('data-cuckoo') !== '1') c.classList.add('spider-game-card-locked');
      });
      const cuckooCard = cardsWrap.querySelector('[data-cuckoo="1"]');
      if (cuckooCard) cuckooCard.classList.add('spider-game-card-cuckoo');
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn';
      nextBtn.style.width = '100%';
      nextBtn.textContent = session.round >= ROUNDS ? 'Zobraziť výsledok →' : 'Ďalšie kolo →';
      nextBtn.onclick = () => nextRound();
      nextWrap.appendChild(nextBtn);
    }

    round.cards.forEach(text => {
      const isCuckoo = text === round.cuckooText;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'spider-game-card';
      if (isCuckoo) card.setAttribute('data-cuckoo', '1');
      card.textContent = text;
      card.onclick = () => {
        if (roundDone) return;
        if (isCuckoo) {
          card.classList.add('spider-game-card-correct');
          feedback.className = 'spider-game-feedback spider-game-feedback-ok';
          feedback.textContent = wrongCount === 0
            ? '✓ Správne! Kukučka odhalená na prvý pokus.'
            : '✓ Správne, to je kukučka.';
          finishRound(wrongCount === 0);
        } else {
          wrongCount++;
          card.classList.add('spider-game-card-wrong');
          card.disabled = true;
          if (wrongCount >= 2) {
            feedback.className = 'spider-game-feedback spider-game-feedback-bad';
            feedback.textContent = `✗ Tento list patrí do okruhu: ${round.cuckooOkruhTitle}`;
            finishRound(false);
          } else {
            feedback.className = 'spider-game-feedback spider-game-feedback-bad';
            feedback.textContent = '✗ Tento list do vetvy patrí. Skús ešte raz (ostáva 1 pokus).';
          }
        }
      };
      cardsWrap.appendChild(card);
    });

    const endBtn = document.createElement('button');
    endBtn.className = 'btn spider-game-endbtn';
    endBtn.style.width = '100%';
    endBtn.textContent = 'Ukončiť hru';
    endBtn.onclick = () => renderLauncher();

    sec.append(header, hint, cardsWrap, feedback, nextWrap, endBtn);
  }

  function renderSessionEnd() {
    hideTree();
    sec.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'spider-game-header';
    header.textContent = 'Koniec hry 🐦';
    const score = document.createElement('div');
    score.className = 'spider-game-score';
    score.textContent = `${session.correctFirstTry}/${ROUNDS} na prvý pokus`;

    const again = document.createElement('button');
    again.className = 'btn';
    again.style.width = '100%';
    again.textContent = '↻ Hrať znova';
    again.onclick = () => startSession();

    const back = document.createElement('button');
    back.className = 'btn';
    back.style.width = '100%';
    back.style.marginTop = '8px';
    back.textContent = '← Späť na strom';
    back.onclick = () => renderLauncher();

    sec.append(header, score, again, back);
  }

  async function nextRound() {
    session.round++;
    if (session.round > ROUNDS) { renderSessionEnd(); return; }
    hideTree();
    sec.innerHTML = '<div class="spider-game-loading">Pripravujem kolo…</div>';
    const round = await buildRound();
    if (!round) { showError('Nepodarilo sa pripraviť kolo (nedostatok dát v klastri).'); return; }
    renderRound(round);
  }

  async function startSession() {
    hideTree();
    sec.innerHTML = '<div class="spider-game-loading">Načítavam hru…</div>';

    if (!candidates.length || !currentBranches.length) {
      const map = await fetchJson(areaTitle, '_map');
      if (!map || !Array.isArray(map.clusters)) {
        showError('Nepodarilo sa načítať mapu okruhov (_map.json).');
        return;
      }
      const cluster = map.clusters.find(cl =>
        Array.isArray(cl.okruhy) && cl.okruhy.map(Number).includes(Number(okruhCislo)));
      if (!cluster) {
        showError('Tento okruh nie je v žiadnom klastri – hra nie je dostupná.');
        return;
      }
      candidates = cluster.okruhy.map(Number).filter(x => x !== Number(okruhCislo));
      if (!candidates.length) {
        showError('Klaster nemá iný okruh, z ktorého by sa dala vylosovať kukučka.');
        return;
      }
      const cur = await getOkruh(Number(okruhCislo));
      currentBranches = cur.branches;
      if (!currentBranches.length) {
        showError('Tento okruh nemá dáta stromu pre hru.');
        return;
      }
    }

    let pool = currentBranches.filter(b => b.leaves.length >= 3);
    if (!pool.length) pool = currentBranches.filter(b => b.leaves.length >= 2);
    if (!pool.length) {
      showError('Tento okruh nemá vetvu s dostatkom listov pre hru.');
      return;
    }

    session = { round: 0, correctFirstTry: 0, pool };
    await nextRound();
  }

  await startSession();
}
