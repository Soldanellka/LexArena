'use strict';

/* ============================================================
   scripts/statnice.js
   Štátnicová sieň – PROTOTYP na jednej oblasti (Pracovné právo).

   Vyhodnotenie je zámerne LOKÁLNE (porovnanie kľúčových slov cez
   compareText, rovnaký mechanizmus ako Bifľovačka), NIE cez Claude
   API: LexArena je statický Vercel hosting bez /api a bez
   bezpečného miesta pre API kľúč, takže priame volanie
   api.anthropic.com z prehliadača by buď zlyhalo, alebo by
   vyžadovalo verejne vystavený kľúč. Táto appka teda nikdy nevolá
   žiadnu externú službu – vyhodnotenie aj spätná väzba sú 100 %
   klientske.

   Prepis odpovede a poznámky sa NIKDY neukladajú verejne – len
   dočasne v pamäti tejto relácie. Voliteľne sa ukladá len výsledná
   známka + dátum + oblasť do users/{nick}/examResults (súkromná
   história hráča).
============================================================ */

import { generateMemoryPackages } from '../memoryDefinitions.js';
import { compareText } from '../memoryTrainer.js';
import { econSpend, econAward, ECONOMY_CONFIG } from './economy.js';
import { getAvatarCatalog, getTalarAvatars, avatarStateSrc } from './avatarCatalog.js';
import { showRewardToast } from '../ui.js';
import { renderSource } from './sourceUtil.js';

const PROTOTYPE_AREA_SLUG = 'pracovne';
const PROTOTYPE_AREA_NAME = 'Pracovné právo';
const PREP_SECONDS = 5 * 60;
const SILENCE_TIMEOUT_MS = 8000;
const ON_TOPIC_THRESHOLD = 15; // coverage % pod týmto = mimo témy

function getDb() { return window.db || null; }
function getNick() { return localStorage.getItem('playerNick') || null; }

/* Je Štátnicová sieň dostupná pre danú oblasť? (prototyp = len Pracovné právo) */
export function isStatniceAvailable(areaName) {
  return areaName === PROTOTYPE_AREA_NAME;
}

/* ============================================================
   VÝBER 2 NÁHODNÝCH OKRUHOV + KOMISIE (3 talárové avatary)
============================================================ */
async function pickExamTopics() {
  const packages = await generateMemoryPackages(PROTOTYPE_AREA_SLUG);
  const usable = packages.filter(p => (p.definition || p.summary || p.legalSentence || '').trim());
  if (usable.length < 2) return usable.slice(0, 2);
  const shuffled = [...usable].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

async function pickCommission() {
  const catalog = await getAvatarCatalog();
  const talars = getTalarAvatars(catalog);
  const pool = talars.length ? talars : (catalog || []).filter(a => a && a.active);
  if (!pool.length) return [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [0, 1, 2].map(i => shuffled[i % shuffled.length]);
}

/* ============================================================
   VYHODNOTENIE ODPOVEDE – lokálne, kľúčové slová (compareText)
   Vracia rovnaký tvar, aký by dal Claude: { onTopic, followUp, coverage }
============================================================ */
function evaluateAnswer(userText, topicPkg) {
  const result = compareText(userText, topicPkg);
  const coverage = result.score;

  // "onTopic" sa rozhoduje podľa POČTU zasiahnutých kľúčových pojmov,
  // nie podľa celkového (blended) skóre – to obsahuje aj znakovú
  // podobnosť, ktorá pri krátkom nezmyselnom texte vie náhodne
  // vyjsť nenulová a falošne prejsť ako "na tému".
  const [matchedStr] = (result.keywordsMatched || '0/0').split('/');
  const matchedCount = parseInt(matchedStr, 10) || 0;
  const onTopic = matchedCount >= 1 && coverage >= ON_TOPIC_THRESHOLD;

  const followUp = onTopic
    ? null
    : `Skús sa vrátiť k pôvodnej otázke – "${topicPkg.question}". Rozveď hlavné pojmy danej témy.`;
  return { onTopic, followUp, coverage, notes: result.notes, keywordsMatched: result.keywordsMatched };
}

/* Záverečná spätná väzba – z dvoch vyhodnotení postaví štruktúrovanú
   väzbu rovnakého tvaru, aký by vrátil Claude. */
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
    const topicTitle = topics[i].question || topics[i].id;
    if (e.coverage >= 65) silne.push(`Téma "${topicTitle}" – dobré pokrytie kľúčových pojmov (${e.keywordsMatched}).`);
    else medzery.push(`Téma "${topicTitle}" – chýbajú kľúčové pojmy (${e.keywordsMatched}), formulácia bola nepresná.`);
  });
  if (!silne.length) silne.push('Snaha odpovedať na obe otázky.');

  const odporucania = medzery.length
    ? ['Zopakuj si dané okruhy v Bifľovačke a skús presnejšie právne pojmy.', 'Drž sa štruktúry: pojem → znaky → príklad.']
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
   SPEECHRECOGNITION – sk-SK, fallback na text ak nedostupné
============================================================ */
function createRecognizer({ onTranscript, onSilence }) {
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

  let finalTranscript = '';
  let silenceTimer = null;

  const resetSilenceTimer = () => {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(() => onSilence(finalTranscript), SILENCE_TIMEOUT_MS);
  };

  recognizer.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalTranscript += t + ' ';
      else interim += t;
    }
    onTranscript(finalTranscript, interim);
    resetSilenceTimer();
  };
  recognizer.onerror = (e) => console.warn('⚠️ statnice: SpeechRecognition chyba', e.error);
  recognizer.onend = () => { if (silenceTimer) clearTimeout(silenceTimer); };

  return {
    start() { finalTranscript = ''; try { recognizer.start(); resetSilenceTimer(); } catch (e) {} },
    stop() { if (silenceTimer) clearTimeout(silenceTimer); try { recognizer.stop(); } catch (e) {} },
    getTranscript: () => finalTranscript
  };
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
        <div class="small muted" id="statniceMicStatus"></div>
        <textarea class="statnice-answer-input" id="statniceAnswerInput" placeholder="Odpoveď (píš alebo hovor nahlas)…"></textarea>
        <div class="statnice-answer-actions">
          <button class="btn" id="statniceMicBtn" type="button">🎤 Hovoriť</button>
          <button class="btn btn-primary" id="statniceSubmitBtn" type="button">Odovzdať odpoveď</button>
        </div>
        <div class="statnice-followup" id="statniceFollowUpBox" style="display:none"></div>
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
    // vráť § – skúška sa nedá spustiť (nedostatok obsahu)
    await econAward(nick, cost, 'štátnicová skúška – vrátenie (nedostatok obsahu)', { skipCap: true });
    showRewardToast('⚖️ Komisia teraz nie je dostupná, skús neskôr.');
    return;
  }
  const commission = await pickCommission();

  closeStatniceHall();
  overlayEl = buildOverlay();
  document.body.style.overflow = 'hidden';

  const commissionEl = overlayEl.querySelector('#statniceCommission');
  commissionEl.innerHTML = commission.map(av => av
    ? `<img class="statnice-commissioner" src="${avatarStateSrc(av, 'full')}" alt="Člen komisie" onerror="this.style.display='none'">`
    : ''
  ).join('');

  const topicsEl = overlayEl.querySelector('#statniceTopics');
  topicsEl.innerHTML = topics.map((t, i) => `
    <div class="statnice-topic-card">
      <div class="statnice-topic-num">Otázka ${i + 1}</div>
      <div class="statnice-topic-text">${t.question || t.id}</div>
      ${renderSource(t.zdroj)}
    </div>
  `).join('');

  let answered = false; // ochrana pri zatváraní – § sa nevráti, ak už hráč odpovedal
  let rewardGranted = false;
  const answers = ['', ''];
  const evaluations = [];
  let currentIdx = 0;
  let followUpPending = false;
  let recognizer = null;
  let prepTimerHandle = null;

  const timerEl = overlayEl.querySelector('#statniceTimer');
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
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    followUpPending = false;
    const topic = topics[currentIdx];
    overlayEl.querySelector('#statniceQNum').textContent = `Otázka ${currentIdx + 1} / ${topics.length}`;
    overlayEl.querySelector('#statniceCurrentQ').textContent = topic.question || topic.id;
    overlayEl.querySelector('#statniceAnswerInput').value = '';
    overlayEl.querySelector('#statniceFollowUpBox').style.display = 'none';
    overlayEl.querySelector('#statniceMicStatus').textContent = '';
  }

  const micBtn = overlayEl.querySelector('#statniceMicBtn');
  const answerInput = overlayEl.querySelector('#statniceAnswerInput');
  const micStatus = overlayEl.querySelector('#statniceMicStatus');

  let listening = false;
  micBtn.onclick = () => {
    if (listening) {
      if (recognizer) recognizer.stop();
      listening = false;
      micBtn.textContent = '🎤 Hovoriť';
      micStatus.textContent = '';
      return;
    }
    recognizer = createRecognizer({
      onTranscript: (finalT, interim) => {
        answerInput.value = (finalT + interim).trim();
      },
      onSilence: () => {
        micStatus.textContent = '⏸️ Odmlka zaznamenaná – odovzdávam odpoveď.';
        listening = false;
        micBtn.textContent = '🎤 Hovoriť';
        submitAnswer();
      }
    });
    if (!recognizer) {
      micStatus.textContent = 'Rozpoznávanie reči nie je v tomto prehliadači dostupné – napíš odpoveď.';
      return;
    }
    listening = true;
    micBtn.textContent = '⏹️ Zastaviť';
    micStatus.textContent = '🔴 Počúvam…';
    recognizer.start();
  };

  overlayEl.querySelector('#statniceSubmitBtn').onclick = () => {
    if (listening && recognizer) { recognizer.stop(); listening = false; micBtn.textContent = '🎤 Hovoriť'; }
    submitAnswer();
  };

  function submitAnswer() {
    const text = answerInput.value.trim();
    answered = true;

    if (followUpPending) {
      // druhá šanca po doplňujúcej otázke – spoj s pôvodnou odpoveďou a definitívne vyhodnoť
      answers[currentIdx] = `${answers[currentIdx]} ${text}`.trim();
      const finalEval = evaluateAnswer(answers[currentIdx], topics[currentIdx]);
      evaluations[currentIdx] = finalEval;
      advanceQuestion();
      return;
    }

    answers[currentIdx] = text;
    const evalResult = evaluateAnswer(text, topics[currentIdx]);

    if (!evalResult.onTopic) {
      followUpPending = true;
      const box = overlayEl.querySelector('#statniceFollowUpBox');
      box.style.display = 'block';
      box.innerHTML = `<strong>Komisia:</strong> ${evalResult.followUp}`;
      answerInput.value = '';
      return;
    }

    evaluations[currentIdx] = evalResult;
    advanceQuestion();
  }

  function advanceQuestion() {
    currentIdx++;
    if (currentIdx < topics.length) {
      renderCurrentQuestion();
    } else {
      finishExam();
    }
  }

  async function finishExam() {
    overlayEl.querySelector('#statniceAnswerPhase').style.display = 'none';
    overlayEl.querySelector('#statniceResultsPhase').style.display = 'block';

    const feedback = buildFinalFeedback(evaluations, topics);
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
    if (recognizer) { try { recognizer.stop(); } catch (e) {} }
    clearInterval(prepTimerHandle);

    if (answered && !rewardGranted) {
      const ok = window.confirm('Ukončiť skúšku? § sa nevráti, ak si už odpovedal/a.');
      if (!ok) return;
    }
    if (!answered) {
      // nikto ešte neodpovedal – vráť §
      await econAward(nick, cost, 'štátnicová skúška – zrušené pred odpoveďou', { skipCap: true });
    }
    closeStatniceHall();
  };
}
