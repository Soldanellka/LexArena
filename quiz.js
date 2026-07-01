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
import { openReportModal } from './reports.js';
import { playSound } from './audio.js';

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

      const sp = document.createElement('span');
      sp.textContent = o;
      b.appendChild(sp);

      b.addEventListener('click', () => selectOption(b, i === q.correct, i));

      optionsEl.appendChild(b);
    });

    const parent = optionsEl.parentNode;
    if (parent) {
      const old = parent.querySelector('#reportQuestionBtn');
      if (old) old.remove();

      const reportBtn = document.createElement('button');
      reportBtn.id = 'reportQuestionBtn';
      reportBtn.className = 'btn';
      reportBtn.textContent = 'Nahlásiť právnu nezrovnalosť';
      reportBtn.style.marginTop = '10px';

      reportBtn.addEventListener('click', () => {
        const currentQ = quiz.questions[quiz.index];
        openReportModal({
          questionId: currentQ?.id || null,
          questionText: currentQ?.q || currentQ?.question || ''
        });
      });

      parent.appendChild(reportBtn);
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
  const isDuel = window.duelQuestions && Array.isArray(window.duelQuestions) && window.duelQuestions.length;

  $('quizIntro').style.display = 'block';
  $('quizArea').style.display = 'none';

  incrementGamesPlayed();
  playSound(window.soundWin);

  /* =========================
     🔥 DUELOVÝ REŽIM
     ========================= */
  if (isDuel) {

    showRewardToast(
      `Duel dokončený. Správne: ${quiz.correct}, Nesprávne: ${quiz.wrong}.`
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
      // 🔥 Energia -10 za odohraný duel (prvý hráč - tvorca)
      if (typeof window.deductEnergy === 'function') {
        window.deductEnergy(10);
      }
    }

    /* =========================
       🔥 Druhý hráč (prijímateľ výzvy) – duel už má id
       ========================= */
    else {
      if (typeof window.completeDuel === 'function') {
        console.log("🔥 Spúšťam vyhodnotenie duelu...");
        window.completeDuel(quiz.questions);
      }
      // 🔥 Energia -10 za odohraný duel (druhý hráč - prijímateľ)
      if (typeof window.deductEnergy === 'function') {
        window.deductEnergy(10);
      }
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

  renderQuestion(true);
};
