'use strict';

/* ============================================================
   scripts/spiderGames.js — HRY V STROME OKRUHU (edukačné, nehodnotené)
   Samostatný modul, nezávislý od spider.js aj spiderMap.js
   (spider.js SA NEDOTÝKA). Volá sa výhradne lazy importom zo
   spiderMap.js (openOkruhTree, keepUnderneath blok) – rovnaký
   containment vzor ako spiderRelated.js.

   Verejné exporty:
     - mountLauncher(panel, areaTitle, okruhCislo) – vykreslí sekciu
       .spiderGameSec s tlačidlami hier; JEDINÝ vstup zo spiderMap.js.
       Pribúdanie hier už spiderMap.js patch nemení – len tento modul.
     - startCuckoo(areaTitle, okruhCislo, panel) – ostáva exportovaná
       (spätná kompatibilita), funkčne identická s v1, len čerpá zo
       zdieľaných helperov.

   Hry:
     🐦 Kukučka     – v jednej vetve okruhu je premiešaných niekoľko jej
                      listov + 1 cudzí list (z iného okruhu klastra);
                      hráč hľadá cudzí. Skóre = trafenia na prvý pokus.
     🧩 Rozpárovanie – listy z DVOCH vetiev toho istého okruhu sú
                      zmiešané; hráč každý list priradí do správnej
                      vetvy (klik-list → klik-vetva). Skóre = kolá bez
                      chyby.

   AREA_PATHS je DUPLIKOVANÉ (rovnaký vzor ako spider.js/spiderMap.js/
   spiderRelated.js – menší blast radius než zdieľanie cez import;
   existujúce fetch funkcie tam nie sú exportované). Fetch cesta aj tvar
   dát (_map.json {clusters[]}, A{n}.json {spider.branches[].leaves[]})
   sú prevzaté 1:1 z týchto modulov, nič sa nehádalo.

   Žiadny Firebase, žiadny localStorage, žiadny server, žiadny progres –
   rovnako ako spider.js/spiderMap.js ide o nehodnotenú pomôcku. Stav
   sedenia je výlučne v lokálnych premenných closure jednotlivých hier;
   jediný pretrvávajúci stav je okruhCache (memoizácia fetchu okruhov).

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

/* ---- zdieľané dátové utility (module-scope) --------------------------- */

/* Fetch A{n}.json / _map.json – identický vzor ako spider.js
   fetchTopicJson / spiderMap.js fetchMapJson (basePath + key + '.json').
   Vracia parsovaný JSON alebo null (fail-soft, len console.warn). */
async function fetchJson(areaKey, key) {
  const basePath = AREA_PATHS[areaKey];
  if (!basePath) {
    console.warn(`[HRY] Neznáma areaTitle "${areaKey}", basePath sa nedá určiť.`);
    return null;
  }
  try {
    const res = await fetch(`${basePath}${key}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('[HRY] fetch zlyhal:', key, e);
    return null;
  }
}

/* Vetvy okruhu v tvare [{ label, leaves: string[] }] – rovnaká
   normalizácia ako buildBranches v spider.js (filtrovanie prázdnych),
   ale BEZ tiles fallbacku: hry potrebujú reálne listy vo vetvách,
   hviezdica z tiles (leaves=[]) je nepoužiteľná. */
function branchesOf(json) {
  if (json && json.spider && Array.isArray(json.spider.branches)) {
    return json.spider.branches
      .filter(b => b && b.label)
      .map(b => ({ label: b.label, leaves: Array.isArray(b.leaves) ? b.leaves.filter(Boolean) : [] }));
  }
  return [];
}

/* Krátky názov okruhu pre hlášku "patrí do okruhu: ..." (Kukučka) –
   rovnaké poradie preferencií ako fetchOkruhTitle v spiderMap.js. */
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

/* Memoizácia okruhov naprieč hrami aj okruhmi (prežije medzi sedeniami
   v tej istej relácii). Kľúč `${areaTitle}:${n}` – rôzne oblasti majú
   vlastné A{n}.json. */
const okruhCache = new Map(); // `${areaTitle}:${n}` -> { branches, title }
async function getOkruh(areaTitle, n) {
  const cacheKey = `${areaTitle}:${n}`;
  if (okruhCache.has(cacheKey)) return okruhCache.get(cacheKey);
  const json = await fetchJson(areaTitle, `A${n}`);
  const entry = { branches: branchesOf(json), title: okruhTitleOf(json, n) };
  okruhCache.set(cacheKey, entry);
  return entry;
}

/* ---- zdieľaný UI skelet (module-scope) ------------------------------- */

/* #spiderTreeHost / #spiderDetailHost patria spider.js Z3 modalu. Počas
   hry sa skryjú, po návrate obnovia. Obnova nastavuje display='' (default
   viditeľný) namiesto pamätania predošlej hodnoty – tieto hosty sú mimo
   hry vždy viditeľné a inline display na nich spider.js nenastavuje,
   takže '' je korektné a odolné voči opakovaným mountom (žiadne riziko
   "zapamätania" hodnoty 'none' z prebiehajúcej hry). */
function hideTree() {
  const t = document.getElementById('spiderTreeHost');
  const d = document.getElementById('spiderDetailHost');
  if (t) t.style.display = 'none';
  if (d) d.style.display = 'none';
}
function restoreTree() {
  const t = document.getElementById('spiderTreeHost');
  const d = document.getElementById('spiderDetailHost');
  if (t) t.style.display = '';
  if (d) d.style.display = '';
}

/* Idempotentné rozlíšenie sekcie hry v paneli. */
function resolveSec(panel) {
  let sec = panel.querySelector('.spiderGameSec');
  if (!sec) {
    sec = document.createElement('div');
    sec.className = 'spiderGameSec';
    panel.appendChild(sec);
  }
  return sec;
}

/* Chybová obrazovka – obnoví strom a ponúkne návrat cez onBack
   (spravidla mountLauncher). */
function showError(sec, msg, onBack) {
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
  back.onclick = onBack;
  sec.append(box, back);
}

/* Spoločný koniec sedenia – text výsledku aj oba callbacky sú
   parametrizované, takže ho zdieľajú obe hry. */
function renderSessionEnd(sec, { title, scoreText, onAgain, onBack }) {
  hideTree();
  sec.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'spider-game-header';
  header.textContent = title;
  const score = document.createElement('div');
  score.className = 'spider-game-score';
  score.textContent = scoreText;

  const again = document.createElement('button');
  again.className = 'btn';
  again.style.width = '100%';
  again.textContent = '↻ Hrať znova';
  again.onclick = onAgain;

  const back = document.createElement('button');
  back.className = 'btn';
  back.style.width = '100%';
  back.style.marginTop = '8px';
  back.textContent = '← Späť na strom';
  back.onclick = onBack;

  sec.append(header, score, again, back);
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
    /* --- Rozpárovanie --- */
    .spider-game-bins { display: flex; gap: 10px; margin-bottom: 12px; }
    .spider-game-bin { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
    .spider-game-col {
      width: 100%; box-sizing: border-box; text-align: center; font: inherit; font-size: 12px; font-weight: 700;
      padding: 8px 10px; border-radius: 10px; cursor: pointer; overflow-wrap: break-word;
      background: var(--surface, #fff); border: 1px solid var(--card-border, rgba(0,0,0,0.12)); color: var(--text, #2b2b2b);
    }
    .spider-game-col:hover { border-color: var(--accent-3, #ff6f91); }
    .spider-game-slot {
      display: flex; flex-direction: column; gap: 6px; min-height: 44px; padding: 6px;
      border: 1px dashed var(--card-border, rgba(0,0,0,0.18)); border-radius: 10px;
    }
    .spider-game-card-selected { border-color: var(--accent-3, #ff6f91); box-shadow: 0 0 0 2px rgba(255,111,145,0.45); }
    .spider-game-card-assigned {
      background: #d7f4dd; border-color: #38a169; font-size: 11px; padding: 6px 8px;
      min-height: 0; max-height: none; opacity: 1; cursor: default;
    }
    .spider-game-card-wrong-blink { background: #fbdce0; border-color: #e15563; }
    :root[data-theme="dark"] .spider-game-header { color: var(--text, #e6eef6); }
    :root[data-theme="dark"] .spider-game-card { background: var(--surface, #1c2430); border-color: rgba(255,255,255,0.12); color: var(--text, #e6eef6); }
    :root[data-theme="dark"] .spider-game-card-correct { background: #1f4a38; border-color: #38a169; }
    :root[data-theme="dark"] .spider-game-card-cuckoo { background: #1f4a38; border-color: #38a169; }
    :root[data-theme="dark"] .spider-game-card-wrong { background: #5a2c3a; border-color: #e15563; }
    :root[data-theme="dark"] .spider-game-col { background: var(--surface, #1c2430); border-color: rgba(255,255,255,0.12); color: var(--text, #e6eef6); }
    :root[data-theme="dark"] .spider-game-slot { border-color: rgba(255,255,255,0.18); }
    :root[data-theme="dark"] .spider-game-card-assigned { background: #1f4a38; border-color: #38a169; }
    :root[data-theme="dark"] .spider-game-card-wrong-blink { background: #5a2c3a; border-color: #e15563; }
  `;
  document.head.appendChild(style);
}

/* ---- launcher (jediný vstup zo spiderMap.js) ------------------------- */

/* Idempotentne (starú .spiderGameSec zmaže) vykreslí sekciu hier s
   tlačidlami. Všetky návraty z hier volajú túto funkciu späť. */
export function mountLauncher(panel, areaTitle, okruhCislo) {
  if (!panel) return;
  ensureGameCss();
  const existing = panel.querySelector('.spiderGameSec');
  if (existing) existing.remove();
  const sec = document.createElement('div');
  sec.className = 'spiderGameSec';
  panel.appendChild(sec);
  restoreTree();

  const cuckooBtn = document.createElement('button');
  cuckooBtn.className = 'btn';
  cuckooBtn.style.width = '100%';
  cuckooBtn.style.marginTop = '10px';
  cuckooBtn.textContent = '🐦 Kukučka';
  cuckooBtn.onclick = () => startCuckoo(areaTitle, okruhCislo, panel);

  const rozBtn = document.createElement('button');
  rozBtn.className = 'btn';
  rozBtn.style.width = '100%';
  rozBtn.style.marginTop = '8px';
  rozBtn.textContent = '🧩 Rozpárovanie';
  rozBtn.onclick = () => startRozparovanie(areaTitle, okruhCislo, panel);

  sec.append(cuckooBtn, rozBtn);
}

/* ---- Hra 1: Kukučka -------------------------------------------------- */

/* Ostáva exportovaná (spätná kompatibilita) a funkčne identická s v1 –
   len čerpá zo zdieľaných helperov a návraty smerujú na mountLauncher. */
export async function startCuckoo(areaTitle, okruhCislo, panel) {
  if (!panel) return;
  ensureGameCss();
  const sec = resolveSec(panel);
  const backToLauncher = () => mountLauncher(panel, areaTitle, okruhCislo);

  let candidates = [];      // čísla iných okruhov v klastri
  let currentBranches = []; // vetvy aktuálneho okruhu
  let session = null;

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

      const src = await getOkruh(areaTitle, srcN);
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
    endBtn.onclick = backToLauncher;

    sec.append(header, hint, cardsWrap, feedback, nextWrap, endBtn);
  }

  async function nextRound() {
    session.round++;
    if (session.round > ROUNDS) {
      renderSessionEnd(sec, {
        title: 'Koniec hry 🐦',
        scoreText: `${session.correctFirstTry}/${ROUNDS} na prvý pokus`,
        onAgain: () => startSession(),
        onBack: backToLauncher
      });
      return;
    }
    hideTree();
    sec.innerHTML = '<div class="spider-game-loading">Pripravujem kolo…</div>';
    const round = await buildRound();
    if (!round) { showError(sec, 'Nepodarilo sa pripraviť kolo (nedostatok dát v klastri).', backToLauncher); return; }
    renderRound(round);
  }

  async function startSession() {
    hideTree();
    sec.innerHTML = '<div class="spider-game-loading">Načítavam hru…</div>';

    if (!candidates.length || !currentBranches.length) {
      const map = await fetchJson(areaTitle, '_map');
      if (!map || !Array.isArray(map.clusters)) {
        showError(sec, 'Nepodarilo sa načítať mapu okruhov (_map.json).', backToLauncher);
        return;
      }
      const cluster = map.clusters.find(cl =>
        Array.isArray(cl.okruhy) && cl.okruhy.map(Number).includes(Number(okruhCislo)));
      if (!cluster) {
        showError(sec, 'Tento okruh nie je v žiadnom klastri – hra nie je dostupná.', backToLauncher);
        return;
      }
      candidates = cluster.okruhy.map(Number).filter(x => x !== Number(okruhCislo));
      if (!candidates.length) {
        showError(sec, 'Klaster nemá iný okruh, z ktorého by sa dala vylosovať kukučka.', backToLauncher);
        return;
      }
      const cur = await getOkruh(areaTitle, Number(okruhCislo));
      currentBranches = cur.branches;
      if (!currentBranches.length) {
        showError(sec, 'Tento okruh nemá dáta stromu pre hru.', backToLauncher);
        return;
      }
    }

    let pool = currentBranches.filter(b => b.leaves.length >= 3);
    if (!pool.length) pool = currentBranches.filter(b => b.leaves.length >= 2);
    if (!pool.length) {
      showError(sec, 'Tento okruh nemá vetvu s dostatkom listov pre hru.', backToLauncher);
      return;
    }

    session = { round: 0, correctFirstTry: 0, pool };
    await nextRound();
  }

  await startSession();
}

/* ---- Hra 2: Rozpárovanie -------------------------------------------- */

/* Interná (volaná z mountLauncher). Priradenie listov dvoch zmiešaných
   vetiev toho istého okruhu do správnych košov (klik-list → klik-vetva).
   Skóre = kolá bez chyby. */
function startRozparovanie(areaTitle, okruhCislo, panel) {
  if (!panel) return;
  ensureGameCss();
  const sec = resolveSec(panel);
  const backToLauncher = () => mountLauncher(panel, areaTitle, okruhCislo);

  const MAX_PER_BRANCH = 4;
  let eligible = [];   // [{ b, i }] vetvy s >=2 listami
  let session = null;

  const pairKey = (i, j) => (i < j ? `${i}-${j}` : `${j}-${i}`);
  const pickLeaves = branch => shuffle(branch.leaves).slice(0, Math.min(MAX_PER_BRANCH, branch.leaves.length));

  /* Vyberie 2 rôzne vetvy (preferuje nepoužitú dvojicu v rámci sedenia)
     a z každej max. MAX_PER_BRANCH náhodných listov. Dedup: žiadny
     vybraný text sa nesmie vyskytovať v oboch výberoch (do 10 pokusov na
     dvojicu). Vráti null, ak sa nepodarí (fail-soft → showError). */
  function buildRound() {
    if (eligible.length < 2) return null;

    const pairs = [];
    for (let a = 0; a < eligible.length; a++) {
      for (let b = a + 1; b < eligible.length; b++) {
        pairs.push([eligible[a], eligible[b]]);
      }
    }
    const unused = pairs.filter(p => !session.usedPairs.has(pairKey(p[0].i, p[1].i)));
    const order = shuffle(unused.length ? unused : pairs);

    for (const [x, y] of order) {
      for (let attempt = 0; attempt < 10; attempt++) {
        const la = pickLeaves(x.b);
        const lb = pickLeaves(y.b);
        const setB = new Set(lb);
        const overlap = la.some(txt => setB.has(txt));
        if (!overlap) {
          const key = pairKey(x.i, y.i);
          session.usedPairs.add(key);
          const cards = shuffle(
            la.map(text => ({ text, bin: 0 })).concat(lb.map(text => ({ text, bin: 1 })))
          );
          return { labels: [x.b.label, y.b.label], cards, pairKey: key };
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
    header.textContent = `Kolo ${session.round}/${ROUNDS}`;

    const hint = document.createElement('div');
    hint.className = 'spider-game-hint';
    hint.textContent = 'Klikni na list, potom na vetvu, kam patrí.';

    const feedback = document.createElement('div');
    feedback.className = 'spider-game-feedback';

    const nextWrap = document.createElement('div');
    nextWrap.className = 'spider-game-nextwrap';

    let selectedCard = null;
    let remaining = round.cards.length;
    let chyba = false;
    let roundDone = false;

    function clearSelection() {
      if (selectedCard) selectedCard.classList.remove('spider-game-card-selected');
      selectedCard = null;
    }

    function selectCard(card) {
      if (roundDone || card.disabled) return;
      if (selectedCard === card) { clearSelection(); return; }
      clearSelection();
      selectedCard = card;
      card.classList.add('spider-game-card-selected');
    }

    /* Koše (2) + ich sloty. */
    const binsWrap = document.createElement('div');
    binsWrap.className = 'spider-game-bins';
    const slots = [];
    round.labels.forEach((label, binIdx) => {
      const bin = document.createElement('div');
      bin.className = 'spider-game-bin';
      const col = document.createElement('button');
      col.type = 'button';
      col.className = 'spider-game-col';
      col.textContent = label;
      col.onclick = () => assign(binIdx);
      const slot = document.createElement('div');
      slot.className = 'spider-game-slot';
      slots[binIdx] = slot;
      bin.append(col, slot);
      binsWrap.appendChild(bin);
    });

    /* Balík nepriradených kariet. */
    const deck = document.createElement('div');
    deck.className = 'spider-game-cards';
    round.cards.forEach(c => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'spider-game-card';
      card.dataset.bin = String(c.bin);
      card.textContent = c.text;
      card.onclick = () => selectCard(card);
      deck.appendChild(card);
    });

    function finishRound() {
      roundDone = true;
      if (!chyba) session.cleanRounds++;
      feedback.className = 'spider-game-feedback ' + (chyba ? 'spider-game-feedback-bad' : 'spider-game-feedback-ok');
      feedback.textContent = chyba ? '✗ Dokončené s chybami' : '✓ Bez jedinej chyby';
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn';
      nextBtn.style.width = '100%';
      nextBtn.textContent = session.round >= ROUNDS ? 'Zobraziť výsledok →' : 'Ďalšie kolo →';
      nextBtn.onclick = () => nextRound();
      nextWrap.appendChild(nextBtn);
    }

    function assign(binIdx) {
      if (roundDone || !selectedCard) return; // klik na kôš bez výberu = no-op
      const card = selectedCard;
      const cardBin = Number(card.dataset.bin);
      if (cardBin === binIdx) {
        clearSelection();
        card.disabled = true;
        card.classList.remove('spider-game-card-selected');
        card.classList.add('spider-game-card-assigned');
        slots[binIdx].appendChild(card);
        remaining--;
        if (remaining === 0) finishRound();
      } else {
        card.classList.add('spider-game-card-wrong-blink');
        setTimeout(() => card.classList.remove('spider-game-card-wrong-blink'), 500);
        chyba = true;
        clearSelection();
      }
    }

    const endBtn = document.createElement('button');
    endBtn.className = 'btn spider-game-endbtn';
    endBtn.style.width = '100%';
    endBtn.textContent = 'Ukončiť hru';
    endBtn.onclick = backToLauncher;

    sec.append(header, hint, binsWrap, deck, feedback, nextWrap, endBtn);
  }

  function nextRound() {
    session.round++;
    if (session.round > ROUNDS) {
      renderSessionEnd(sec, {
        title: 'Koniec hry 🧩',
        scoreText: `${session.cleanRounds}/${ROUNDS} bez chyby`,
        onAgain: () => startSession(),
        onBack: backToLauncher
      });
      return;
    }
    const round = buildRound();
    if (!round) { showError(sec, 'Nepodarilo sa pripraviť kolo (nedostatok vhodných vetiev).', backToLauncher); return; }
    renderRound(round);
  }

  async function startSession() {
    hideTree();
    sec.innerHTML = '<div class="spider-game-loading">Načítavam hru…</div>';

    if (!eligible.length) {
      const cur = await getOkruh(areaTitle, Number(okruhCislo));
      eligible = cur.branches
        .map((b, i) => ({ b, i }))
        .filter(x => x.b.leaves.length >= 2);
    }
    if (eligible.length < 2) {
      showError(sec, 'Tento okruh nemá aspoň 2 vetvy s dostatkom listov pre Rozpárovanie.', backToLauncher);
      return;
    }

    session = { round: 0, cleanRounds: 0, usedPairs: new Set() };
    nextRound();
  }

  startSession();
}
