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
import { speakText, isSpeechRecognitionSupported, createSpeechRecognizer } from '../memoryTrainer.js';
import { normalizeOkruhText, normalizeZdroj } from './contentNormalize.js';
import { renderSource } from './sourceUtil.js';
import { ensureVoicesLoaded, pickVoice, getAvailableSkGenders } from '../biflovackaVideo.js';
import { getOkruhPercentMap } from './dashboardStats.js';

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
   progressAreaTitle/pools[].progressAreaTitle – MUSÍ byť presne zhodné s
   DASHBOARD_AREAS[].subAreas[].areaTitle v scripts/dashboardStats.js, inak
   getOkruhPercentMap() nenájde žiadny progres (findAreaAndSubArea zlyhá
   ticho, vráti {} – čo je v poriadku, len spustí poistku nováčika nižšie).
============================================================ */
const AREA_CONFIG = {
  [PROTOTYPE_AREA_NAME]: {
    mode: 'pair',
    pool: { path: PRACOVNE_DATA_PATH, count: PRACOVNE_OKRUH_COUNT },
    progressAreaTitle: 'Pracovné právo'
  },
  [CIVIL_AREA_NAME]: {
    mode: 'dual-pool',
    pools: [
      { path: CIVIL_HMOTNE_PATH, count: CIVIL_HMOTNE_COUNT, label: 'Hmotné právo', progressAreaTitle: 'Občianske právo hmotné' },
      { path: CIVIL_PROCESNE_PATH, count: CIVIL_PROCESNE_COUNT, label: 'Procesné právo', progressAreaTitle: 'Občianske právo procesné' }
    ]
  }
};

/* ============================================================
   PERSÓNY SKÚŠAJÚCEHO – menia VÝHRADNE TÓN/ZNENIE spätnej väzby.
   Hodnotenie je 100% lokálne (extractKeyPoints + evaluateCoverage,
   pozri vyššie) – žiadny LLM prompt v appke neexistuje, takže tu nejde
   o rozdelenie "hodnotiaci prompt vs. podávací prompt", ale presne o to,
   čo pýta zadanie pre lokálne hodnotenie: persóna mení len textové
   šablóny (buildPersonaFeedback nižšie), NIKDY evaluateCoverage() ani
   znamka v buildFinalFeedback() – tá sa počíta úplne rovnako pre
   všetky tri, priamo z tej istej `evaluations` štruktúry.
============================================================ */
const EXAM_PERSONA_KEY = 'lexExamPersona';
const EXAM_VOICE_KEY = 'lexExamVoice'; // 'm' | 'f' | 'off'
const DEFAULT_PERSONA = 'rational';

const PERSONAS = {
  strict: {
    emoji: '⚖️', label: 'Prísny',
    desc: 'Náročný a vecný, žiadne chválenie navyše.',
    greet: (title) => `Začnite prosím prvou otázkou: ${title}.`,
    next: (title) => `Ďalšia otázka: ${title}.`,
    followUp: (point) => `Toto je neúplné – chýba: ${point}. Doplňte to.`,
    followUpGeneric: (title) => `Odpoveď je nedostatočná. Rozveďte podstatné náležitosti k otázke „${title}".`,
    coveredLine: (title, covered) => `Téma „${title}" – zvládnuté body: ${covered.join('; ')}.`,
    missingLine: (title, missing) => `Téma „${title}" – chýba, doštudujte: ${missing.join('; ')}.`,
    noCoveredFallback: 'Žiadny bod nebol pokrytý dostatočne.',
    odporucaniaWithGaps: ['Zamerajte sa presne na vymenované chýbajúce body – bez toho skúška neobstojí.', 'Držte štruktúru: pojem → znaky → príklad → judikatúra.'],
    odporucaniaClean: ['Držte túto úroveň, netreba poľaviť.'],
    zaver: {
      1: 'Solídny výkon, bez zásadných výhrad.',
      2: 'Priemer – medzery sú viditeľné, doriešte ich.',
      3: 'Slabé. Toto si musíte zásadne doštudovať.',
      4: 'Nedostatočné. Pri reálnej komisii by ste takto neuspeli.'
    }
  },
  supportive: {
    emoji: '🤝', label: 'Podporujúci',
    desc: 'Povzbudí, oceňuje, medzery pomenuje láskavo.',
    greet: (title) => `Poď smelo na prvú otázku: ${title}. Netreba sa báť, poďme na to spolu.`,
    next: (title) => `Skvele, ideme ďalej. Ďalšia otázka: ${title}.`,
    followUp: (point) => `Dobrý základ! Ešte by som privítal/a doplniť: ${point}. Skús to rozviesť.`,
    followUpGeneric: (title) => `Skús sa k otázke „${title}" vrátiť a doplniť, čo ťa napadne navyše – pokojne aj krok za krokom.`,
    coveredLine: (title, covered) => `Pri téme „${title}" ti pekne sadli tieto body: ${covered.join('; ')}.`,
    missingLine: (title, missing) => `Pri téme „${title}" ešte doplň: ${missing.join('; ')} – je to len kúsok práce navyše.`,
    noCoveredFallback: 'Aspoň si sa pokúsil/a odpovedať na obe otázky – budeme na tom stavať ďalej.',
    odporucaniaWithGaps: ['Zameraj sa na chýbajúce body vyššie, zvládneš to.', 'Skús si pri učení držať štruktúru pojem → znaky → príklad → judikatúra, pomôže ti to zapamätať si viac.'],
    odporucaniaClean: ['Skvelá práca, pokojne skús aj náročnejšie okruhy!'],
    zaver: {
      1: 'Výborne, naozaj pekný výkon! Obe témy zvládaš na vysokej úrovni.',
      2: 'Veľmi pekné, drobné medzery vôbec neubrali na dojme.',
      3: 'Základ máš, len to ešte chce doladiť – nevzdávaj to.',
      4: 'Tentokrát to ešte nesedelo, ale máš čas si to doštudovať – dáš to.'
    }
  },
  rational: {
    emoji: '📊', label: 'Racionálny',
    desc: 'Bez emócií – fakty: čo odznelo, čo chýba, čo je správne.',
    greet: (title) => `Nech sa páči, môžete začať odpovedať na prvú otázku: ${title}.`,
    next: (title) => `Ďakujeme. Ďalšia otázka: ${title}.`,
    followUp: (point) => `Spomenuli ste tému, no chýba mi konkrétny bod – ${point}. Viete to bližšie vysvetliť?`,
    followUpGeneric: (title) => `Môžete to rozviesť a doplniť podstatné náležitosti k otázke „${title}"?`,
    coveredLine: (title, covered) => `Téma „${title}" – pokryté: ${covered.join('; ')}.`,
    missingLine: (title, missing) => `Téma „${title}" – doštudovať: ${missing.join('; ')}.`,
    noCoveredFallback: 'Snaha odpovedať na obe otázky.',
    odporucaniaWithGaps: ['Zameraj sa na vymenované chýbajúce body – doštuduj ich v plnom vypracovaní okruhu.', 'Drž sa štruktúry: pojem → znaky → príklad → judikatúra.'],
    odporucaniaClean: ['Pokračuj v tomto tempe, skús aj náročnejšie okruhy.'],
    zaver: {
      1: 'Výborný výkon – ovládaš obe témy na vysokej úrovni.',
      2: 'Veľmi dobrý výkon, drobné medzery neubrali na celkovom dojme.',
      3: 'Solídny základ, ale je čo doťahovať – pozri si odporúčania.',
      4: 'Zatiaľ to nestačí – over si obe témy znova a skús to nabudúce.'
    }
  }
};

function getPersona(key) {
  return PERSONAS[key] || PERSONAS[DEFAULT_PERSONA];
}

/* ============================================================
   HLAS KOMISIE – nadväzuje na existujúci mechanizmus z bifľovačky
   (pickVoice/ensureVoicesLoaded z biflovackaVideo.js), NEROBÍ druhý.
   Prísnejšia politika než video: video akceptuje aj cs alebo hocijaký
   hlas ako náhradu, štátnica NIE – ak nie je žiadny sk hlas, radšej
   ticho (len text) než cudzojazyčný hlas v skúškovej situácii.
============================================================ */
async function resolveExamVoice(voicePref) {
  if (voicePref === 'off' || !('speechSynthesis' in window)) return null;
  await ensureVoicesLoaded();
  const voices = window.speechSynthesis.getVoices();
  const hasSk = voices.some(v => v.lang && v.lang.toLowerCase().startsWith('sk'));
  if (!hasSk) return null; // žiadny SK hlas → ticho, len text (bez chyby, bez mätúcej hlášky)

  if (voicePref === 'm' || voicePref === 'f') return pickVoice(voicePref);

  // voicePref === 'voice' – neutrálna voľba bez sľubu pohlavia (buildPersonaOverlay
  // ju ponúka len keď je k dispozícii PRÁVE JEDNO rozlíšiteľné pohlasie); zober to,
  // ktoré reálne existuje, nech pickVoice() nájde skutočnú zhodu, nie náhodný pool[0].
  const { hasMale, hasFemale } = getAvailableSkGenders();
  return pickVoice(hasFemale && !hasMale ? 'f' : 'm');
}

/* Prehrá text daným hlasom komisie, alebo ak examVoice===null (vypnuté
   / žiadny sk hlas), rovno zavolá onEnd bez čakania – žiadna 6s pauza
   na TTS fallback, keď sa ani nepokúšame hovoriť.

   ⚠️ cancelPrevious:false – speakText() by inak PRED KAŽDÝM (aj druhým,
   tretím...) prejavom nepodmienene zavolal speechSynthesis.cancel().
   Zdokumentovaný Chrome/Android bug: cancel() tesne pred ďalším .speak()
   v tej istej relácii vie spôsobiť, že onend NASLEDUJÚCEJ utterance
   vystrelí takmer okamžite – predtým, než z reproduktora reálne čokoľvek
   zaznie. Presne to vysvetľuje vzor "prvá otázka OK, druhá+ nie" (prvý
   prejav na stránke nemá čo cancelovať, každý ďalší áno). Cancelujeme
   preto LEN keď je reálne čo cancelovať (niečo ešte beží/čaká na
   prehratie) – nikdy nepodmienene pred každým volaním. */
function speakOrSkip(text, examVoice, { onEnd }) {
  if (!examVoice) { if (onEnd) onEnd(); return; }
  if (window.speechSynthesis && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  const played = speakText(text, { voice: examVoice.voice, pitch: examVoice.pitch, onEnd, cancelPrevious: false });
  if (!played && onEnd) onEnd();
}

const PREP_SECONDS = 5 * 60;
const ON_TOPIC_MIN_THRESHOLD = 15;   // pod týmto = úplne mimo témy (guard proti falošne kladnému skóre)
const MAX_FOLLOWUPS_PER_QUESTION = 2;

/* ⚠️ ODHAD, nie meranie – rôzne hlasy/zariadenia hovoria rôzne rýchlo, takže
   toto NIKDY nesmie byť to, čo primárne spúšťa počúvanie. Skutočný spúšťač
   JE VŽDY utterance.onend (viď speakThenListen nižšie) – tento časovač
   slúži VÝHRADNE ako poistka pre prípad, že onend v danom prehliadači/
   zariadení vôbec nepríde (zdokumentovaný okrajový prípad Web Speech API,
   nie bežný stav). Preto ×3 rezerva navyše oproti odhadu (2026-07-18:
   zdvihnuté z ×2.5 – aj pri podstatne pomalšom hlase/zariadení má poistka
   spustiť počúvanie AŽ PO reálnom konci reči, nikdy pred ním; radšej pár
   sekúnd zbytočne čaká, než aby zachytila vlastný hlas komisie). */
function estimateSpeechMs(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length || 1;
  return Math.min(30000, Math.max(4000, words * 450 + 2000));
}
function ttsFallbackDelay(text) {
  return Math.min(60000, estimateSpeechMs(text) * 3);
}

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
    // Glosár okruhu (Fáza D.3) – tiles = 5 kurátorovaných pojmov + definícií,
    // rovnaký zdroj ako kartičky/duel. Použité v evaluateCoverage() na
    // hodnotenie právnej terminológie ako ZLOŽKY známky, nie celej známky.
    const glossary = Array.isArray(json.tiles) ? json.tiles.map(t => t && t.term).filter(Boolean) : [];
    // summary: surový text zhrnutia okruhu – dnešný lokálny grader ho
    // nepotrebuje (pracuje z už extrahovaných keyPoints), ale budúci LLM
    // grader (Fáza 2/3) ho bude potrebovať na posúdenie vecnej správnosti,
    // preto sa nesie na topic objekte už teraz.
    return { id: `A${n}`, title: json.title, summary: summaryText, keyPoints, glossary, zdroj: normalizeZdroj(json) };
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
   ZMIEŠANÝ VÝBER PODĽA PROGRESU (2026-07-18)
   Namiesto čisto náhodného ťahania: 1 okruh "na precvičenie" (slabý,
   progres 0 %<x<80 %) + 1 "zmiešaný" (prevažne silný ≥80 %, občas
   nedotknutý 0 %). Progres cez getOkruhPercentMap() z dashboardStats.js
   – ROVNAKÁ funkcia, ktorú už používa duels.js mode picker; číta
   users/{nick}/progress/{appId}/... vrátane externých appiek (pravo-app,
   ob-pravo-app zapisujú do tej istej vetvy cez scripts/progressTracking.js
   writeOkruhBest, nie len hlavná appka).

   POISTKA ZLYHANIA: getOkruhPercentMap je async a číta Firebase – ak
   zlyhá/timeoutne, fetchPercentMapSafe() to premení na null namiesto
   toho, aby nechala výnimku zhodiť celé losovanie; null ďalej spúšťa
   presne tú istú vetvu ako poistka nováčika nižšie (dnešný čisto náhodný
   výber cez existujúce pickPairTopics/pickSingleFromPool – ŽIADNA nová
   implementácia pre fallback, len znovupoužitie toho, čo funguje dnes).

   POISTKA NOVÁČIKA: ak má študent v danej oblasti/bazéne menej než
   ECONOMY_CONFIG.STATNICE.MIXED_SELECTION_MIN_STUDIED okruhov s
   progresom > 0 %, niet z čoho robiť "dôraz na slabé" (samé 0 % okruhy
   by pôsobili demotivujúco) – rovnaký fallback na dnešný náhodný výber.
============================================================ */
async function fetchPercentMapSafe(nick, areaTitle, count) {
  if (!nick || !areaTitle) return null;
  const keys = Array.from({ length: count }, (_, i) => `A${i + 1}`);
  try {
    const map = await getOkruhPercentMap(nick, areaTitle, keys);
    return (map && typeof map === 'object') ? map : null;
  } catch (e) {
    console.warn('[ŠTÁTNICE] getOkruhPercentMap zlyhalo – fallback na dnešný náhodný výber', e);
    return null;
  }
}

function classifyOkruhPercent(percentMap, n) {
  const pct = percentMap[`A${n}`] || 0;
  if (pct >= 80) return 'silne';
  if (pct > 0) return 'slabe';
  return 'nedotknute';
}

function bucketizeByPercent(percentMap, count) {
  const slabe = [], silne = [], nedotknute = [];
  for (let n = 1; n <= count; n++) {
    const bucket = classifyOkruhPercent(percentMap, n);
    (bucket === 'slabe' ? slabe : bucket === 'silne' ? silne : nedotknute).push(n);
  }
  return { slabe, silne, nedotknute };
}

function countStudied(percentMap, count) {
  let n = 0;
  for (let i = 1; i <= count; i++) if ((percentMap[`A${i}`] || 0) > 0) n++;
  return n;
}

/* Zamieša kandidátov, vráti prvý s validným obsahom (rovnaká kontrola ako
   fetchOkruh vždy robil – title/summary/key points) – vyčerpávajúce
   hľadanie v rámci koša, rovnaký vzor ako existujúce pickSingleFromPool. */
async function pickValidFromCandidates(path, candidates) {
  const order = [...candidates];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  for (const n of order) {
    const t = await fetchOkruh(path, n);
    if (t) return t;
  }
  return null;
}

/* Okruh "na precvičenie": slabé → nedotknuté → silné (presne poradie fallbacku zo zadania). */
async function pickWeakTopic(path, buckets) {
  for (const bucket of [buckets.slabe, buckets.nedotknute, buckets.silne]) {
    if (!bucket.length) continue;
    const t = await pickValidFromCandidates(path, bucket);
    if (t) return t;
  }
  return null;
}

/* Okruh "zmiešaný": ~70 % silné / ~30 % nedotknuté, s fallbackom na
   opačný z tejto dvojice a napokon na slabé. */
async function pickMixedTopic(path, buckets) {
  const preferSilne = Math.random() < 0.7;
  const primary = preferSilne ? buckets.silne : buckets.nedotknute;
  const secondary = preferSilne ? buckets.nedotknute : buckets.silne;
  for (const bucket of [primary, secondary, buckets.slabe]) {
    if (!bucket.length) continue;
    const t = await pickValidFromCandidates(path, bucket);
    if (t) return t;
  }
  return null;
}

/* PRE mode 'pair': páry sú PEVNÁ štruktúra A(2k-1)+A(2k) (nezávisle voliteľné
   okruhy tu neexistujú, na rozdiel od dual-pool) – "topic1 na precvičenie"
   preto znamená: nájdi pár, KTORÉHO JEDEN člen padne do cieľového koša
   (slabé→nedotknuté→silné fallback), ten člen polož ako topic1, druhý
   člen páru (nevyhnutne "čokoľvek to je" – páry sa nedajú rozpojiť) ako
   topic2. Presnú 70/30 váhu na topic2 tu preto NEVIEME zaručiť (štruktúra
   páru ju neumožňuje) – zdokumentované, nie obídené. */
async function pickPairMixedTopics(path, count, percentMap) {
  const pairCount = Math.floor(count / 2);
  const pairs = [];
  for (let k = 0; k < pairCount; k++) {
    const n1 = k * 2 + 1, n2 = k * 2 + 2;
    pairs.push({ n1, n2, b1: classifyOkruhPercent(percentMap, n1), b2: classifyOkruhPercent(percentMap, n2) });
  }

  let candidatePairs = null;
  let matchedBucket = null;
  for (const bucket of ['slabe', 'nedotknute', 'silne']) {
    const found = pairs.filter(p => p.b1 === bucket || p.b2 === bucket);
    if (found.length) { candidatePairs = found; matchedBucket = bucket; break; }
  }
  if (!candidatePairs) return [];

  const order = [...candidatePairs];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const maxAttempts = Math.min(6, order.length);
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const p = order[attempt];
    const weakN = p.b1 === matchedBucket ? p.n1 : p.n2;
    const otherN = weakN === p.n1 ? p.n2 : p.n1;
    const [t1, t2] = await Promise.all([fetchOkruh(path, weakN), fetchOkruh(path, otherN)]);
    if (t1 && t2) return [t1, t2]; // t1 = "na precvičenie", vždy prvý
  }
  return [];
}

/* ============================================================
   LOSOVANIE KOLA – dispatch podľa AREA_CONFIG danej oblasti.
============================================================ */
async function pickExamTopics(areaName, nick) {
  const config = AREA_CONFIG[areaName];
  if (!config) return [];

  const minStudied = ECONOMY_CONFIG.STATNICE.MIXED_SELECTION_MIN_STUDIED ?? 3;

  if (config.mode === 'dual-pool') {
    // Náhodne urč, ktorý bazén dostane rolu "na precvičenie" a ktorý
    // "zmiešaný" – nezávislé od hmotné/procesné delenia, ktoré zostáva
    // zachované (vždy presne 1 z každého bazéna).
    const weakPoolIdx = Math.random() < 0.5 ? 0 : 1;

    const results = await Promise.all(config.pools.map(async (p, idx) => {
      const percentMap = await fetchPercentMapSafe(nick, p.progressAreaTitle, p.count);
      const studied = percentMap ? countStudied(percentMap, p.count) : -1;

      if (!percentMap || studied < minStudied) {
        return pickSingleFromPool(p.path, p.count); // poistka (zlyhanie/nováčik) – dnešné správanie
      }
      const buckets = bucketizeByPercent(percentMap, p.count);
      return idx === weakPoolIdx ? pickWeakTopic(p.path, buckets) : pickMixedTopic(p.path, buckets);
    }));

    if (results.some(t => !t)) return [];
    results.forEach((t, i) => { t.label = config.pools[i].label; });
    return results;
  }

  // mode === 'pair'
  const percentMap = await fetchPercentMapSafe(nick, config.progressAreaTitle, config.pool.count);
  const studied = percentMap ? countStudied(percentMap, config.pool.count) : -1;
  if (!percentMap || studied < minStudied) {
    return pickPairTopics(config.pool.path, config.pool.count); // poistka (zlyhanie/nováčik) – dnešné správanie
  }
  return pickPairMixedTopics(config.pool.path, config.pool.count, percentMap);
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
   "Krok B" Claude API. Vracia rovnaký tvar ako predtým + terminológiu:
   { covered, missing, incorrect, coverage, contentCoverage,
     terminologyScore, missingTerms, onTopic }

   Hodnotí sa POKRYTIE, nie doslovná zhoda: každý bod sa overuje cez
   prítomnosť JEHO VLASTNÝCH podstatných slov v odpovedi (parafráza/
   iné poradie/iná učebnica neprekáža, pokým zaznejú nosné pojmy bodu).
   `incorrect` (vecne zlé tvrdenia) lokálne spoľahlivo nevieme
   rozpoznať – ostáva vždy prázdne (poctivo priznané obmedzenie).
============================================================ */
/* POINT_COVERAGE_RATIO, TERMINOLOGY_WEIGHT, MIN_ANSWER_WORDS a
   GRADE_THRESHOLDS žijú v ECONOMY_CONFIG.STATNICE (economyConfig.js) –
   rekalibrácia 2026-07-17, dôvod tamtiež v komentári. Lokálne aliasy len
   pre čitateľnosť nižšie. */
const POINT_COVERAGE_RATIO = ECONOMY_CONFIG.STATNICE.POINT_COVERAGE_RATIO;
const TERMINOLOGY_WEIGHT = ECONOMY_CONFIG.STATNICE.TERMINOLOGY_WEIGHT;

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

function evaluateCoverage(userText, keyPoints, glossary) {
  const userWords = new Set(significantWords(userText));
  const covered = [];
  const missing = [];

  (keyPoints || []).forEach(point => {
    if (userWords.size && isPointCovered(point, userWords)) covered.push(point);
    else missing.push(point);
  });

  const total = keyPoints ? keyPoints.length : 0;
  const contentCoverage = total ? Math.round((covered.length / total) * 100) : 0;

  // Terminológia: koľko z 5 kurátorovaných pojmov okruhu (tiles) študent
  // reálne použil. Rovnaké prefixové porovnanie ako pri kľúčových bodoch,
  // aby skloňované tvary pojmu neboli nespravodlivo "nepoužité".
  const glossaryTerms = glossary || [];
  const usedTerms = [];
  const missingTerms = [];
  glossaryTerms.forEach(term => {
    const termWords = significantWords(term);
    const isUsed = userWords.size > 0 && termWords.length > 0 &&
      termWords.some(w => [...userWords].some(uw => wordsMatch(w, uw)));
    if (isUsed) usedTerms.push(term); else missingTerms.push(term);
  });
  const terminologyScore = glossaryTerms.length ? Math.round((usedTerms.length / glossaryTerms.length) * 100) : null;

  // Ak okruh nemá glosár (napr. staršie dáta bez tiles), terminológia sa
  // nezapočítava (vypadne, nie 0 %) – rovnaká zásada ako pri chýbajúcej
  // aktivite v osobnom prehľade progresu (Fáza 3).
  const coverage = terminologyScore === null
    ? contentCoverage
    : Math.round(contentCoverage * (1 - TERMINOLOGY_WEIGHT) + terminologyScore * TERMINOLOGY_WEIGHT);

  const onTopic = userWords.size > 0 && (covered.length >= 1 || contentCoverage >= ON_TOPIC_MIN_THRESHOLD);

  // Anti-gaming (Fáza D rekalibrácia): odpoveď kratšia než rozumné minimum
  // nemôže dostať 1 ani 2 bez ohľadu na to, čo skóre napočíta – bráni sa tým
  // holému vymenovaniu pojmov naraz s ich terminologickým "bonusom" vyššie.
  // Počíta sa zo VŠETKÝCH slov (nie len significantWords), aby aj odpoveď
  // zložená hlavne zo spojok/predložiek nedostala kredit za dĺžku.
  const tooShort = normalizeWords(userText).length < ECONOMY_CONFIG.STATNICE.MIN_ANSWER_WORDS;

  return { covered, missing, incorrect: [], coverage, contentCoverage, terminologyScore, missingTerms, onTopic, tooShort };
}

/* ============================================================
   GRADER ROZHRANIE (Fáza 1, 2026-07-18) – jednotné rozhranie okolo
   hodnotenia odpovede, NEZÁVISLÉ od toho, ČÍM sa reálne počíta (dnes:
   lokálny evaluateCoverage() vyššie; neskôr: LLM endpoint /api/grade-answer,
   Fáza 2/3). Zvyšok statnice.js volá VÝHRADNE gradeAnswer(), NIKDY priamo
   evaluateCoverage() – to umožňuje vymeniť backend (Fáza 3) bez zásahu
   kdekoľvek inde.

   ⚠️ FÁZA 1: SPRÁVANIE SA NEMENÍ. Toto je tenký async wrapper, ktorý vo
   vnútri volá dnešný lokálny evaluateCoverage() a vráti PRESNE to isté
   (vrátane polí coverage/missingTerms/onTopic/tooShort, ktoré zvyšok
   súboru už používa – nie sú súčasťou minimálneho kontraktu nižšie, ale
   ich odstránenie by TERAZ zmenilo správanie, čo táto fáza výslovne
   zakazuje). Fáza 3 tu pridá skutočné POST volanie na server s fallbackom
   späť na evaluateCoverage() – volajúci (enterHodnotenie) sa nezmení.

   `summary` parameter je zatiaľ NEPOUŽITÝ – dnešný lokálny evaluátor ho
   nepotrebuje (pracuje z už extrahovaných keyPoints), ale budúci LLM
   grader ho bude potrebovať na posúdenie vecnej správnosti (incorrect[]),
   preto je v signatúre už teraz (topic.summary od fetchOkruh() vyššie).

   Minimálny kontrakt (spoločný pre lokálny aj budúci LLM grader):
   { covered, missing, incorrect, contentCoverage, terminologyScore }
============================================================ */
async function gradeAnswer({ summary, keyPoints, glossary, answerText }) {
  return evaluateCoverage(answerText, keyPoints, glossary);
}

/* Doplňujúca otázka cielená na KONKRÉTNY chýbajúci bod (missing[0]),
   nie opakovanie pôvodnej otázky – lokálny substitút za Claude API
   volanie "polož jednu doplňujúcu otázku smerujúcu na tento bod". */
function buildFollowUpMessage(missing, title, personaKey) {
  const p = getPersona(personaKey);
  if (!missing || !missing.length) return p.followUpGeneric(title);
  return p.followUp(missing[0]);
}

/* Záverečná spätná väzba – lokálny substitút, rovnaký tvar ako Claude API.
   Kalibrácia presne podľa zadania: 1 = coverage≥85 a žiadne incorrect,
   2 = 65-84, 3 = 45-64, 4 = <45 alebo závažné vecné chyby.

   ⚠️ NEMENNÁ ZÁSADA: znamka sa počíta VÝLUČNE z `evaluations` (avg
   coverage + anyIncorrect) a `hintsUsed` (rovnaký strop pre všetky
   persóny, ECONOMY_CONFIG.STATNICE.HINT_GRADE_FLOOR) – ÚPLNE rovnako
   bez ohľadu na personaKey. Ten sa použije AŽ NIŽŠIE, len na
   sformulovanie textu (silne/medzery/odporucania/zaver). Rovnaká
   odpoveď + rovnaký počet nápovied => rovnaká známka u všetkých
   troch persón, vždy. */
function buildFinalFeedback(evaluations, topics, personaKey, hintsUsed = 0) {
  const avg = evaluations.reduce((s, e) => s + e.coverage, 0) / evaluations.length;
  const anyIncorrect = evaluations.some(e => e.incorrect && e.incorrect.length);
  const anyTooShort = evaluations.some(e => e.tooShort);

  // Prahy sú v ECONOMY_CONFIG.STATNICE.GRADE_THRESHOLDS (zoradené zhora),
  // prvý riadok, do ktorého avg "zapadne" (avg >= min), určuje známku.
  let znamka = ECONOMY_CONFIG.STATNICE.GRADE_THRESHOLDS.find(t => avg >= t.min).znamka;
  // Vecná chyba (keby ju lokálny substitút niekedy vedel rozpoznať) nikdy
  // nesmie vyzerať ako "výborne" – rovnaký floor-vzor ako nižšie pri nápovedi/dĺžke.
  if (anyIncorrect) znamka = Math.max(znamka, 3);

  // Nápoveda na žiadosť (Fáza D.2) znižuje NAJLEPŠIU dosiahnuteľnú známku –
  // nikdy ju nezlepší, len ju zdola obmedzí (Math.max = "aspoň takto zlá").
  const floorTable = ECONOMY_CONFIG.STATNICE.HINT_GRADE_FLOOR;
  const hintFloor = floorTable[Math.min(hintsUsed, floorTable.length - 1)];
  znamka = Math.max(znamka, hintFloor);

  // Rekalibrácia: príliš krátka odpoveď (aspoň na jednu tému) nemôže dostať
  // 1 ani 2 – nedokáže reálne demonštrovať zvládnutie látky, nech je
  // keyword-skóre akékoľvek. Rovnaký floor-vzor ako vyššie.
  if (anyTooShort) znamka = Math.max(znamka, 3);

  // Od tohto miesta nižšie sa persóna prejaví LEN v znení textu.
  const p = getPersona(personaKey);

  const silne = [];
  const medzery = [];
  const missingTermsAll = [];
  evaluations.forEach((e, i) => {
    const title = topics[i].title;
    if (e.covered.length) silne.push(p.coveredLine(title, e.covered));
    if (e.missing.length) medzery.push(p.missingLine(title, e.missing));
    // Právna terminológia (Fáza D.3) – v spätnej väzbe uveď, ktoré pojmy
    // chýbali (učí to), samostatne od obsahových medzier vyššie.
    if (e.missingTerms && e.missingTerms.length) {
      missingTermsAll.push(`Téma „${title}" – vynechané pojmy: ${e.missingTerms.join(', ')}.`);
    }
  });
  if (!silne.length) silne.push(p.noCoveredFallback);

  const odporucania = medzery.length ? p.odporucaniaWithGaps : p.odporucaniaClean;

  return { znamka, silne, medzery, odporucania, terminologyGaps: missingTermsAll, zaver: p.zaver[znamka], anyTooShort };
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
   SPEECHRECOGNITION – Zjednotené s bifľovačkou (memoryTrainer.js
   createSpeechRecognizer/isSpeechRecognitionSupported), rovnaký
   konštruktor a nastavenia. Dve vrstvy poistiek, ktoré medzi sebou
   NESMÚ kolidovať:

   1. PRVÝ .start() jednej nahrávacej relácie je VŽDY priamo vnútri
      click handlera mikrofónu (fresh user gesture) – nikdy z async
      reťazca (TTS onend / timer). Mobilné prehliadače (najmä Android
      Chrome) berú getUserMedia-viazané API ako SpeechRecognition
      seriózne (skutočne sa spýtajú/udelia povolenie) len pri priamom
      geste – to bol koreň pôvodnej mobilnej chyby ("otvorí sa, ale
      nepočúva").

   2. V RÁMCI JEDNEJ relácie (recordingSessionActive === true) sa
      prirodzené ticho (onEnd bez manuálneho zastavenia) NEberie ako
      koniec odpovede – rozpoznávanie sa potichu REŠTARTUJE (rovnaké
      povolenie, netreba nové gesto) a zbiera ĎALEJ do tej istej
      odpovede. Skúška NIKDY neprejde na ďalšiu otázku na základe
      ticha – jedine tlačidlom "Dokončiť odpoveď" alebo manuálnym
      zastavením mikrofónu. Bez tejto vrstvy by ústny výklad
      s prirodzenou pauzou na premýšľanie appka predčasne odstrihla.

   Prehrávanie otázky (TTS) sa NIKDY neprekrýva s počúvaním – mikrofón sa
   sprístupní na SKUTOČNEJ udalosti utterance.onend, vždy cez JEDNU zdieľanú
   funkciu speakThenListen() (jedna cesta pre úvodnú otázku aj každú
   doplňujúcu – žiadna druhá kópia), nikdy primárne na časovači.
   ttsFallbackDelay() je len poistka pre prípad, že onend v danom
   prehliadači vôbec nepríde – veľkorysá (odhad × 3), nech nikdy nestrieľa
   pred reálnym koncom reči. Ako druhá poistka: aj keby ju predsa spustila
   poistka priskoro, speakThenListen() aj startOrRestartRecording pred
   prechodom/pred .start() explicitne zavolajú speechSynthesis.cancel(), ak
   by TTS ešte bežalo – mikrofón sa preto nikdy nemôže spustiť do stále
   znejúcej reči komisie.
============================================================ */

/* ============================================================
   UI – FULLSCREEN OVERLAY
============================================================ */
let overlayEl = null;

/* Poistka proti dvojitému otvoreniu (mobil: ghost-click po touchende,
   netrpezlivý dvojitý ťuk kým sa čaká na econSpend/pickExamTopics/
   pickCommission bez okamžitej vizuálnej odozvy). Bez nej druhé
   prekrývajúce sa volanie openStatniceHall() môže cez closeStatniceHall()
   odstrániť overlay, ktorý práve zostavilo PRVÉ volanie – na pomalšom
   mobilnom pripojení (širšie časové okno medzi awaitmi) sa to prejaví
   ako "obrazovka preblysne a zmizne", zatiaľ čo na rýchlom PC/localhost
   je okno na kolíziu prakticky nulové. */
let statniceOpening = false;

/* Výber persóny + hlasu komisie, PRED minutím § / losovaním okruhov –
   zrušenie tu nič nestojí. Vracia Promise<{personaKey,voicePref}|null>
   (null = zatvorené bez potvrdenia). Ponúka LEN hlasy, ktoré appka
   vie reálne prehrať (žiadny sľub hlasu, ktorý zariadenie nemá) –
   ak nie je k dispozícii žiadny sk hlas, mužská/ženská voľba sa
   vôbec nezobrazí, ostane len "Bez hlasu". */
async function buildPersonaOverlay(areaName, defaultPersona, defaultVoice) {
  const el = document.createElement('div');
  el.className = 'statnice-overlay';

  const { hasSkVoice, hasMale, hasFemale } = await (async () => {
    if (!('speechSynthesis' in window)) return { hasSkVoice: false, hasMale: false, hasFemale: false };
    await ensureVoicesLoaded();
    const anySk = window.speechSynthesis.getVoices().some(v => v.lang && v.lang.toLowerCase().startsWith('sk'));
    const genders = getAvailableSkGenders();
    return { hasSkVoice: anySk, ...genders };
  })();

  /* Voľba v UI musí vždy zodpovedať tomu, čo sa reálne stane:
     - oba gendery rozlíšiteľné podľa mena hlasu → skutočná voľba Mužský/Ženský
     - žiadny SK hlas vôbec → len "Bez hlasu"
     - SK hlas JE, ale gendery sa nedajú (spoľahlivo) rozlíšiť → jeden neutrálny
       "🔊 Hlas" namiesto sľubu pohlavia, ktoré zariadenie nevie splniť */
  const canOfferBothGenders = hasMale && hasFemale;
  const voiceOptionsHtml = !hasSkVoice
    ? `<button class="btn statnice-voice-btn" data-voice="off" type="button">🔇 Bez hlasu (na tomto zariadení nie je k dispozícii slovenský hlas)</button>`
    : canOfferBothGenders
      ? `
        <button class="btn statnice-voice-btn" data-voice="m" type="button">🎙️ Mužský</button>
        <button class="btn statnice-voice-btn" data-voice="f" type="button">🎙️ Ženský</button>
        <button class="btn statnice-voice-btn" data-voice="off" type="button">🔇 Bez hlasu</button>
      `
      : `
        <button class="btn statnice-voice-btn" data-voice="voice" type="button">🔊 Hlas</button>
        <button class="btn statnice-voice-btn" data-voice="off" type="button">🔇 Bez hlasu</button>
      `;

  el.innerHTML = `
    <div class="statnice-bg"></div>
    <div class="statnice-header">
      <div class="statnice-title">⚖️ Štátnicová sieň – ${areaName}</div>
      <button class="btn statnice-close-btn" id="statnicePersonaCloseBtn" type="button">✕ Zavrieť</button>
    </div>
    <div class="statnice-content">
      <h3 style="margin-top:0;text-align:center">Vyber si skúšajúceho</h3>
      <div class="statnice-persona-grid" id="statnicePersonaGrid">
        ${Object.entries(PERSONAS).map(([key, p]) => `
          <button class="btn statnice-persona-btn" data-key="${key}" type="button">
            <div class="statnice-persona-emoji">${p.emoji}</div>
            <div class="statnice-persona-label">${p.label}</div>
            <div class="small muted">${p.desc}</div>
          </button>
        `).join('')}
      </div>
      <div style="margin-top:20px">
        <div style="font-weight:600;margin-bottom:8px">Hlas komisie</div>
        <div class="statnice-voice-grid" id="statniceVoiceGrid">${voiceOptionsHtml}</div>
      </div>
      <button class="btn btn-primary statnice-ready-btn" id="statnicePersonaContinueBtn" type="button" disabled style="margin-top:24px">Pokračovať →</button>
    </div>
  `;
  document.body.appendChild(el);
  document.body.style.overflow = 'hidden';

  return new Promise((resolve) => {
    let personaKey = hasOwnPersona(defaultPersona) ? defaultPersona : null;
    // Ulož. voľba z minula sa prevezme LEN ak zodpovedá tomu, čo sa TERAZ na
    // tomto zariadení reálne dá splniť – inak (napr. uložené 'f' z iného
    // zariadenia, tu je gender neistý/chýba) sa nepoužije potichu, nech si
    // študent vyberie znova z toho, čo je naozaj k dispozícii.
    const validVoicePrefs = !hasSkVoice ? ['off'] : canOfferBothGenders ? ['m', 'f', 'off'] : ['voice', 'off'];
    let voicePref = validVoicePrefs.includes(defaultVoice) ? defaultVoice : (hasSkVoice ? null : 'off');
    let settled = false;

    function finish(result) {
      if (settled) return;
      settled = true;
      el.remove();
      document.body.style.overflow = '';
      resolve(result);
    }

    function updateContinueEnabled() {
      el.querySelector('#statnicePersonaContinueBtn').disabled = !(personaKey && voicePref);
    }

    el.querySelectorAll('.statnice-persona-btn').forEach(btn => {
      if (btn.dataset.key === personaKey) btn.classList.add('active');
      btn.onclick = () => {
        personaKey = btn.dataset.key;
        el.querySelectorAll('.statnice-persona-btn').forEach(b => b.classList.toggle('active', b === btn));
        updateContinueEnabled();
      };
    });

    el.querySelectorAll('.statnice-voice-btn').forEach(btn => {
      if (btn.dataset.voice === voicePref) btn.classList.add('active');
      btn.onclick = () => {
        voicePref = btn.dataset.voice;
        el.querySelectorAll('.statnice-voice-btn').forEach(b => b.classList.toggle('active', b === btn));
        updateContinueEnabled();
      };
    });

    updateContinueEnabled();

    el.querySelector('#statnicePersonaContinueBtn').onclick = () => {
      if (!personaKey || !voicePref) return;
      finish({ personaKey, voicePref });
    };
    el.querySelector('#statnicePersonaCloseBtn').onclick = () => finish(null);
    el.onclick = (e) => { if (e.target === el) finish(null); };
  });
}

function hasOwnPersona(key) {
  return Object.prototype.hasOwnProperty.call(PERSONAS, key || '');
}

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
          <button class="btn btn-primary" id="statniceSubmitBtn" type="button">✅ Dokončiť odpoveď</button>
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
  if (statniceOpening) return; // už prebieha otváranie (ghost-click/dvojitý ťuk na mobile)
  statniceOpening = true;
  try {
  if (!isStatniceAvailable(areaName)) {
    const available = Object.keys(AREA_CONFIG).join(', ');
    showRewardToast(`⚖️ Štátnicová sieň je zatiaľ dostupná len pre: ${available}.`);
    return;
  }

  const nick = getNick();
  if (!nick) { showRewardToast('Najprv si zadaj nick.'); return; }

  // Výber persóny skúšajúceho + hlasu, PRED minutím § – zrušenie tu je zadarmo.
  const savedPersona = localStorage.getItem(EXAM_PERSONA_KEY) || DEFAULT_PERSONA;
  const savedVoice = localStorage.getItem(EXAM_VOICE_KEY) || 'off';
  const choice = await buildPersonaOverlay(areaName, savedPersona, savedVoice);
  if (!choice) return; // zrušené na výberovej obrazovke
  const { personaKey, voicePref } = choice;
  localStorage.setItem(EXAM_PERSONA_KEY, personaKey);
  localStorage.setItem(EXAM_VOICE_KEY, voicePref);
  const persona = getPersona(personaKey);
  const examVoice = await resolveExamVoice(voicePref);

  const cost = ECONOMY_CONFIG.STATNICE.EXAM_COST;
  const paid = await econSpend(nick, cost, 'štátnicová skúška – vstup');
  if (!paid) {
    showRewardToast(`Nemáš dosť § (${cost}§). Získaj § v bifľovačke alebo dueloch.`);
    return;
  }

  const topics = await pickExamTopics(areaName, nick);
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
  // Ktoré konkrétne body sa v tejto téme UŽ pýtali cez doplňujúcu otázku –
  // zabraňuje opakovaniu TOHO ISTÉHO bodu, aj keby ho matcher po doplnení
  // stále vyhodnotil ako nepokrytý (parafráza/skratka mimo dosahu prefix-
  // matchingu). Pozri enterHodnotenie/offerHint nižšie.
  const hintedPoints = [[], []];
  let currentIdx = 0;

  let recognizer = null;
  let listening = false;
  // true od prvého klepnutia na mikrofón (skutočné gesto) až po manuálne
  // zastavenie/odoslanie – kým je true, prirodzené ticho (onEnd) REŠTARTUJE
  // rozpoznávanie namiesto ukončenia odpovede (viď startOrRestartRecording).
  let recordingSessionActive = false;
  let restartFailCount = 0;
  const MAX_RECORDING_RESTART_FAILS = 3;
  let prepTimerHandle = null;
  // JEDNA zdieľaná poistková časomiera pre CELÝ prechod "komisia dohovorila
  // → mikrofón dostupný" – používa ju výhradne speakThenListen() nižšie,
  // naprieč úvodnou otázkou aj každou doplňujúcou (žiadna druhá kópia).
  let speechTransitionTimer = null;

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
    recordingSessionActive = false; // manuálne/definitívne zastavenie – onEnd nižšie nesmie reštartovať
    if (recognizer) { try { recognizer.stop(); } catch (e) {} }
    listening = false;
    micBtn.classList.remove('statnice-mic-recording');
    micBtn.textContent = '🎤 Mikrofón';
  }

  /* ============================================================
     speakThenListen() – JEDNA cesta pre "komisia hovorí → mikrofón
     dostupný", spoločná pre ÚVODNÚ otázku aj KAŽDÚ doplňujúcu (predtým dve
     štruktúrne zhodné, ale samostatne udržiavané kópie – goToListening v
     enterVyzvanie a goBack v offerHint – teraz jedna funkcia, žiadna
     možnosť, aby sa časom rozišli).

     PRAVIDLO BEZ VÝNIMKY: kým komisia hovorí, mikrofón je VŽDY zatvorený –
     recognizer sa vytvára VÝHRADNE na klik (startOrRestartRecording sa
     volá len z micBtn.onclick alebo z jeho vlastného onEnd/onError počas
     UŽ AKTÍVNEJ relácie, pozri nižšie). Táto funkcia teda nikdy nespúšťa
     nahrávanie – len prepne fázu do POCUVANIE (zobrazí tlačidlo mikrofónu),
     AŽ POTOM čo skutočne skončí reč komisie.

     SKUTOČNÝ spúšťač je vždy utterance.onend (odovzdané ako onEnd nižšie).
     ttsFallbackDelay() časovač je VÝHRADNE poistka pre prípad, že onend v
     danom prehliadači/zariadení vôbec nepríde (zdokumentovaný okrajový
     prípad Web Speech API) – nikdy primárny mechanizmus. Pred prechodom do
     POCUVANIE (nech prišiel z onend, alebo z poistky) ešte raz explicitne
     umlčí prípadne stále bežiace TTS, nech sa za žiadnych okolností
     nezachytí vlastný hlas komisie.

     ⚠️ DOLNÁ HRANICA (druhá, nezávislá poistka): aj SKUTOČNÝ onend, ktorý
     príde nápadne skoro, je nedôveryhodný – ten istý zdokumentovaný
     Chrome/Android bug (viď speakOrSkip vyššie) vie spôsobiť takmer
     okamžitý onend ešte predtým, než z reproduktora zaznie čokoľvek.
     Preto sa fáza nikdy neprepne skôr, než uplynie aspoň minElapsedMs
     (úmerné dĺžke textu) od začiatku prejavu – ak onend/poistka prídu
     skôr, počká sa do tejto hranice namiesto okamžitého prechodu. Toto
     robí chybu "mikrofón chytí hlas avatara" neopakovateľnou KONŠTRUKČNE,
     bez ohľadu na to, či je onend v danom prehliadači spoľahlivý. */
  function speakThenListen(text, afterSpeaking) {
    let advanced = false;
    let minWaitTimer = null;
    const minElapsedMs = examVoice ? Math.max(1200, Math.round(estimateSpeechMs(text) * 0.4)) : 0;
    const startedAt = Date.now();

    const proceed = () => {
      if (advanced) return;
      const remaining = minElapsedMs - (Date.now() - startedAt);
      if (remaining > 0) {
        clearTimeout(minWaitTimer);
        minWaitTimer = setTimeout(proceed, remaining);
        return;
      }
      advanced = true;
      clearTimeout(speechTransitionTimer);
      clearTimeout(minWaitTimer);
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      afterSpeaking();
    };

    if (examVoice) {
      speakOrSkip(text, examVoice, { onEnd: proceed });
      clearTimeout(speechTransitionTimer);
      speechTransitionTimer = setTimeout(proceed, ttsFallbackDelay(text));
    } else {
      proceed(); // bez hlasu (vypnuté alebo žiadny sk hlas) – rovno ďalej, žiadne čakanie
    }
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

    const prompt = idx === 0 ? persona.greet(topic.title) : persona.next(topic.title);
    msgEl.style.display = 'block';
    msgEl.innerHTML = `<strong>Komisia (${persona.emoji} ${persona.label}):</strong> ${prompt}`;

    speakThenListen(prompt, enterPocuvanie);
  }

  /* ---------- POCUVANIE – nahrávanie s prirodzenými pauzami ---------- */
  function enterPocuvanie() {
    setPhase('POCUVANIE');
    recordingSessionActive = false;
    restartFailCount = 0;

    if (!isSpeechRecognitionSupported()) {
      micStatusEl.textContent = '🔇 Rozpoznávanie reči nie je v tomto prehliadači dostupné – napíš odpoveď a klikni „Dokončiť odpoveď".';
      micBtn.style.display = 'none';
      return; // textarea je vždy viditeľná a funkčná – skúška beží aj bez mikrofónu
    }
    micBtn.style.display = '';
    resetMicUI('Klikni na mikrofón a hovor – pauzy na premýšľanie nevadia, mikrofón sám pokračuje v počúvaní. Odpoveď ukonči tlačidlom „Dokončiť odpoveď", alebo píš rovno do poľa nižšie.');
  }

  function resetMicUI(message) {
    micBtn.classList.remove('statnice-mic-recording');
    micBtn.textContent = '🎤 Mikrofón';
    if (message) micStatusEl.textContent = message;
  }

  /* Spustí (alebo po prirodzenom tichu AUTO-REŠTARTUJE) rozpoznávanie v rámci
     JEDNEJ nahrávacej relácie (recordingSessionActive). Volané buď:
     a) PRIAMO z klik handlera mikrofónu – prvý štart tejto relácie, VŽDY
        skutočné user gesto (rovnaký vzor ako memory-trainer.html
        setupMicButton – tu sa reálne prvýkrát pýta povolenie mikrofónu), alebo
     b) z onEnd() callbacku PO tichu, KEĎ relácia ešte beží – toto je reštart
        PO UŽ UDELENOM povolení pre tento pôvod (origin), nie nová žiadosť oň.
        Web Speech API (Chrome/Android aj desktop) vyžaduje gesto len na PRVÉ
        schválenie povolenia; ďalšie .start() v tej istej relácii bez gesta
        bežne funguje presne z tohto dôvodu. Ak by na niektorom mobile predsa
        len zlyhávalo (nedá sa to overiť bez fyzického zariadenia), onError
        nižšie po MAX_RECORDING_RESTART_FAILS pokusoch prestane skúšať a
        vráti študenta na manuálne klikanie (bezpečná záloha, nie ticho). */
  function startOrRestartRecording() {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      // Poistka proti zachyteniu vlastného hlasu komisie – ak by TTS z
      // akéhokoľvek dôvodu ešte fyzicky dobiehalo, radšej ho rovno utíš,
      // než riskovať, že mikrofón nahrá ozvenu avatara.
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    recognizer = createSpeechRecognizer({
      onStart: () => {
        listening = true;
        restartFailCount = 0;
        micBtn.classList.add('statnice-mic-recording');
        micBtn.textContent = '⏹️ Dokončiť nahrávanie';
        micStatusEl.textContent = '🔴 Počúvam… (pauzy nevadia, pokračujem)';
      },
      onEnd: () => {
        listening = false;
        if (recordingSessionActive) {
          // Prirodzené ticho, NIE manuálne zastavenie – pokračuj v TEJ ISTEJ
          // odpovedi, neposúvaj na ďalšiu otázku.
          micStatusEl.textContent = '⏳ Krátka pauza… pokračujem v počúvaní.';
          startOrRestartRecording();
          return;
        }
        resetMicUI('⏸️ Mikrofón vypnutý – klikni pre pokračovanie, alebo „Dokončiť odpoveď".');
      },
      onError: (e) => {
        listening = false;
        restartFailCount++;
        console.warn('⚠️ [ŠTÁTNICE] Rozpoznávanie hlasu zlyhalo', e, 'pokus', restartFailCount);
        const fatal = e && (e.error === 'not-allowed' || e.error === 'service-not-allowed');
        if (!recordingSessionActive) return; // už manuálne zastavené, nič nereštartuj
        if (fatal || restartFailCount > MAX_RECORDING_RESTART_FAILS) {
          // ⚠️ VYPNI auto-reštart a VYZVI študenta – NIKDY nezavolaj odtiaľto
          // enterHodnotenie()/advanceQuestion(). Doteraz nadiktovaný text v
          // answerInput.value ostáva netknutý, len prestane pribúdať; skúšku
          // dokončí výhradne explicitný klik na "Dokončiť odpoveď" nižšie.
          recordingSessionActive = false;
          resetMicUI('🔇 Mikrofón nezachytil odpoveď (povolenie zamietnuté alebo opakovaná chyba) – pokojne napíš odpoveď a klikni „Dokončiť odpoveď".');
          return;
        }
        // Prechodná chyba (napr. no-speech) – skús znova v tej istej relácii.
        startOrRestartRecording();
      },
      onResult: (transcript) => {
        // ⚠️ Vždy PRIPÁJA k aktuálnej hodnote textarey – tá sa naprieč reštartmi
        // (onEnd → startOrRestartRecording) NIKDE nemaže, takže doteraz
        // zozbieraný text prežije každý reštart aj v polovici vety.
        if (!transcript) return;
        const current = (answerInput.value || '').trim();
        answerInput.value = current ? `${current} ${transcript}` : transcript;
        answers[currentIdx] = answerInput.value;
        liveTranscriptEl.textContent = answerInput.value;
      }
    });

    if (!recognizer) {
      recordingSessionActive = false;
      micStatusEl.textContent = '🔇 Rozpoznávanie reči zlyhalo – napíš odpoveď a klikni „Dokončiť odpoveď".';
      micBtn.style.display = 'none';
      return;
    }
    recognizer.start();
  }

  micBtn.onclick = () => {
    if (recordingSessionActive) {
      // Manuálne zastavenie – na rozdiel od prirodzeného ticha sa NEreštartuje.
      stopListening();
      resetMicUI('⏸️ Mikrofón vypnutý – klikni pre pokračovanie, alebo „Dokončiť odpoveď".');
      return;
    }
    if (examPhase === 'POCUVANIE') {
      recordingSessionActive = true;
      restartFailCount = 0;
      startOrRestartRecording(); // priamo v klik handleri = skutočné user gesto
    }
  };

  overlayEl.querySelector('#statniceSubmitBtn').onclick = async () => {
    // Poistka proti rýchlemu dvojkliku počas VYZVANIE/HODNOTENIE (kým komisia ešte
    // "hovorí"/vyhodnocuje) – zabraňuje pretekaniu dvoch stavových prechodov naraz.
    if (examPhase !== 'POCUVANIE') return;
    answered = true;
    stopListening();
    await enterHodnotenie(currentIdx, (answerInput.value || '').trim());
  };

  /* ---------- HODNOTENIE – Claude API kontrakt (lokálny substitút) ---------- */
  /* ⚠️ NÁPOVEDA JE NA ŽIADOSŤ ŠTUDENTA, nikdy automaticky od komisie – ak by
     komisia navádzala sama od seba, persóna by nepriamo ovplyvňovala známku
     (podporujúci pôsobí "ochotnejšie" navádzať → vyššie skóre → žiadna
     persóna by nemenila skóre rovnako), čo porušuje zásadu "persóna nemení
     známku". Študent vidí VOPRED presne o koľko si nápoveda zníži najlepšiu
     dosiahnuteľnú známku (HINT_GRADE_FLOOR), a počet/cena sú identické pre
     všetky tri persóny – len ZNENIE nápovede sa líši (buildFollowUpMessage). */
  let hintsUsed = 0;

  async function enterHodnotenie(idx, transcript) {
    setPhase('HODNOTENIE');
    answered = true;
    answers[idx] = transcript;

    const topic = topics[idx];
    // ⚠️ VŽDY prepočítané NANOVO z aktuálneho (celého, priebežne doplneného)
    // prepisu – nikdy sa neopakuje/nedrží predchádzajúci výsledok. Toto je
    // jediné miesto, kde sa `missing` počíta, a volá sa pri KAŽDOM uzavretí
    // odpovede (aj po doplňujúcej otázke), nie len pri prvom pokuse.
    // gradeAnswer() – JEDINÉ miesto, cez ktoré statnice.js hodnotenie volá
    // (nikdy priamo evaluateCoverage() – pozri komentár pri gradeAnswer()).
    const result = await gradeAnswer({
      summary: topic.summary, keyPoints: topic.keyPoints, glossary: topic.glossary, answerText: transcript
    });
    console.log('[ŠTÁTNICE] Hodnotenie:', result);
    evaluations[idx] = result;

    // Nepýtaj sa druhýkrát na TEN ISTÝ bod, na ktorý sa komisia už raz
    // pýtala doplňujúcou otázkou v tejto téme – ak ho matcher aj po
    // doplnení stále vyhodnotí ako nepokrytý (napr. skratka vyslovená po
    // písmenách sa neprepíše na skratku v texte), opakovaná identická
    // otázka pôsobí, akoby komisia nepočúvala, čo je pre dôveryhodnosť
    // skúšky horšie než príp. neistota v samotnej známke. Známka/spätná
    // väzba (evaluations[idx] vyššie) zostáva na plnom, neupravenom
    // výsledku – filtruje sa LEN výber ďalšej doplňujúcej otázky.
    const offerable = result.missing.filter(p => !hintedPoints[idx].includes(p));

    const canOfferHint = offerable.length > 0 && followUpCounts[idx] < MAX_FOLLOWUPS_PER_QUESTION;
    if (canOfferHint) {
      offerHint(idx, { ...result, missing: offerable });
    } else {
      advanceQuestion(idx);
    }
  }

  function offerHint(idx, result) {
    const floorTable = ECONOMY_CONFIG.STATNICE.HINT_GRADE_FLOOR;
    const nextFloor = floorTable[Math.min(hintsUsed + 1, floorTable.length - 1)];

    msgEl.style.display = 'block';
    msgEl.innerHTML = `
      <strong>Komisia (${persona.emoji} ${persona.label}):</strong> Odpoveď má medzery.
      Môžeš požiadať o nápovedu, ale KAŽDÁ nápoveda zníži najlepšiu dosiahnuteľnú
      známku (táto by ju obmedzila najviac na ${nextFloor}).
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" id="statniceHintBtn" type="button">💡 Chcem nápovedu (max. ${nextFloor})</button>
        <button class="btn btn-primary" id="statniceSkipHintBtn" type="button">➡️ Pokračovať bez nápovedy</button>
      </div>
    `;

    overlayEl.querySelector('#statniceHintBtn').onclick = () => {
      followUpCounts[idx]++;
      hintsUsed++;
      hintedPoints[idx].push(result.missing[0]); // presne ten bod, na ktorý sa teraz spýta – nabudúce sa naň už nespýta znova
      const followUpText = buildFollowUpMessage(result.missing, topics[idx].title, personaKey);
      msgEl.innerHTML = `<strong>Komisia (${persona.emoji} doplňujúca otázka):</strong> ${followUpText}`;
      liveTranscriptEl.textContent = '';

      speakThenListen(followUpText, enterPocuvanie);
    };

    overlayEl.querySelector('#statniceSkipHintBtn').onclick = () => advanceQuestion(idx);
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

    const feedback = buildFinalFeedback(evaluations, topics, personaKey, hintsUsed);
    console.log('[ŠTÁTNICE] Záverečná spätná väzba:', feedback);

    const gradeEl = overlayEl.querySelector('#statniceGrade');
    gradeEl.textContent = `Známka: ${feedback.znamka}`;

    const rewardAmount = await awardExamResult(nick, feedback.znamka);
    rewardGranted = true;
    await saveExamResult(nick, feedback.znamka, areaName);

    const fbEl = overlayEl.querySelector('#statniceFeedback');
    fbEl.innerHTML = `
      ${hintsUsed > 0 ? `<div class="small muted">Použité nápovede: ${hintsUsed} (znížili najlepšiu dosiahnuteľnú známku).</div>` : ''}
      ${feedback.anyTooShort ? `<div class="small muted">Odpoveď na aspoň jednu tému bola príliš krátka na spoľahlivé posúdenie – obmedzilo to najlepšiu dosiahnuteľnú známku.</div>` : ''}
      <div class="statnice-fb-section"><strong>Silné stránky</strong><ul>${feedback.silne.map(s => `<li>${s}</li>`).join('')}</ul></div>
      ${feedback.medzery.length ? `<div class="statnice-fb-section"><strong>Medzery</strong><ul>${feedback.medzery.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
      ${feedback.terminologyGaps.length ? `<div class="statnice-fb-section"><strong>Právna terminológia – chýbajúce pojmy</strong><ul>${feedback.terminologyGaps.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
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
    // recordingSessionActive MUSÍ ísť na false PRED recognizer.stop() – inak by
    // onEnd() (asynchrónny, príde chvíľu po .stop()) videl reláciu stále ako
    // "aktívnu" a nečakane by ju sám reštartoval aj počas zatvárania/potvrdenia.
    recordingSessionActive = false;
    if (recognizer) { try { recognizer.stop(); } catch (e) {} }
    clearInterval(prepTimerHandle);
    clearTimeout(speechTransitionTimer);

    if (answered && !rewardGranted) {
      const ok = window.confirm('Ukončiť skúšku? § sa nevráti, ak si už odpovedal/a.');
      if (!ok) {
        // Návrat presne do stavu pred pokusom o zatvorenie (nie natvrdo do POCUVANIE).
        // Nahrávanie (ak bežalo) sa nerestartuje automaticky – rozpoznávač je teraz
        // jednorazový na klik (fresh gesture), nie continuous session; študent
        // jednoducho klikne mikrofón znova, ak chce pokračovať v diktovaní.
        setPhase(phaseBeforeClose);
        if (phaseBeforeClose === 'POCUVANIE' && wasListening) {
          micStatusEl.textContent = '⏸️ Nahrávanie sa zastavilo – klikni na mikrofón pre pokračovanie, alebo píš.';
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
  } catch (e) {
    // Bez tohto by akákoľvek chyba pred vykreslením overlaya (napr. sieťová
    // chyba pri sťahovaní okruhov na nestabilnom mobilnom pripojení) skončila
    // ako tichý "unhandled promise rejection" – klik na tlačidlo by vyzeral,
    // akoby sa nestalo vôbec nič. Radšej viditeľná hláška než ticho.
    console.error('⚠️ [ŠTÁTNICE] openStatniceHall zlyhalo', e);
    showRewardToast('⚖️ Štátnicovú sieň sa nepodarilo otvoriť. Skús to prosím znova.');
  } finally {
    statniceOpening = false;
  }
}
