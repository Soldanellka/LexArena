'use strict';

/* ============================================================
   scripts/statnice.js
   Štátnicová sieň – interaktívna komisia (v2), zatiaľ len pre
   Pracovné právo.

   ⚠️ VYHODNOTENIE JE LOKÁLNE, NIE CEZ CLAUDE API.
   Zadanie žiada volať api.anthropic.com/v1/messages bez API kľúča
   ("rieši prostredie"). To z reálneho statického Vercel hostingu
   (žiadne /api, žiadne miesto pre tajný kľúč) nie je technicky
   možné – buď by kľúč musel byť verejne vystavený v klientskom
   kóde (bezpečnostná chyba), alebo by bolo treba serverless
   funkciu (čo appka explicitne nemá). Namiesto tichého obchádzania
   tohto komunikujem: HODNOTENIE aj ZÁVER nižšie robí evaluateAnswer()/
   buildFinalFeedback() lokálne (rovnaký kľúčovo-slovný mechanizmus
   ako Bifľovačka, porovnávaný oproti plnému `summary` okruhu), ale
   VRACIA PRESNE TEN ISTÝ JSON TVAR, aký by vrátilo Claude API
   ({ onTopic, coverage, missing, followUp, reason } / { znamka,
   silne, medzery, odporucania, zaver }) – reálne API volanie sa dá
   neskôr zapojiť len výmenou tela týchto dvoch funkcií za fetch().

   Prepis odpovede a poznámky sa NIKDY neukladajú verejne – len
   dočasne v pamäti tejto relácie. Voliteľne sa ukladá len výsledná
   známka + dátum + oblasť do users/{nick}/examResults.
============================================================ */

import { econSpend, econAward, ECONOMY_CONFIG } from './economy.js';
import { getAvatarCatalog, getTalarAvatars, avatarStateSrc } from './avatarCatalog.js';
import { showRewardToast } from '../ui.js';
import { speakText, compareText } from '../memoryTrainer.js';

const LIVE = 'https://www.lexarena.sk/';
const PRACOVNE_DATA_PATH = LIVE + 'LuluLaw duel Pracovné právo/data/';
const PRACOVNE_OKRUH_COUNT = 50; // rovnaký limit ako data.js (A1-A50, A51-53 sa nepoužívajú)
const PROTOTYPE_AREA_NAME = 'Pracovné právo';

const PREP_SECONDS = 5 * 60;
const SILENCE_TIMEOUT_MS = 8000;
const SPEECH_START_FALLBACK_MS = 2000;
const TTS_FALLBACK_MS = 6000; // ak sa onEnd z TTS nespustí (nepodporovaný prehliadač a pod.)
const ON_TOPIC_MIN_THRESHOLD = 15;   // pod týmto = úplne mimo témy (guard proti falošne kladnému skóre)
const FOLLOWUP_COVERAGE_THRESHOLD = 50; // "coverage < 50" zo zadania – spúšťa doplňujúcu
const MAX_FOLLOWUPS_PER_QUESTION = 2;

function getDb() { return window.db || null; }
function getNick() { return localStorage.getItem('playerNick') || null; }

export function isStatniceAvailable(areaName) {
  return areaName === PROTOTYPE_AREA_NAME;
}

/* ============================================================
   VÝBER DVOJICE OKRUHOV (A1+A2, A3+A4, …, A49+A50) – rovnaké
   párovanie ako pojednávania (scripts/duels.js pickQuestions).
   Referenčný obsah pre komisiu = plné `summary` oboch okruhov,
   NIE kvízové otázky.
============================================================ */
/* `summary` v A*.json obsahuje okrem hlavného textu aj sekcie "Príklad:",
   "Kľúčové slová (štátnicové):" a "Zapamätaj si:" – tie sú študijná
   pomôcka (opakujú/zhrnujú tie isté pojmy), nie súvislý text, ktorý by
   niekto reprodukoval nahlas. Ponechané by umelo nafúkli počet
   extrahovaných kľúčových slov (compareText) a robili by pokrytie
   nespravodlivo prísnejšie. Pre HODNOTENIE sa preto porovnáva len
   hlavný súvislý text pred prvou z týchto sekcií. */
function trimSummaryForEvaluation(summary) {
  const text = String(summary || '');
  const markers = ['\n\nPríklad:', '\nPríklad:', '\n\nKľúčové slová', '\nKľúčové slová'];
  let cutIdx = text.length;
  for (const m of markers) {
    const idx = text.indexOf(m);
    if (idx !== -1 && idx < cutIdx) cutIdx = idx;
  }
  const trimmed = text.slice(0, cutIdx).trim();
  return trimmed || text;
}

async function fetchOkruh(n) {
  try {
    const res = await fetch(`${PRACOVNE_DATA_PATH}A${n}.json`);
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || !json.summary || !json.title) return null;
    return { id: `A${n}`, title: json.title, summary: trimSummaryForEvaluation(json.summary) };
  } catch (e) {
    return null;
  }
}

async function pickExamTopics() {
  const pairCount = Math.floor(PRACOVNE_OKRUH_COUNT / 2); // 25 dvojíc: (A1,A2)…(A49,A50)
  const triedPairs = new Set();
  const maxAttempts = Math.min(6, pairCount);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let pairIdx;
    do { pairIdx = Math.floor(Math.random() * pairCount); }
    while (triedPairs.has(pairIdx) && triedPairs.size < pairCount);
    triedPairs.add(pairIdx);

    const n1 = pairIdx * 2 + 1;
    const n2 = pairIdx * 2 + 2;
    const [t1, t2] = await Promise.all([fetchOkruh(n1), fetchOkruh(n2)]);
    if (t1 && t2) return [t1, t2];
  }
  return [];
}

/* ============================================================
   KOMISIA – 3 talárové avatary, preferencia akademických (zlatý
   pás). Katalóg zatiaľ nemá samostatné pole pre "subtyp" taláru,
   preto sa preferencia rieši mäkko cez id/name (akademik/zlatý/
   dekan/profesor/rektor); inak hocijaký talár. AK žiadny talár
   neexistuje, radšej žiadny obrázok ako civilný avatar (zadanie:
   "Nie základné civilné avatary") – zobrazí sa dekoratívny fallback.
============================================================ */
function isAcademicLike(a) {
  return /akadem|zlat|dekan|profesor|rektor/i.test(`${a?.id || ''} ${a?.name || ''}`);
}

async function pickCommission() {
  const catalog = await getAvatarCatalog();
  const talars = getTalarAvatars(catalog);
  if (!talars.length) return [];

  const academic = talars.filter(isAcademicLike);
  const pool = academic.length >= 3 ? academic : talars;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [0, 1, 2].map(i => shuffled[i % shuffled.length]);
}

/* ============================================================
   HODNOTENIE ODPOVEDE – lokálny substitút za Claude API.
   Vracia rovnaký tvar: { onTopic, coverage, missing, followUp, reason }
============================================================ */
function evaluateAnswer(userText, topic) {
  const result = compareText(userText, topic); // pkg.summary = referencia (compareText už to podporuje)
  const coverage = result.score;

  const [matchedStr, totalStr] = (result.keywordsMatched || '0/0').split('/');
  const matchedCount = parseInt(matchedStr, 10) || 0;
  const totalCount = parseInt(totalStr, 10) || 0;

  // onTopic podľa POČTU zasiahnutých kľúčových pojmov (nie len blended skóre –
  // to obsahuje aj znakovú podobnosť, ktorá pri krátkom texte vie vyjsť nenulová).
  const onTopic = matchedCount >= 1 && coverage >= ON_TOPIC_MIN_THRESHOLD;

  const missing = totalCount > matchedCount
    ? [`Chýba ${totalCount - matchedCount} z ${totalCount} kľúčových pojmov k téme „${topic.title}".`]
    : [];

  const followUp = (!onTopic || coverage < FOLLOWUP_COVERAGE_THRESHOLD)
    ? `Môžete to rozviesť a doplniť podstatné náležitosti k otázke „${topic.title}"?`
    : null;

  return { onTopic, coverage, missing, followUp, reason: result.notes, keywordsMatched: result.keywordsMatched };
}

/* Záverečná spätná väzba – lokálny substitút, rovnaký tvar ako Claude API. */
function buildFinalFeedback(evaluations, topics) {
  const avg = evaluations.reduce((s, e) => s + e.coverage, 0) / evaluations.length;
  let znamka;
  if (avg >= 85) znamka = 1;
  else if (avg >= 65) znamka = 2;
  else if (avg >= 45) znamka = 3;
  else znamka = 4;

  const silne = [];
  const medzery = [];
  evaluations.forEach((e, i) => {
    const title = topics[i].title;
    if (e.coverage >= 65) silne.push(`Téma „${title}" – dobré pokrytie kľúčových pojmov (${e.keywordsMatched}).`);
    else medzery.push(`Téma „${title}" – chýbajú kľúčové pojmy (${e.keywordsMatched}), formulácia bola nepresná.`);
  });
  if (!silne.length) silne.push('Snaha odpovedať na obe otázky.');

  const odporucania = medzery.length
    ? ['Zopakuj si dané okruhy (plné vypracovanie v štúdijnom module) a skús presnejšie právne pojmy.', 'Drž sa štruktúry: pojem → znaky → príklad → judikatúra.']
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

function buildOverlay() {
  const el = document.createElement('div');
  el.className = 'statnice-overlay';
  el.innerHTML = `
    <div class="statnice-bg"></div>
    <div class="statnice-header">
      <div class="statnice-title">⚖️ Štátnicová sieň – ${PROTOTYPE_AREA_NAME}</div>
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
    showRewardToast('⚖️ Štátnicová sieň je zatiaľ dostupná len pre Pracovné právo.');
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

  const topics = await pickExamTopics();
  if (topics.length < 2) {
    // vráť § – skúška sa nedá spustiť (nedostatok obsahu / "výpadok" pred prvou otázkou)
    await econAward(nick, cost, 'štátnicová skúška – vrátenie (nedostatok obsahu)', { skipCap: true });
    showRewardToast('⚖️ Komisia teraz nie je dostupná, skús neskôr.');
    return;
  }
  const commission = await pickCommission();

  closeStatniceHall();
  overlayEl = buildOverlay();
  document.body.style.overflow = 'hidden';

  const commissionEl = overlayEl.querySelector('#statniceCommission');
  if (commission.length) {
    commissionEl.innerHTML = commission.map(av => av
      ? `<img class="statnice-commissioner" src="${avatarStateSrc(av, 'full')}" alt="Člen komisie" onerror="this.style.display='none'">`
      : ''
    ).join('');
  } else {
    commissionEl.innerHTML = `<div class="statnice-commission-fallback">⚖️ ⚖️ ⚖️</div>`;
  }

  const topicsEl = overlayEl.querySelector('#statniceTopics');
  topicsEl.innerHTML = topics.map((t, i) => `
    <div class="statnice-topic-card">
      <div class="statnice-topic-num">Otázka ${i + 1}</div>
      <div class="statnice-topic-text">${t.title}</div>
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

    qNumEl.textContent = `Otázka ${idx + 1} / ${topics.length}`;
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
    const result = evaluateAnswer(transcript, topic);
    console.log('[ŠTÁTNICE] API hodnotenie:', result);
    evaluations[idx] = result;

    const needsFollowUp = (!result.onTopic || result.coverage < FOLLOWUP_COVERAGE_THRESHOLD || triggeredBySilence)
      && followUpCounts[idx] < MAX_FOLLOWUPS_PER_QUESTION;

    if (needsFollowUp) {
      followUpCounts[idx]++;
      const followUpText = result.followUp || 'Môžete to rozviesť a doplniť podstatné náležitosti?';
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
    await saveExamResult(nick, feedback.znamka, PROTOTYPE_AREA_NAME);

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
