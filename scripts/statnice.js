'use strict';

/* ============================================================
   scripts/statnice.js
   Štátnicová sieň – interaktívna komisia (v3). Podporované oblasti:
   Pracovné právo (jeden bazén, dvojica okruhov A(2k-1)+A(2k)) a
   Občianske právo (DVA oddelené bazény – hmotné + procesné, po
   jednom náhodnom okruhu z každého). Nová oblasť sa pridáva do
   AREA_CONFIG nižšie, bez zásahu do existujúcich oblastí.

   ⚠️ HODNOTENIE JE LOKÁLNE, NIE CEZ CLAUDE API.
   Zadanie žiada dvojkrokové volanie Claude API (Krok A: extrakcia
   kľúčových bodov z `summary`; Krok B: hodnotenie pokrytia odpovede
   voči nim). Statický Vercel hosting (žiadne /api, žiadne miesto pre
   tajný kľúč) to neumožňuje bez buď verejne vystaveného kľúča
   (bezpečnostná chyba) alebo serverless funkcie (appka ju nemá).

   Namiesto tichého obchádzania: extractKeyPoints() nahrádza Krok A
   (parsuje existujúcu sekciu "Kľúčové slová (štátnicové):" v každom
   `summary` – to sú presne tie isté "kľúčové body", ktoré by Claude
   vytiahol, len už vopred pripravené autorkou obsahu) a
   evaluateCoverage() nahrádza Krok B: namiesto porovnania CELÉHO
   textu odpovede s CELÝM summary (staré, príliš doslovné vyhodnotenie)
   sa KAŽDÝ kľúčový bod overuje samostatne cez prítomnosť jeho
   vlastných podstatných slov v odpovedi – parafráza/iné poradie viet
   bodu neuškodí, kým zaznejú jeho nosné pojmy. `incorrect` (vecne zlé
   tvrdenia) lokálne spoľahlivo nevieme rozpoznať – ostáva vždy
   prázdne pole; toto je poctivo priznané obmedzenie substitútu, nie
   niečo, čo appka predstiera, že rieši. Oba výstupy majú presne ten
   istý JSON tvar, aký by vrátilo Claude API, takže reálne API volanie
   sa dá neskôr zapojiť len výmenou tiel týchto dvoch funkcií za fetch().

   Prepis odpovede a poznámky sa NIKDY neukladajú verejne – len
   dočasne v pamäti tejto relácie. Voliteľne sa ukladá len výsledná
   známka + dátum + oblasť do users/{nick}/examResults.
============================================================ */

import { econSpend, econAward, ECONOMY_CONFIG } from './economy.js';
import { getAvatarCatalog, getTalarAvatars, avatarStateSrc } from './avatarCatalog.js';
import { showRewardToast } from '../ui.js';
import { speakText } from '../memoryTrainer.js';
import { normalizeOkruhText, normalizeZdroj } from './contentNormalize.js';
import { renderSource } from './sourceUtil.js';

const LIVE = 'https://www.lexarena.sk/';
const PRACOVNE_DATA_PATH = LIVE + 'LuluLaw duel Pracovné právo/data/';
const PRACOVNE_OKRUH_COUNT = 50; // rovnaký limit ako data.js (A1-A50, A51-53 sa nepoužívajú)
const PROTOTYPE_AREA_NAME = 'Pracovné právo';

const CIVIL_AREA_NAME = 'Občianske právo';
const CIVIL_HMOTNE_PATH = LIVE + 'ob-pravo-app/data/hmotne/';
const CIVIL_HMOTNE_COUNT = 40;
const CIVIL_PROCESNE_PATH = LIVE + 'ob-pravo-app/data/procesne/';
const CIVIL_PROCESNE_COUNT = 45;

/* ============================================================
   REGISTER OBLASTÍ ŠTÁTNICOVEJ SIENE – nová oblasť sa pridáva sem,
   bez zásahu do existujúcich záznamov.
   - mode "pair": JEDEN bazén, dvojica okruhov A(2k-1)+A(2k)
     (rovnaké párovanie ako pojednávania v scripts/duels.js).
   - mode "dual-pool": DVA oddelené bazény, po JEDNOM náhodnom
     okruhu z každého (napr. hmotné + procesné právo).
============================================================ */
const AREA_CONFIG = {
  [PROTOTYPE_AREA_NAME]: {
    mode: 'pair',
    pool: { path: PRACOVNE_DATA_PATH, count: PRACOVNE_OKRUH_COUNT }
  },
  [CIVIL_AREA_NAME]: {
    mode: 'dual-pool',
    pools: [
      { path: CIVIL_HMOTNE_PATH, count: CIVIL_HMOTNE_COUNT, label: 'Hmotné právo' },
      { path: CIVIL_PROCESNE_PATH, count: CIVIL_PROCESNE_COUNT, label: 'Procesné právo' }
    ]
  }
};

const PREP_SECONDS = 5 * 60;
const SILENCE_TIMEOUT_MS = 8000;
const SPEECH_START_FALLBACK_MS = 2000;
const TTS_FALLBACK_MS = 6000; // ak sa onEnd z TTS nespustí (nepodporovaný prehliadač a pod.)
const ON_TOPIC_MIN_THRESHOLD = 15;   // pod týmto = úplne mimo témy (guard proti falošne kladnému skóre)
const MAX_FOLLOWUPS_PER_QUESTION = 2;

function getDb() { return window.db || null; }
function getNick() { return localStorage.getItem('playerNick') || null; }

export function isStatniceAvailable(areaName) {
  return Object.prototype.hasOwnProperty.call(AREA_CONFIG, areaName);
}

/* ============================================================
   VÝBER DVOJICE OKRUHOV (A1+A2, A3+A4, …, A49+A50) – rovnaké
   párovanie ako pojednávania (scripts/duels.js pickQuestions).
============================================================ */

/* ------------------------------------------------------------
   Lokálny tokenizér pre porovnávanie kľúčových bodov (nezávislý
   od memoryTrainer.js – tento súbor porovnáva JEDNOTLIVÉ krátke
   body, nie celé odseky, takže si vystačí s vlastnou jednoduchou
   verziou bez závislosti na inom module).
------------------------------------------------------------ */
const SK_STOPWORDS = new Set([
  'a', 'alebo', 'ale', 'je', 'sa', 'na', 'v', 'vo', 'do', 'z', 'zo', 'za', 'pre', 'ako', 'pri', 'po', 'od',
  'ku', 'k', 's', 'so', 'ktory', 'ktora', 'ktore', 'ktori', 'tento', 'tato', 'toto', 'tieto', 'nie', 'ano',
  'aj', 'uz', 'len', 'iba', 'teda', 'preto', 'ak', 'ci', 'no', 'tak', 'byt', 'bol', 'bola', 'boli', 'ma',
  'maju', 'mat', 'su', 'bude', 'budu', 'ich', 'jej', 'jeho', 'im', 'mu', 'ju', 'ho', 'ten', 'ta', 'to', 'ti', 'tie'
]);
const DIACRITIC_MAP = {
  'á': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'í': 'i', 'ĺ': 'l', 'ľ': 'l',
  'ň': 'n', 'ó': 'o', 'ô': 'o', 'ŕ': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ý': 'y', 'ž': 'z'
};
function stripDiacritics(s) {
  return String(s).split('').map(ch => DIACRITIC_MAP[ch] || ch).join('');
}
function normalizeWords(text) {
  return stripDiacritics(String(text || '').toLowerCase())
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}
function significantWords(text) {
  return normalizeWords(text).filter(w => w.length > 3 && !SK_STOPWORDS.has(w));
}

/* ------------------------------------------------------------
   extractKeyPoints() – lokálny substitút za "Krok A" (Claude API
   extrakcia kľúčových bodov). Každý A*.json má v `summary` sekciu
   "Kľúčové slová (štátnicové):" – presne zoznam bodov, ktoré má
   Claude podľa zadania vytiahnuť, tu už vopred pripravený autorkou
   obsahu. Fallback (ak sekcia chýba): rozdeliť hlavný text na vety.
------------------------------------------------------------ */
function extractKeyPoints(rawSummary, title) {
  const text = String(rawSummary || '');
  const sectionMatch = text.match(/Kľúčové slová[^:]*:\s*\n([\s\S]*?)(?=\n\nZapamätaj si|\n\n$|$)/i);
  if (sectionMatch) {
    const rawLines = sectionMatch[1]
      .split('\n')
      .map(l => l.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean);

    // Niektoré okruhy majú "Kľúčové slová:" ako JEDEN riadok pojmov oddelených
    // bodkočiarkou namiesto odrážky na riadok – bez rozdelenia by z toho vznikol
    // jeden obrovský "bod" namiesto samostatne overiteľných kľúčových bodov.
    const points = [];
    rawLines.forEach(line => {
      const segments = line.split(';').map(s => s.replace(/[.,]\s*$/, '').trim()).filter(Boolean);
      if (segments.length > 1) points.push(...segments);
      else points.push(line.replace(/[.,;]\s*$/, '').trim());
    });
    if (points.length) return points.filter(Boolean);
  }

  const cutMarkers = ['\n\nPríklad:', '\nPríklad:', '\n\nKľúčové slová', '\nKľúčové slová'];
  let cutIdx = text.length;
  for (const m of cutMarkers) {
    const idx = text.indexOf(m);
    if (idx !== -1 && idx < cutIdx) cutIdx = idx;
  }
  const narrative = text.slice(0, cutIdx).trim();
  // Bežné skratky (napr., resp., atď., zák., čl., ods., písm., tzv.) majú bodku,
  // ktorá NIE je koniec vety – bez ochrany by sa veta rozsekla uprostred a bod
  // by pôsobil ako polovičatá, gramaticky rozbitá veta (najmä v doplňujúcej otázke).
  const protectedText = narrative.replace(/\b(napr|resp|atď|atd|zák|čl|ods|písm|tzv|tzn|str|tj)\.(\s)/gi, '$1∎$2');
  const sentences = protectedText
    .split(/(?<=[.!?])\s+/)
    .map(s => s.replace(/∎/g, '.').trim())
    .filter(s => s.length > 25);
  return sentences.length ? sentences.slice(0, 6) : (title ? [title] : []);
}

async function fetchOkruh(basePath, n) {
  try {
    const res = await fetch(`${basePath}A${n}.json`);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !json.title) return null;
    const summaryText = normalizeOkruhText(json);
    if (!summaryText) return null;
    const keyPoints = extractKeyPoints(summaryText, json.title);
    if (!keyPoints.length) return null;
    return { id: `A${n}`, title: json.title, keyPoints, zdroj: normalizeZdroj(json) };
  } catch (e) {
    return null;
  }
}

async function pickPairTopics(path, count) {
  const pairCount = Math.floor(count / 2); // 25 dvojíc: (A1,A2)…(A49,A50)
  const triedPairs = new Set();
  const maxAttempts = Math.min(6, pairCount);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let pairIdx;
    do { pairIdx = Math.floor(Math.random() * pairCount); }
    while (triedPairs.has(pairIdx) && triedPairs.size < pairCount);
    triedPairs.add(pairIdx);

    const n1 = pairIdx * 2 + 1;
    const n2 = pairIdx * 2 + 2;
    const [t1, t2] = await Promise.all([fetchOkruh(path, n1), fetchOkruh(path, n2)]);
    if (t1 && t2) return [t1, t2];
  }
  return [];
}

/* Náhodné poradie 1..count (Fisher-Yates) – použité na VYČERPÁVAJÚCE
   hľadanie jedného platného okruhu v bazéne (skúša každý index nanajvýš
   raz, kým nenájde okruh s neprázdnym summary, alebo kým bazén
   nevyčerpá). Zaručuje, že "bazén je prázdny" hlásime len vtedy, keď
   naozaj ŽIADEN okruh v ňom nemá použiteľné summary. */
function shuffledIndices(count) {
  const arr = Array.from({ length: count }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function pickSingleFromPool(path, count) {
  const order = shuffledIndices(count);
  for (const n of order) {
    const t = await fetchOkruh(path, n);
    if (t) return t;
  }
  return null;
}

/* ============================================================
   LOSOVANIE KOLA – dispatch podľa AREA_CONFIG danej oblasti.
============================================================ */
async function pickExamTopics(areaName) {
  const config = AREA_CONFIG[areaName];
  if (!config) return [];

  if (config.mode === 'dual-pool') {
    const results = await Promise.all(
      config.pools.map(p => pickSingleFromPool(p.path, p.count))
    );
    if (results.some(t => !t)) return []; // niektorý bazén nemá ani jeden okruh so summary
    results.forEach((t, i) => { t.label = config.pools[i].label; });
    return results;
  }

  // mode === 'pair'
  return pickPairTopics(config.pool.path, config.pool.count);
}

/* ============================================================
   KOMISIA – 3 RÔZNI talárové avatary (žiadny duplikát), mix
   chlapec/dievča, rôzne taláre, preferencia akademika (zlatý pás).
   Katalóg zatiaľ nemá samostatné pole pre "subtyp" taláru, preto sa
   pohlavie/rola odvodzujú mäkko z `id` (studentka-* = dievča, inak
   chlapec; -akademik/-prokurator/-sudca/-advokat/-talar-cierny =
   rola). AK žiadny talár neexistuje, radšej žiadny obrázok ako
   civilný avatar (zadanie: "Nie základné civilné avatary") –
   zobrazí sa dekoratívny fallback.
============================================================ */
function isAcademicLike(a) {
  return /akadem|zlat|dekan|profesor|rektor/i.test(`${a?.id || ''} ${a?.name || ''}`);
}
function getGender(a) {
  return /^studentka/i.test(a?.id || '') ? 'f' : 'm';
}
function getRoleType(a) {
  const m = (a?.id || '').match(/-(akademik|prokurator|sudca|advokat|talar-cierny)$/);
  return m ? m[1] : 'ine';
}

async function pickCommission() {
  const catalog = await getAvatarCatalog();
  const talars = getTalarAvatars(catalog);
  if (!talars.length) return [];

  const usedIds = new Set();
  const usedGenders = new Set();
  const usedRoleTypes = new Set();
  const chosen = [];

  function tryAdd(candidate) {
    if (!candidate || usedIds.has(candidate.id)) return false;
    chosen.push(candidate);
    usedIds.add(candidate.id);
    usedGenders.add(getGender(candidate));
    usedRoleTypes.add(getRoleType(candidate));
    return true;
  }

  // 1. Aspoň jeden akademik (ak existuje v katalógu).
  const academic = talars.filter(isAcademicLike);
  if (academic.length) tryAdd(academic[Math.floor(Math.random() * academic.length)]);

  // 2. Zvyšné pozície: prefer opačné pohlavie a nepoužitý typ taláru;
  //    postupne poľavuj z požiadaviek, kým niečo ostáva, ale NIKDY
  //    nevyber duplicitné `id`.
  while (chosen.length < 3) {
    const remaining = talars.filter(a => !usedIds.has(a.id));
    if (!remaining.length) break;

    let pool = remaining.filter(a => !usedGenders.has(getGender(a)) && !usedRoleTypes.has(getRoleType(a)));
    if (!pool.length) pool = remaining.filter(a => !usedRoleTypes.has(getRoleType(a)));
    if (!pool.length) pool = remaining.filter(a => !usedGenders.has(getGender(a)));
    if (!pool.length) pool = remaining;

    tryAdd(pool[Math.floor(Math.random() * pool.length)]);
  }

  console.log('[ŠTÁTNICE] Komisia:', chosen.map(a => a?.id));
  return chosen;
}

/* ============================================================
   REZERVNÝ ZOZNAM TALÁROVÝCH OBRÁZKOV (mimo katalógu) – posledná
   poistka, ak by sa avatars/Catalog.json nenačítal alebo filter na
   type==='talar' vrátil prázdno. Cesty overené, že reálne existujú
   v avatars/ (nahraté spolu s katalógom v tomto commite).
============================================================ */
const RESERVE_TALAR_CANDIDATES = [
  'avatars/studentka-blond-akademik-full.png',
  'avatars/studentka-tmava-prokurator-full.png',
  'avatars/student-blond-advokat-full.png'
];

/* Pre každú z 3 pozícií komisie postaví zoznam kandidátov na
   vyskúšanie (najprv katalógový avatar, ak existuje, potom rezervný
   zoznam pootočený tak, aby rôzne pozície neskúšali ten istý súbor
   ako prvý). Renderer nižšie cez onerror prechádza kandidátov, kým
   jeden nenačíta, alebo kým sa nevyčerpajú (vtedy sa daná pozícia
   jednoducho vynechá – žiadny rozbitý obrázok). */
function buildCommissionCandidates(commission) {
  const reserve = RESERVE_TALAR_CANDIDATES;
  return [0, 1, 2].map(i => {
    const primary = commission[i] ? avatarStateSrc(commission[i], 'full') : null;
    const rotated = reserve.length
      ? reserve.slice(i % reserve.length).concat(reserve.slice(0, i % reserve.length))
      : [];
    return primary ? [primary, ...rotated] : rotated;
  });
}

/* Vykreslí komisiu s onerror-reťazením cez kandidátov; ak sa ani
   pre jednu z 3 pozícií nepodarí nič načítať, celá sekcia sa nahradí
   dekoratívnym fallbackom (nikdy civilný avatar, nikdy prázdno/
   rozbitý obrázok). */
function renderCommission(commissionEl, commission) {
  commissionEl.innerHTML = '';
  const slots = buildCommissionCandidates(commission);

  if (slots.every(c => c.length === 0)) {
    commissionEl.innerHTML = `<div class="statnice-commission-fallback">⚖️ ⚖️ ⚖️</div>`;
    return;
  }

  let successCount = 0;
  let settledCount = 0;
  const total = slots.length;

  function settle() {
    settledCount++;
    if (settledCount === total && successCount === 0) {
      commissionEl.innerHTML = `<div class="statnice-commission-fallback">⚖️ ⚖️ ⚖️</div>`;
    }
  }

  slots.forEach(candidates => {
    if (!candidates.length) { settle(); return; }

    const img = document.createElement('img');
    img.className = 'statnice-commissioner';
    img.alt = 'Člen komisie';
    commissionEl.appendChild(img);

    let idx = 0;
    function tryNext() {
      if (idx >= candidates.length) { img.remove(); settle(); return; }
      img.src = candidates[idx++];
    }
    img.onload = () => { successCount++; settle(); };
    img.onerror = tryNext;
    tryNext();
  });
}

/* ============================================================
   HODNOTENIE ODPOVEDE PROTI KĽÚČOVÝM BODOM – lokálny substitút za
   "Krok B" Claude API. Vracia rovnaký tvar:
   { covered, missing, incorrect, coverage, onTopic }

   Hodnotí sa POKRYTIE, nie doslovná zhoda: každý bod sa overuje cez
   prítomnosť JEHO VLASTNÝCH podstatných slov v odpovedi (parafráza/
   iné poradie/iná učebnica neprekáža, pokým zaznejú nosné pojmy bodu).
   `incorrect` (vecne zlé tvrdenia) lokálne spoľahlivo nevieme
   rozpoznať – ostáva vždy prázdne (poctivo priznané obmedzenie).
============================================================ */
const POINT_COVERAGE_RATIO = 0.34; // aký podiel vlastných slov bodu musí zaznieť, aby bol "covered"

/* Slovenčina má bohatú pádovú/číselnú deklináciu ("závislá" vs "o závislej
   práci" vs "závislých vzťahoch") – rovnaké slovo sa v odpovedi takmer
   vždy objaví v inom tvare ako v referenčnom bode. Čisté porovnanie
   celých slov by preto neprávom penalizovalo aj vecne správnu odpoveď.
   Namiesto skutočnej lematizácie (mimo rozsahu lokálneho substitútu)
   stačí zdieľaný začiatok slova (~70 % dĺžky kratšieho, min. 4 znaky) –
   pádové/číselné koncovky sú spravidla len 1-3 znaky na konci slova. */
function wordsMatch(a, b) {
  if (a === b) return true;
  const minLen = Math.min(a.length, b.length);
  const prefixLen = Math.max(4, Math.floor(minLen * 0.7));
  if (a.slice(0, prefixLen) === b.slice(0, prefixLen)) return true;
  return a.includes(b) || b.includes(a);
}

function isPointCovered(point, userWordsSet) {
  const pointWords = significantWords(point);
  if (!pointWords.length) return true; // bod bez rozlíšiteľných slov – nedá sa vyhodnotiť, neblokuj študenta
  let matched = 0;
  pointWords.forEach(w => {
    for (const uw of userWordsSet) {
      if (wordsMatch(w, uw)) { matched++; return; }
    }
  });
  return (matched / pointWords.length) >= POINT_COVERAGE_RATIO;
}

function evaluateCoverage(userText, keyPoints) {
  const userWords = new Set(significantWords(userText));
  const covered = [];
  const missing = [];

  (keyPoints || []).forEach(point => {
    if (userWords.size && isPointCovered(point, userWords)) covered.push(point);
    else missing.push(point);
  });

  const total = keyPoints ? keyPoints.length : 0;
  const coverage = total ? Math.round((covered.length / total) * 100) : 0;
  const onTopic = userWords.size > 0 && (covered.length >= 1 || coverage >= ON_TOPIC_MIN_THRESHOLD);

  return { covered, missing, incorrect: [], coverage, onTopic };
}

/* Doplňujúca otázka cielená na KONKRÉTNY chýbajúci bod (missing[0]),
   nie opakovanie pôvodnej otázky – lokálny substitút za Claude API
   volanie "polož jednu doplňujúcu otázku smerujúcu na tento bod". */
function buildFollowUpMessage(missing, title) {
  if (!missing || !missing.length) {
    return `Môžete to rozviesť a doplniť podstatné náležitosti k otázke „${title}"?`;
  }
  return `Spomenuli ste tému, no chýba mi konkrétny bod – ${missing[0]}. Viete to bližšie vysvetliť?`;
}

/* Záverečná spätná väzba – lokálny substitút, rovnaký tvar ako Claude API.
   Kalibrácia presne podľa zadania: 1 = coverage≥85 a žiadne incorrect,
   2 = 65-84, 3 = 45-64, 4 = <45 alebo závažné vecné chyby. */
function buildFinalFeedback(evaluations, topics) {
  const avg = evaluations.reduce((s, e) => s + e.coverage, 0) / evaluations.length;
  const anyIncorrect = evaluations.some(e => e.incorrect && e.incorrect.length);

  let znamka;
  if (avg >= 85 && !anyIncorrect) znamka = 1;
  else if (avg >= 65 && !anyIncorrect) znamka = 2;
  else if (avg >= 45) znamka = 3;
  else znamka = 4;
  if (anyIncorrect && avg < 45) znamka = 4;

  const silne = [];
  const medzery = [];
  evaluations.forEach((e, i) => {
    const title = topics[i].title;
    if (e.covered.length) silne.push(`Téma „${title}" – pokryté: ${e.covered.join('; ')}.`);
    if (e.missing.length) medzery.push(`Téma „${title}" – doštudovať: ${e.missing.join('; ')}.`);
  });
  if (!silne.length) silne.push('Snaha odpovedať na obe otázky.');

  const odporucania = medzery.length
    ? ['Zameraj sa na vymenované chýbajúce body – doštuduj ich v plnom vypracovaní okruhu.', 'Drž sa štruktúry: pojem → znaky → príklad → judikatúra.']
    : ['Pokračuj v tomto tempe, skús aj náročnejšie okruhy.'];

  const zaverByZnamka = {
    1: 'Výborný výkon – ovládaš obe témy na vysokej úrovni.',
    2: 'Veľmi dobrý výkon, drobné medzery neubrali na celkovom dojme.',
    3: 'Solídny základ, ale je čo doťahovať – pozri si odporúčania.',
    4: 'Zatiaľ to nestačí – over si obe témy znova a skús to nabudúce.'
  };

  return { znamka, silne, medzery, odporucania, zaver: zaverByZnamka[znamka] };
}

/* ============================================================
   ODMENA – až po dokončení CELEJ skúšky (nie pri zrušení v strede)
============================================================ */
async function awardExamResult(nick, znamka) {
  const amount = ECONOMY_CONFIG.STATNICE.EXAM_REWARD[znamka] || 0;
  if (amount > 0) {
    await econAward(nick, amount, `štátnicová skúška – známka ${znamka}`, { skipCap: true });
  }
  return amount;
}

async function saveExamResult(nick, znamka, areaName) {
  try {
    const db = getDb();
    if (!db || !nick) return;
    const { ref, push } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js');
    await push(ref(db, `users/${nick}/examResults`), {
      znamka, area: areaName, ts: Date.now()
    });
  } catch (e) {
    console.warn('⚠️ statnice: uloženie výsledku zlyhalo', e);
  }
}

/* ============================================================
   SPEECHRECOGNITION – sk-SK, continuous + interim, s poistkami:
   - onend počas POCUVANIE → auto-reštart (Chrome ho vie sám ukončiť)
   - samostatný 8s časovač ticha od posledného rozpoznaného slova
   - manuálne zastavenie (mic toggle) sa NEreštartuje
============================================================ */
const FATAL_SPEECH_ERRORS = new Set(['not-allowed', 'service-not-allowed']);
const MAX_AUTO_RESTARTS = 4; // poistka proti nekonečnej slučke (napr. trvalo zamietnuté povolenie mikrofónu)

function createRecognizer({ onInterim, onFinalChunk, onSilence, onFatalError }) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;

  let recognizer;
  try {
    recognizer = new SR();
  } catch (e) {
    return null;
  }
  recognizer.lang = 'sk-SK';
  recognizer.continuous = true;
  recognizer.interimResults = true;

  let silenceTimer = null;
  let started = false;
  let manuallyStopped = false;
  let fatallyFailed = false;
  let consecutiveAutoRestarts = 0;

  function resetSilenceTimer() {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => {
      console.log('[ŠTÁTNICE] Odmlka 8s zaznamenaná');
      onSilence();
    }, SILENCE_TIMEOUT_MS);
  }

  recognizer.onstart = () => { started = true; console.log('[ŠTÁTNICE] Speech onstart'); };

  recognizer.onresult = (e) => {
    let interim = '';
    let finalChunk = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalChunk += t + ' ';
      else interim += t;
    }
    console.log('[ŠTÁTNICE] Speech onresult:', { finalChunk: finalChunk.trim(), interim });
    if (finalChunk) onFinalChunk(finalChunk);
    onInterim(interim);
    resetSilenceTimer();
  };

  recognizer.onerror = (e) => {
    console.warn('⚠️ [ŠTÁTNICE] Speech onerror', e.error);
    if (FATAL_SPEECH_ERRORS.has(e.error)) fatallyFailed = true;
  };

  recognizer.onend = () => {
    console.log('[ŠTÁTNICE] Speech onend', { manuallyStopped, fatallyFailed, consecutiveAutoRestarts });
    if (silenceTimer) clearTimeout(silenceTimer);
    if (manuallyStopped) return;

    // Poistka: trvalo zamietnuté povolenie (alebo iná neopraviteľná chyba) či priveľa
    // reštartov za sebou → prestaň skúšať donekonečna a prepni na písanú odpoveď.
    if (fatallyFailed || ++consecutiveAutoRestarts > MAX_AUTO_RESTARTS) {
      console.warn('⚠️ [ŠTÁTNICE] Rozpoznávanie reči trvalo zlyhalo – končím s pokusmi o reštart');
      if (typeof onFatalError === 'function') onFatalError();
      return;
    }
    if (typeof api.onAutoEnd === 'function') api.onAutoEnd();
  };

  const api = {
    start() {
      manuallyStopped = false;
      started = false;
      try { recognizer.start(); resetSilenceTimer(); } catch (e) { console.warn('⚠️ [ŠTÁTNICE] recognizer.start zlyhalo', e); }
    },
    stop() {
      manuallyStopped = true;
      if (silenceTimer) clearTimeout(silenceTimer);
      try { recognizer.stop(); } catch (e) {}
    },
    hasStarted: () => started,
    onAutoEnd: null
  };
  return api;
}

/* ============================================================
   UI – FULLSCREEN OVERLAY
============================================================ */
let overlayEl = null;

function buildOverlay(areaName) {
  const el = document.createElement('div');
  el.className = 'statnice-overlay';
  el.innerHTML = `
    <div class="statnice-bg"></div>
    <div class="statnice-header">
      <div class="statnice-title">⚖️ Štátnicová sieň – ${areaName}</div>
      <button class="btn statnice-close-btn" id="statniceCloseBtn" type="button">✕ Zavrieť</button>
    </div>
    <div class="statnice-commission" id="statniceCommission"></div>
    <div class="statnice-content" id="statniceContent">
      <div id="statnicePrepPhase">
        <div class="statnice-timer" id="statniceTimer">5:00</div>
        <div class="statnice-topics" id="statniceTopics"></div>
        <textarea class="statnice-notes" id="statniceNotes" placeholder="Súkromné poznámky (len pre teba, nikde sa neukladajú)…"></textarea>
        <button class="btn btn-primary statnice-ready-btn" id="statniceReadyBtn" type="button">Som pripravený/á →</button>
      </div>
      <div id="statniceAnswerPhase" style="display:none">
        <div class="statnice-question-label" id="statniceQNum"></div>
        <div class="statnice-current-question" id="statniceCurrentQ"></div>
        <div class="statnice-followup" id="statniceCommissionMsg" style="display:none"></div>
        <div class="small muted" id="statniceMicStatus"></div>
        <div class="statnice-live-transcript" id="statniceLiveTranscript"></div>
        <textarea class="statnice-answer-input" id="statniceAnswerInput" placeholder="Odpoveď (hovor nahlas alebo píš)…"></textarea>
        <div class="statnice-answer-actions">
          <button class="btn" id="statniceMicBtn" type="button">🎤 Mikrofón</button>
          <button class="btn btn-primary" id="statniceSubmitBtn" type="button">✅ Skončil/a som</button>
        </div>
      </div>
      <div id="statniceResultsPhase" style="display:none">
        <div class="statnice-grade" id="statniceGrade"></div>
        <div class="statnice-feedback" id="statniceFeedback"></div>
        <button class="btn btn-primary statnice-finish-btn" id="statniceFinishBtn" type="button">Zavrieť</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

export function closeStatniceHall() {
  if (overlayEl) { overlayEl.remove(); overlayEl = null; }
  document.body.style.overflow = '';
}

export async function openStatniceHall(areaName) {
  if (!isStatniceAvailable(areaName)) {
    const available = Object.keys(AREA_CONFIG).join(', ');
    showRewardToast(`⚖️ Štátnicová sieň je zatiaľ dostupná len pre: ${available}.`);
    return;
  }

  const nick = getNick();
  if (!nick) { showRewardToast('Najprv si zadaj nick.'); return; }

  const cost = ECONOMY_CONFIG.STATNICE.EXAM_COST;
  const paid = await econSpend(nick, cost, 'štátnicová skúška – vstup');
  if (!paid) {
    showRewardToast(`Nemáš dosť § (${cost}§). Získaj § v bifľovačke alebo dueloch.`);
    return;
  }

  const topics = await pickExamTopics(areaName);
  if (topics.length < 2) {
    // vráť § – skúška sa nedá spustiť (nedostatok obsahu / prázdny bazén / "výpadok" pred prvou otázkou)
    await econAward(nick, cost, 'štátnicová skúška – vrátenie (nedostatok obsahu)', { skipCap: true });
    showRewardToast('⚖️ Komisia teraz nie je dostupná, skús neskôr.');
    return;
  }
  const commission = await pickCommission();

  closeStatniceHall();
  overlayEl = buildOverlay(areaName);
  document.body.style.overflow = 'hidden';

  renderCommission(overlayEl.querySelector('#statniceCommission'), commission);

  const topicsEl = overlayEl.querySelector('#statniceTopics');
  topicsEl.innerHTML = topics.map((t, i) => `
    <div class="statnice-topic-card">
      <div class="statnice-topic-num">${t.label || `Otázka ${i + 1}`}</div>
      <div class="statnice-topic-text">${t.title}</div>
      ${renderSource(t.zdroj)}
    </div>
  `).join('');

  /* ============================================================
     STAVOVÝ AUTOMAT
     PRIPRAVA → VYZVANIE → POCUVANIE → HODNOTENIE
       → (doplňujúca? → POCUVANIE : ĎALŠIA_OTÁZKA/ZÁVER)
  ============================================================ */
  let examPhase = 'PRIPRAVA';
  function setPhase(next) {
    console.log(`[ŠTÁTNICE] ${examPhase} → ${next}`);
    examPhase = next;
  }

  let answered = false; // ochrana pri zatváraní – § sa nevráti, ak už hráč odpovedal
  let rewardGranted = false;
  const answers = ['', ''];
  const evaluations = [];
  const followUpCounts = [0, 0];
  let currentIdx = 0;

  let recognizer = null;
  let listening = false;
  let prepTimerHandle = null;
  let speechFallbackTimer = null;
  let ttsFallbackTimer = null;

  const timerEl = overlayEl.querySelector('#statniceTimer');
  const qNumEl = overlayEl.querySelector('#statniceQNum');
  const qTextEl = overlayEl.querySelector('#statniceCurrentQ');
  const msgEl = overlayEl.querySelector('#statniceCommissionMsg');
  const micStatusEl = overlayEl.querySelector('#statniceMicStatus');
  const liveTranscriptEl = overlayEl.querySelector('#statniceLiveTranscript');
  const answerInput = overlayEl.querySelector('#statniceAnswerInput');
  const micBtn = overlayEl.querySelector('#statniceMicBtn');

  /* ---------- PRIPRAVA ---------- */
  let remaining = PREP_SECONDS;
  function tickPrepTimer() {
    remaining--;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    timerEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
    if (remaining <= 0) {
      clearInterval(prepTimerHandle);
      startAnswerPhase();
    }
  }
  prepTimerHandle = setInterval(tickPrepTimer, 1000);
  overlayEl.querySelector('#statniceReadyBtn').onclick = () => {
    clearInterval(prepTimerHandle);
    startAnswerPhase();
  };

  function startAnswerPhase() {
    overlayEl.querySelector('#statnicePrepPhase').style.display = 'none';
    overlayEl.querySelector('#statniceAnswerPhase').style.display = 'block';
    enterVyzvanie(currentIdx);
  }

  function stopListening() {
    clearTimeout(speechFallbackTimer);
    if (recognizer) { recognizer.stop(); }
    listening = false;
    micBtn.textContent = '🎤 Mikrofón';
  }

  /* ---------- VYZVANIE – komisia AKTÍVNE vyzve, vždy sa vykoná ---------- */
  function enterVyzvanie(idx) {
    setPhase('VYZVANIE');
    const topic = topics[idx];

    qNumEl.textContent = topic.label || `Otázka ${idx + 1} / ${topics.length}`;
    qTextEl.textContent = topic.title;
    answerInput.value = answers[idx] || '';
    liveTranscriptEl.textContent = '';
    micStatusEl.textContent = '';

    const prompt = idx === 0
      ? `Nech sa páči, môžete začať odpovedať na prvú otázku: ${topic.title}.`
      : `Ďakujeme. Ďalšia otázka: ${topic.title}.`;
    msgEl.style.display = 'block';
    msgEl.innerHTML = `<strong>Komisia:</strong> ${prompt}`;

    let advanced = false;
    const goToListening = () => {
      if (advanced) return;
      advanced = true;
      clearTimeout(ttsFallbackTimer);
      enterPocuvanie(idx);
    };

    speakText(prompt, { onEnd: goToListening });
    // Poistka: ak TTS zlyhá/nepodporené (onEnd sa nikdy nespustí), pokračuj sám.
    clearTimeout(ttsFallbackTimer);
    ttsFallbackTimer = setTimeout(goToListening, TTS_FALLBACK_MS);
  }

  /* ---------- POCUVANIE – robustné rozpoznávanie + poistky ---------- */
  function enterPocuvanie(idx) {
    setPhase('POCUVANIE');
    let baseTranscript = answers[idx] || '';

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      micStatusEl.textContent = '🔇 Rozpoznávanie reči nie je v tomto prehliadači dostupné – napíš odpoveď a klikni „Skončil/a som".';
      micBtn.style.display = 'none';
      return; // textarea je vždy viditeľná a funkčná – skúška beží aj bez mikrofónu
    }
    micBtn.style.display = '';

    recognizer = createRecognizer({
      onInterim: (interim) => {
        liveTranscriptEl.textContent = `${baseTranscript} ${interim}`.trim();
      },
      onFinalChunk: (chunk) => {
        baseTranscript = `${baseTranscript} ${chunk}`.trim();
        answers[idx] = baseTranscript;
        answerInput.value = baseTranscript;
        liveTranscriptEl.textContent = baseTranscript;
      },
      onSilence: () => {
        stopListening();
        enterHodnotenie(idx, (answerInput.value || '').trim(), true);
      },
      onFatalError: () => {
        // Trvalo zamietnuté povolenie mikrofónu alebo opakované zlyhanie – prestaň
        // sa pokúšať o rozpoznávanie a nechaj hráča odpovedať písaním (Poistka A).
        listening = false;
        micBtn.style.display = 'none';
        micStatusEl.textContent = '🔇 Mikrofón nie je dostupný (povolenie zamietnuté alebo opakovaná chyba) – napíš odpoveď a klikni „Skončil/a som".';
      }
    });

    if (!recognizer) {
      micStatusEl.textContent = '🔇 Rozpoznávanie reči zlyhalo – napíš odpoveď a klikni „Skončil/a som".';
      micBtn.style.display = 'none';
      return;
    }

    recognizer.onAutoEnd = () => {
      if (examPhase === 'POCUVANIE') {
        console.log('[ŠTÁTNICE] Speech onend počas POCUVANIE → auto-reštart');
        try { recognizer.start(); } catch (e) {}
      }
    };

    recognizer.start();
    listening = true;
    micBtn.textContent = '⏹️ Stlmiť mikrofón';
    micStatusEl.textContent = '🔴 Počúvam…';

    clearTimeout(speechFallbackTimer);
    speechFallbackTimer = setTimeout(() => {
      if (recognizer && !recognizer.hasStarted()) {
        console.warn('[ŠTÁTNICE] Speech nenaskočilo do 2 s – napíš odpoveď');
        micStatusEl.textContent = '🔇 Rozpoznávanie reči nereaguje – pokojne napíš odpoveď a klikni „Skončil/a som".';
      }
    }, SPEECH_START_FALLBACK_MS);
  }

  micBtn.onclick = () => {
    if (listening) {
      stopListening();
      micStatusEl.textContent = '⏸️ Mikrofón vypnutý – môžeš písať.';
      return;
    }
    if (examPhase === 'POCUVANIE') enterPocuvanie(currentIdx);
  };

  overlayEl.querySelector('#statniceSubmitBtn').onclick = () => {
    // Poistka proti rýchlemu dvojkliku počas VYZVANIE/HODNOTENIE (kým komisia ešte
    // "hovorí"/vyhodnocuje) – zabraňuje pretekaniu dvoch stavových prechodov naraz.
    if (examPhase !== 'POCUVANIE') return;
    answered = true;
    stopListening();
    enterHodnotenie(currentIdx, (answerInput.value || '').trim(), false);
  };

  /* ---------- HODNOTENIE – Claude API kontrakt (lokálny substitút) ---------- */
  let followUpFallbackTimer = null;
  function enterHodnotenie(idx, transcript, triggeredBySilence) {
    setPhase('HODNOTENIE');
    answered = true;
    answers[idx] = transcript;

    const topic = topics[idx];
    const result = evaluateCoverage(transcript, topic.keyPoints);
    console.log('[ŠTÁTNICE] Hodnotenie:', result);
    evaluations[idx] = result;

    // "Ak missing nie je prázdne → komisia sa spýta konkrétne naň" (zadanie) –
    // doplňujúca sa cieli na konkrétny chýbajúci bod, nie na hocijaké nízke skóre.
    const needsFollowUp = (result.missing.length > 0 || triggeredBySilence)
      && followUpCounts[idx] < MAX_FOLLOWUPS_PER_QUESTION;

    if (needsFollowUp) {
      followUpCounts[idx]++;
      const followUpText = buildFollowUpMessage(result.missing, topic.title);
      msgEl.style.display = 'block';
      msgEl.innerHTML = `<strong>Komisia (doplňujúca otázka):</strong> ${followUpText}`;
      liveTranscriptEl.textContent = '';

      let advanced = false;
      const goBack = () => {
        if (advanced) return;
        advanced = true;
        clearTimeout(followUpFallbackTimer);
        enterPocuvanie(idx);
      };
      speakText(followUpText, { onEnd: goBack });
      clearTimeout(followUpFallbackTimer);
      followUpFallbackTimer = setTimeout(goBack, TTS_FALLBACK_MS);
      return;
    }

    advanceQuestion(idx);
  }

  function advanceQuestion(idx) {
    const nextIdx = idx + 1;
    if (nextIdx < topics.length) {
      currentIdx = nextIdx;
      enterVyzvanie(nextIdx);
    } else {
      enterZaver();
    }
  }

  /* ---------- ZÁVER – súhrnná spätná väzba ---------- */
  async function enterZaver() {
    setPhase('ZAVER');
    overlayEl.querySelector('#statniceAnswerPhase').style.display = 'none';
    overlayEl.querySelector('#statniceResultsPhase').style.display = 'block';

    const feedback = buildFinalFeedback(evaluations, topics);
    console.log('[ŠTÁTNICE] Záverečná spätná väzba:', feedback);

    const gradeEl = overlayEl.querySelector('#statniceGrade');
    gradeEl.textContent = `Známka: ${feedback.znamka}`;

    const rewardAmount = await awardExamResult(nick, feedback.znamka);
    rewardGranted = true;
    await saveExamResult(nick, feedback.znamka, areaName);

    const fbEl = overlayEl.querySelector('#statniceFeedback');
    fbEl.innerHTML = `
      <div class="statnice-fb-section"><strong>Silné stránky</strong><ul>${feedback.silne.map(s => `<li>${s}</li>`).join('')}</ul></div>
      ${feedback.medzery.length ? `<div class="statnice-fb-section"><strong>Medzery</strong><ul>${feedback.medzery.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
      <div class="statnice-fb-section"><strong>Odporúčania</strong><ul>${feedback.odporucania.map(s => `<li>${s}</li>`).join('')}</ul></div>
      <div class="statnice-fb-zaver">${feedback.zaver}</div>
      ${rewardAmount > 0 ? `<div class="statnice-fb-reward">+${rewardAmount}§ za skúšku</div>` : ''}
    `;
  }

  overlayEl.querySelector('#statniceFinishBtn').onclick = () => closeStatniceHall();

  overlayEl.querySelector('#statniceCloseBtn').onclick = async () => {
    const phaseBeforeClose = examPhase;
    const wasListening = listening;
    setPhase('CLOSED');
    if (recognizer) { try { recognizer.stop(); } catch (e) {} }
    clearInterval(prepTimerHandle);
    clearTimeout(speechFallbackTimer);
    clearTimeout(ttsFallbackTimer);
    clearTimeout(followUpFallbackTimer);

    if (answered && !rewardGranted) {
      const ok = window.confirm('Ukončiť skúšku? § sa nevráti, ak si už odpovedal/a.');
      if (!ok) {
        // Návrat presne do stavu pred pokusom o zatvorenie (nie natvrdo do POCUVANIE) –
        // ak sme počúvali, treba recognizer aj reálne znova spustiť (stop() vyššie ho zastavil).
        setPhase(phaseBeforeClose);
        if (phaseBeforeClose === 'POCUVANIE' && wasListening && recognizer) {
          recognizer.start();
          listening = true;
          micBtn.textContent = '⏹️ Stlmiť mikrofón';
          micStatusEl.textContent = '🔴 Počúvam…';
        }
        return;
      }
    }
    if (!answered) {
      // nikto ešte neodpovedal – vráť §
      await econAward(nick, cost, 'štátnicová skúška – zrušené pred odpoveďou', { skipCap: true });
    }
    closeStatniceHall();
  };
}
