'use strict';

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
   Štart kvízu
   ========================= */
export function startQuiz(){
  if(!selectedArea){
    alert('Vyber oblasť.');
    return;
  }

  if(paragrafy < 5){
    alert('Nemáš dosť paragrafov.');
    return;
  }

  // odpočítať 5 paragrafov
  const newPar = paragrafy - 5;
  setParagrafy(newPar);
  saveParagrafy(newPar);
  $('parCount').textContent = newPar;

  // pripraviť otázky
  const qset = Array.isArray(selectedArea.questions) ? selectedArea.questions : [];
  const shuffled = shuffleArray(JSON.parse(JSON.stringify(qset))).slice(0, 10);

  shuffled.forEach(q => {
    if(!Array.isArray(q.options)) q.options = [];

    const correctText = (typeof q.correct === 'number')
      ? q.options[q.correct]
      : null;

    shuffleArray(q.options);

    q.correct = correctText
      ? q.options.findIndex(opt => opt === correctText)
      : 0;

    if(q.correct < 0) q.correct = 0;
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
  if(!quiz.questions.length) return;

  const q = quiz.questions[quiz.index];
  if(!q) return;

  const qText = $('qText');
  const optionsEl = $('options');
  const quizArea = $('quizArea');

  if(!qText || !optionsEl || !quizArea){
    console.error('Chýbajú DOM elementy pre otázku');
    return;
  }

  $('areaTitle').textContent = selectedArea ? selectedArea.title : '';
  $('qIndex').textContent = `${quiz.index + 1} / ${quiz.questions.length}`;

  optionsEl.innerHTML = '';
  qText.style.opacity = 0;
  optionsEl.style.opacity = 0;

  setTimeout(() => {
    qText.textContent = q.q || '';

    q.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'opt';

      const sp = document.createElement('span');
      sp.textContent = o;
      b.appendChild(sp);

      b.addEventListener('click', () => selectOption(b, i === q.correct));

      optionsEl.appendChild(b);
    });

    // report button
    const parent = optionsEl.parentNode;
    if(parent){
      const old = parent.querySelector('#reportQuestionBtn');
      if(old) old.remove();

      const reportBtn = document.createElement('button');
      reportBtn.id = 'reportQuestionBtn';
      reportBtn.className = 'btn';
      reportBtn.textContent = 'Nahlásiť právnu nezrovnalosť';
      reportBtn.style.marginTop = '10px';

      reportBtn.addEventListener('click', () => {
        const currentQ = quiz.questions[quiz.index];
        openReportModal({
          questionId: currentQ?.id || null,
          questionText: currentQ?.q || ''
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
export function selectOption(btn, correct){
  const group = qsa('.opt');
  group.forEach(g => g.onclick = null);

  if(correct){
    btn.classList.add('correct');
    quiz.correct++;
    showInlineIcon(btn, 'assets/icons/check.svg');
    playSound(window.soundMatch);
  } else {
    btn.classList.add('wrong');
    quiz.wrong++;

    const correctText = quiz.questions[quiz.index].options[quiz.questions[quiz.index].correct];

    qsa('.opt').forEach(g => {
      if(g !== btn && g.textContent.trim() === correctText){
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
  if(quiz.index < quiz.questions.length - 1){
    quiz.index++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

export function prevQ(){
  if(quiz.index > 0){
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

  const reward = Math.max(1, Math.floor(quiz.correct / 4));

  const newPar = paragrafy + reward;
  setParagrafy(newPar);
  saveParagrafy(newPar);
  $('parCount').textContent = newPar;

  incrementGamesPlayed();

  showRewardToast(`Kvíz dokončený. Správne: ${quiz.correct}, Nesprávne: ${quiz.wrong}. Odmena: +${reward} paragrafov`);

  playSound(window.soundWin);

  // 🔥 Vytvoríme duel balík pre LexArenu
  try {
    const pkg = {
      subject: selectedArea ? selectedArea.title : 'Neznáma oblasť',
      quiz: Array.isArray(quiz.questions) ? quiz.questions : [],
      cases: [], // ak neskôr pridáš kazuistiky, doplníme sem
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
