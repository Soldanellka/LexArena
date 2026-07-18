'use strict';

import { ref, update } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

import { $, qsa, shuffleArray, saveParagrafy } from './core.js';
import {
  quiz,
  paragrafy,
  selectedArea,
  setParagrafy,
  setQuizState
} from './state.js';
import { showRewardToast } from './ui.js';
import { incrementGamesPlayed } from './avatars.js';
import { openReportModal, makeQuestionKey, getQuestionSeal } from './reports.js';
import { playSound } from './audio.js';
import { econEnergy, econSpend, ECONOMY_CONFIG } from './scripts/economy.js';
import { renderSource } from './scripts/sourceUtil.js';
import { AREA_SLUGS } from './scripts/contentOverrides.js';
import { openContentEditModal } from './scripts/contentEditModal.js';
import { getRole } from './scripts/economyConfig.js';

const SEAL_EMOJI = { bronze: '🥉', silver: '🥈', gold: '🥇', academic: '🎓' };

/* ROLA (admin/garant edit UI) – skutočná Firebase rola, nikdy lokálny
   "view" prepínač. */
let myRoleCache = null;
function getMyNick() { return localStorage.getItem('playerNick') || 'Anonymous'; }
async function getMyRole() {
  if (myRoleCache !== null) return myRoleCache;
  myRoleCache = await getRole(getMyNick());
  return myRoleCache;
}

/* Oblasť aktuálnej otázky – funguje pre študijný aj duelový režim. */
function resolveAreaTitle() {
  return (window.currentDuelMeta && window.currentDuelMeta.areaTitle) ||
    (window.currentDuel && window.currentDuel.areaTitle) ||
    window.currentAreaTitle ||
    (selectedArea ? selectedArea.title : 'Neznáma oblasť');
}

/* =========================
   Štart kvízu (študijný)
   ========================= */
export function startQuiz(){
  if (!selectedArea) {
    alert('Vyber oblasť.');
    return;
  }

  if (paragrafy < 5) {
    alert('Nemáš dosť paragrafov.');
    return;
  }

  const newPar = paragrafy - 5;
  setParagrafy(newPar);
  saveParagrafy(newPar);
  if ($('parCount')) $('parCount').textContent = newPar;

  const qset = Array.isArray(selectedArea.questions) ? selectedArea.questions : [];
  const shuffled = shuffleArray(JSON.parse(JSON.stringify(qset))).slice(0, 10);

  shuffled.forEach(q => {
    if (!Array.isArray(q.options)) q.options = [];

    const correctText = (typeof q.correct === 'number')
      ? q.options[q.correct]
      : null;

    shuffleArray(q.options);

    q.correct = correctText
      ? q.options.findIndex(opt => opt === correctText)
      : 0;

    if (q.correct < 0) q.correct = 0;
    q.selectedIndex = null;
  });

  setQuizState({
    questions: shuffled,
    index: 0,
    correct: 0,
    wrong: 0
  });

  $('quizIntro').style.display = 'none';
  $('quizArea').style.display = 'block';
  document.body.classList.add('quiz-fullscreen');

  renderQuestion(true);
}

/* =========================
   Render otázky
   ========================= */
export function renderQuestion(first = false){
  if (!quiz.questions.length) return;

  const q = quiz.questions[quiz.index];
  if (!q) return;

  const qText = $('qText');
  const optionsEl = $('options');
  const quizArea = $('quizArea');

  if (!qText || !optionsEl || !quizArea) {
    console.error('Chýbajú DOM elementy pre otázku');
    return;
  }

  $('areaTitle').textContent = selectedArea ? selectedArea.title : (window.currentAreaTitle || '');
  $('qIndex').textContent = `${quiz.index + 1} / ${quiz.questions.length}`;

  optionsEl.innerHTML = '';
  qText.style.opacity = 0;
  optionsEl.style.opacity = 0;

  setTimeout(() => {
    qText.textContent = q.q || q.question || '';

    q.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'opt lexarena-opt';
      b.dataset.optIndex = i;

      const sp = document.createElement('span');
      sp.textContent = o;
      b.appendChild(sp);

      b.addEventListener('click', () => selectOption(b, i === q.correct, i));

      optionsEl.appendChild(b);
    });

    const parent = optionsEl.parentNode;
    if (parent) {
      const oldReport = parent.querySelector('#reportQuestionBtn');
      if (oldReport) oldReport.remove();
      const oldEdit = parent.querySelector('#editQuestionBtn');
      if (oldEdit) oldEdit.remove();
      const oldHint = parent.querySelector('#hint5050Btn');
      if (oldHint) oldHint.remove();
      const oldSeal = parent.querySelector('#questionSealBadge');
      if (oldSeal) oldSeal.remove();
      const oldSource = parent.querySelector('#questionSourceLine');
      if (oldSource) oldSource.remove();
      const oldExplanation = parent.querySelector('#questionExplanationBox');
      if (oldExplanation) oldExplanation.remove();

      /* 🏅 Pečať auditu – ak má otázka schválené nahlásenie (z cache, žiadne čítanie Firebase tu) */
      const areaTitle = resolveAreaTitle();
      const questionKey = makeQuestionKey(q.source, q.q || q.question || '');
      const seal = getQuestionSeal(areaTitle, questionKey);
      if (seal) {
        const badge = document.createElement('div');
        badge.id = 'questionSealBadge';
        badge.className = 'question-seal';
        badge.textContent = `${SEAL_EMOJI[seal.seal] || '🥉'} Auditované · ${seal.nick}${seal.byGarant ? ' 🎓' : ''}`;
        parent.appendChild(badge);
      }

      const sourceLine = document.createElement('div');
      sourceLine.id = 'questionSourceLine';
      sourceLine.innerHTML = renderSource(q.zdroj);
      parent.appendChild(sourceLine);

      /* 💬 Vysvetlenie (normalizované na {correct,wrong} pri načítaní) –
         skryté, kým hráč nevyberie odpoveď; chýbajúce vysvetlenie =
         box sa vôbec nevykreslí (žiadny prázdny rámik). */
      if (q.explanation) {
        const explanationBox = document.createElement('div');
        explanationBox.id = 'questionExplanationBox';
        explanationBox.className = 'question-explanation';
        explanationBox.style.display = 'none';
        parent.appendChild(explanationBox);
      }

      /* 💡 Nápoveda 50:50 – len v duelovom kvíze, max 1× na otázku */
      const isDuelQuiz = !!(window.duelQuestions && Array.isArray(window.duelQuestions) && window.duelQuestions.length);
      if (isDuelQuiz && !q.hintUsed) {
        const hintBtn = document.createElement('button');
        hintBtn.id = 'hint5050Btn';
        hintBtn.className = 'btn';
        hintBtn.textContent = `💡 50:50 (${ECONOMY_CONFIG.SINKS.QUIZ_HINT_5050}§)`;
        hintBtn.style.marginTop = '10px';

        hintBtn.addEventListener('click', async () => {
          const nick = localStorage.getItem('playerNick');
          if (!nick) return;
          const ok = await econSpend(nick, ECONOMY_CONFIG.SINKS.QUIZ_HINT_5050, 'nápoveda 50:50');
          if (!ok) return;

          q.hintUsed = true;
          hintBtn.remove();

          const wrongButtons = qsa('.opt').filter(btn => Number(btn.dataset.optIndex) !== q.correct);
          shuffleArray(wrongButtons)
            .slice(0, Math.max(0, wrongButtons.length - 1))
            .forEach(btn => { btn.style.visibility = 'hidden'; btn.disabled = true; });
        });

        parent.appendChild(hintBtn);
      }

      const reportBtn = document.createElement('button');
      reportBtn.id = 'reportQuestionBtn';
      reportBtn.className = 'report-q-btn';
      reportBtn.textContent = '⚖️ Nahlásiť právnu nezrovnalosť';

      reportBtn.addEventListener('click', () => {
        const currentQ = quiz.questions[quiz.index];
        openReportModal({
          area: resolveAreaTitle(),
          questionId: makeQuestionKey(currentQ?.source, currentQ?.q || currentQ?.question || ''),
          questionText: currentQ?.q || currentQ?.question || ''
        });
      });

      parent.appendChild(reportBtn);

      /* ✏️ Úprava (admin/garant) – pracuje s KANONICKÝM (nezamiešaným)
         znením z window.areas[q._area], nie so zamiešanou kópiou v
         quiz.questions (startQuiz() robí hlboký klon + zamieša options). */
      if (q._area && typeof q._quizIndex === 'number') {
        getMyRole().then(role => {
          if (role !== 'admin' && role !== 'garant') return;
          const canonicalList = window.areas?.[q._area];
          const canonical = Array.isArray(canonicalList)
            ? canonicalList.find(cq => cq.source === q.source && cq._quizIndex === q._quizIndex)
            : null;
          if (!canonical) return;

          const editBtn = document.createElement('button');
          editBtn.id = 'editQuestionBtn';
          editBtn.className = 'report-q-btn';
          editBtn.textContent = '✏️ Upraviť';
          editBtn.addEventListener('click', () => {
            openContentEditModal({
              app: AREA_SLUGS[q._area],
              okruh: q.source,
              cast: `quiz_${q._quizIndex}`,
              kind: 'question',
              current: canonical,
              autor: getMyNick(),
              rola: role,
              title: `Upraviť otázku – ${q.source}`,
              onSaved: (saved) => {
                Object.assign(canonical, saved.novyObsah);
                canonical._seal = saved.pecat ? { type: 'garant', autor: saved.autor, timestamp: saved.timestamp } : null;
                showRewardToast('✅ Zmena uložená. Prejaví sa pri ďalšom načítaní otázky.');
              }
            });
          });
          parent.appendChild(editBtn);
        });
      }
    }

    qText.style.transition = 'opacity 260ms ease';
    optionsEl.style.transition = 'opacity 260ms ease';
    qText.style.opacity = 1;
    optionsEl.style.opacity = 1;

    try {
      quizArea.animate(
        first
          ? [{ transform: 'translateY(6px)', opacity: 0.96 }, { transform: 'translateY(0)', opacity: 1 }]
          : [{ transform: 'translateY(8px)', opacity: 0.95 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: first ? 260 : 200, easing: 'ease-out' }
      );
    } catch(e){}
  }, 80);

  updateStats();
  updateProgress();
}

/* =========================
   Výber odpovede
   ========================= */
export function selectOption(btn, correct, index){
  const group = qsa('.opt');
  group.forEach(g => g.onclick = null);

  const current = quiz.questions[quiz.index];
  if (current) current.selectedIndex = index;

  if (correct) {
    btn.classList.add('correct');
    quiz.correct++;
    showInlineIcon(btn, 'assets/icons/check.svg');
    playSound(window.soundMatch);
  } else {
    btn.classList.add('wrong');
    quiz.wrong++;

    const correctText = current.options[current.correct];

    qsa('.opt').forEach(g => {
      if (g !== btn && g.textContent.trim() === correctText) {
        g.classList.add('correct');
        showInlineIcon(g, 'assets/icons/check.svg');
      }
    });

    playSound(window.soundNoMatch);
  }

  const explanationBox = $('questionExplanationBox');
  if (explanationBox && current && current.explanation) {
    const exp = current.explanation;
    explanationBox.textContent = correct ? (exp.correct || '') : (exp.wrong || '');
    explanationBox.className = `question-explanation ${correct ? 'ok' : 'no'}`;
    explanationBox.style.display = 'block';
  }

  updateStats();
}

/* =========================
   Inline ikonka
   ========================= */
function showInlineIcon(btn, iconPath){
  const img = document.createElement('img');
  img.src = iconPath;
  img.style.width = '18px';
  img.style.height = '18px';
  img.style.marginLeft = '10px';
  img.style.opacity = '0';
  img.style.transition = 'opacity 220ms ease, transform 220ms ease';

  btn.appendChild(img);

  requestAnimationFrame(() => {
    img.style.opacity = '1';
    img.style.transform = 'translateY(-2px)';
  });

  setTimeout(() => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(0)';
    setTimeout(() => img.remove(), 220);
  }, 1600);
}

/* =========================
   Navigácia
   ========================= */
export function nextQ(){
  if (quiz.index < quiz.questions.length - 1) {
    quiz.index++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

export function prevQ(){
  if (quiz.index > 0) {
    quiz.index--;
    renderQuestion();
  }
}

/* =========================
   Dokončenie kvízu
   ========================= */
export function finishQuiz(){
  $('quizIntro').style.display = 'block';
  $('quizArea').style.display = 'none';
  document.body.classList.remove('quiz-fullscreen');

  /* =========================
     ⚖️ SENÁTNY SPOR – zapíš skóre do senatSpory/{id}, žiadne
     energie/odmeny tu (tie sa vyplácajú až pri vyhodnotení sporu),
     nesmie prepadnúť do normálnej duelovej vetvy nižšie.
     ========================= */
  if (window.currentSenatSpor) {
    const { sporId, senatId } = window.currentSenatSpor;
    const nick = localStorage.getItem('playerNick') || 'Unknown';
    window.currentSenatSpor = null;
    window.duelQuestions = null;
    window.currentOpponent = null;
    window.currentDuelMeta = null;
    window.currentDuel = null;
    import('./scripts/senaty.js').then(({ recordSenatSporScore }) => {
      recordSenatSporScore(sporId, senatId, nick, quiz.correct);
    });
    return;
  }

  const isDuel = window.duelQuestions && Array.isArray(window.duelQuestions) && window.duelQuestions.length;

  incrementGamesPlayed();
  playSound(window.soundWin);

  /* =========================
     🔥 DUELOVÝ REŽIM
     ========================= */
  if (isDuel) {

    showRewardToast(
      `Pojednávanie dokončené. Správne: ${quiz.correct}, Nesprávne: ${quiz.wrong}.`
    );

    const nick = localStorage.getItem('playerNick') || 'Unknown';
    const areaTitle =
      (window.currentDuelMeta && window.currentDuelMeta.areaTitle) ||
      (window.currentDuel && window.currentDuel.areaTitle) ||
      window.currentAreaTitle ||
      (selectedArea ? selectedArea.title : 'Neznáma oblasť');

    const enrichedQuestions = window.duelQuestions.map((q, i) => ({
      ...q,
      selectedIndex: quiz.questions[i]?.selectedIndex ?? null
    }));

    /* =========================
       🔥 OPRAVA: rozlišujeme podľa toho, či duel už MÁ id
       (nie podľa toho, či window.currentDuelMeta existuje –
       to sa totiž nastavuje hneď pri štarte aj prvému hráčovi
       so id:null, takže predošlá podmienka ho mylne posielala
       do vetvy "druhý hráč")
       ========================= */
    const duelMeta = window.currentDuelMeta || window.currentDuel || null;
    const hasDuelId = duelMeta && duelMeta.id;

    /* =========================
       🔥 Prvý hráč (tvorca výzvy) – duel ešte nemá id
       ========================= */
    if (!hasDuelId) {
      if (typeof window.saveDuel === 'function') {
        window.saveDuel(nick, areaTitle, enrichedQuestions);

        const db = window.db;
        if (db && window.currentDuel?.id) {
          const duelId = window.currentDuel.id;

          update(ref(db, `duels/${duelId}`), {
            status: "pending",
            created: Date.now(),
            expiresIn: 86400
          });

          console.log("🔥 Duel uložený do banky duelov (pending)");
        }
      }
      // 🔥 Energia za odohraný duel (prvý hráč - tvorca)
      econEnergy(nick, ECONOMY_CONFIG.ENERGY.DUEL, 'odohraný duel');
    }

    /* =========================
       🔥 Druhý hráč (prijímateľ výzvy) – duel už má id
       ========================= */
    else {
      if (typeof window.completeDuel === 'function') {
        console.log("🔥 Spúšťam vyhodnotenie duelu...");
        window.completeDuel(quiz.questions);
      }
      // Energia za odohraný duel (druhý hráč - prijímateľ) sa odpočíta
      // v scripts/duels.js finalizeDuel() – jediné miesto, nech sa neodpočítava 2×.
    }

    window.duelQuestions = null;
    window.currentOpponent = null;
    window.currentDuelMeta = null;
    window.currentDuel = null;

    return;
  }

  /* =========================
     Študijný režim
     ========================= */
  // 🔥 § EKONOMIKA: +1§ za každé odohranie kvízu
  const reward = 1;
  const newPar = paragrafy + reward;
  setParagrafy(newPar);
  saveParagrafy(newPar);
  if ($('parCount')) $('parCount').textContent = newPar;

  showRewardToast(`Kvíz dokončený! Správne: ${quiz.correct}, Nesprávne: ${quiz.wrong}. +1§ za odohranie!`);

  try {
    const pkg = {
      subject: selectedArea ? selectedArea.title : (window.currentAreaTitle || 'Neznáma oblasť'),
      quiz: Array.isArray(quiz.questions) ? quiz.questions : [],
      cases: [],
      timestamp: Date.now()
    };
    localStorage.setItem('lastDuelPackage', JSON.stringify(pkg));
  } catch(e){
    console.error('Nepodarilo sa uložiť lastDuelPackage:', e);
  }
}

/* =========================
   Zrušenie rozohraného kvízu/duelu (✕ v celoobrazovkovom mobilnom kvíze)
   Žiadna odmena, žiadne vyhodnotenie – len návrat na výber oblasti.
   ========================= */
export function cancelQuiz(){
  if (!confirm('Naozaj ukončiť pojednávanie?')) return;

  $('quizIntro').style.display = 'block';
  $('quizArea').style.display = 'none';
  document.body.classList.remove('quiz-fullscreen');

  window.duelQuestions = null;
  window.currentOpponent = null;
  window.currentDuelMeta = null;
  window.currentDuel = null;
  window.currentSenatSpor = null;

  setQuizState({ questions: [], index: 0, correct: 0, wrong: 0 });
}
window.cancelQuiz = cancelQuiz;

/* =========================
   Štatistiky
   ========================= */
export function updateStats(){
  $('correctCount').textContent = quiz.correct;
  $('wrongCount').textContent = quiz.wrong;
}

export function updateProgress(){
  const pct = quiz.questions.length
    ? Math.round(((quiz.index + 1) / quiz.questions.length) * 100)
    : 0;

  $('progBar').style.width = pct + '%';
}

/* =========================
   🔥 GLOBÁLNY DUEL QUIZ ENGINE
   ========================= */
window.startDuelQuiz = function(questions){
  const mapped = (questions || []).map(q => ({
    q: q.question || q.q || '',
    options: Array.isArray(q.options) ? q.options : [],
    correct: typeof q.correct === 'number' ? q.correct : 0,
    id: q.id || null,
    source: q.source || null,
    // 🔥 _area (napr. "Trestné právo procesné") sa musí zachovať aj sem –
    // hmotné aj procesné majú vlastné A1..A30/A40/A45 súbory s ROVNAKÝMI
    // source kľúčmi, takže per-okruh progres (scripts/progressTracking.js)
    // potrebuje _area na rozlíšenie, ku ktorej podoblasti okruh patrí.
    _area: q._area || null,
    zdroj: q.zdroj || null,
    explanation: q.explanation || null,
    selectedIndex: null
  }));

  setQuizState({
    questions: mapped,
    index: 0,
    correct: 0,
    wrong: 0
  });

  try {
    const pkg = {
      subject: selectedArea ? selectedArea.title : (window.currentAreaTitle || 'Neznáma oblasť'),
      quiz: mapped,
      cases: [],
      timestamp: Date.now()
    };
    localStorage.setItem('lastDuelPackage', JSON.stringify(pkg));
  } catch(e){
    console.error('Nepodarilo sa uložiť lastDuelPackage:', e);
  }

  $('quizIntro').style.display = 'none';
  $('quizArea').style.display = 'block';
  document.body.classList.add('quiz-fullscreen');

  renderQuestion(true);
};
