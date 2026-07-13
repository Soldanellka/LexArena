'use strict';

/* ============================================================
   ZDIEĽANÝ ENGINE PRE PRÁVNE APPKY – LexArena
   Vychádza z ob-pravo-app/app.js, parametrizovaný cez
   window.PRAVO_CONFIG (nastavené v <script> danej appky PRED
   načítaním tohto súboru):

   window.PRAVO_CONFIG = {
     hmotne:   { label, path, count? , files?, emoji, reportArea },
     procesne: { label, path, count? , files?, emoji, reportArea }
   }

   `path` je fetchovaný relatívne k appke (napr. 'data/hmotne/'
   alebo '../Trestné právo hmotné/data/'). Buď `count` (sekvenčne
   A1..count, zastaví sa pri prvom chýbajúcom súbore – rovnaké
   správanie ako pôvodné ob-pravo-app) alebo `files` (explicitný
   zoznam čísel/názvov súborov bez prípony – pre appky, kde okruhy
   nie sú v jednom kontinuálnom rozsahu, napr. Pracovné právo).

   Normalizácia dát: rôzne existujúce JSON schémy (napr. Trestné
   právo: theory[] namiesto summary; Európske právo: q namiesto
   question; explanation_correct/incorrect namiesto explanation:
   {correct,wrong}) sa prevádzajú na jednotný tvar cez zdieľaný
   scripts/contentNormalize.js, BEZ zásahu do pôvodných JSON súborov
   – jedna oprava tam opraví zobrazenie vo všetkých miestach, ktoré
   ho používajú (tento engine, data.js, memoryDefinitions.js, ...).
============================================================ */

import { renderSource } from '../scripts/sourceUtil.js';
import { normalizeOkruh } from '../scripts/contentNormalize.js';
import { shuffleOptions } from '../core.js';

const CONFIG = window.PRAVO_CONFIG || {};

/* ============================================================
   STAV APPKY
============================================================ */
let state = {
  area: 'hmotne',
  okruhy: [],
  currentOkruh: null,
  quiz: {
    questions: [],
    current: 0,
    correct: 0,
    wrong: 0,
    answered: []
  },
  done: new Set(),
  phase: 'welcome'
};

/* ============================================================
   POMOCNÉ
============================================================ */
const $ = id => document.getElementById(id);
const storageKey = () => `${window.PRAVO_APP_ID || 'pravo_app'}_done_${state.area}`;

function loadDone() {
  try {
    const raw = localStorage.getItem(storageKey());
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch { return new Set(); }
}

function saveDone() {
  localStorage.setItem(storageKey(), JSON.stringify([...state.done]));
}

/* ============================================================
   FIREBASE – pridelenie § (ak je dostupné)
============================================================ */
async function awardPar() {
  try {
    if (window.opener?.awardParagrafy) {
      await window.opener.awardParagrafy(1, 'za dokončenie okruhu');
      return true;
    }
    const db = window.db || window.parent?.db;
    const nick = localStorage.getItem('playerNick');
    if (db && nick) {
      const { ref, get, update } = await import(
        'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js'
      );
      const snap = await get(ref(db, `users/${nick}/paragrafy`));
      const current = snap.exists() ? snap.val() : 0;
      await update(ref(db, `users/${nick}`), {
        paragrafy: current + 1,
        lastParUpdate: Date.now()
      });
      return true;
    }
  } catch (e) { console.log('Firebase nedostupná:', e.message); }
  return false;
}

/* ============================================================
   NAČÍTANIE OKRUHOV
============================================================ */
async function fetchOkruh(path, fileBase) {
  try {
    const res = await fetch(`${path}${fileBase}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    return normalizeOkruh({ ...data, _file: fileBase });
  } catch {
    return null;
  }
}

async function loadOkruhy(area) {
  const cfg = CONFIG[area];
  $('okruhyList').innerHTML = '<div class="loading-spinner">Načítavam…</div>';

  const results = [];

  if (Array.isArray(cfg.files)) {
    for (const n of cfg.files) {
      const okruh = await fetchOkruh(cfg.path, `A${n}`);
      if (okruh) results.push({ ...okruh, _index: results.length });
    }
  } else {
    for (let i = 1; i <= (cfg.count || 0); i++) {
      const okruh = await fetchOkruh(cfg.path, `A${i}`);
      if (!okruh) break; // zastav pri prvom chýbajúcom súbore (rovnaké ako predtým)
      results.push({ ...okruh, _index: results.length });
    }
  }

  state.okruhy = results;
  state.done = loadDone();

  renderSidebar();
  updateStats();
  showWelcome();
}

/* ============================================================
   SIDEBAR
============================================================ */
function renderSidebar() {
  const list = $('okruhyList');
  const cfg = CONFIG[state.area];

  $('sidebarTitle').textContent = cfg.label;

  if (!state.okruhy.length) {
    list.innerHTML = '<div class="loading-spinner">Žiadne okruhy nenájdené.<br><small>Obsah sa dopĺňa postupne.</small></div>';
    return;
  }

  list.innerHTML = state.okruhy.map((o, i) => `
    <div class="okruh-item ${state.currentOkruh === i ? 'active' : ''} ${state.done.has(i) ? 'done' : ''}"
      data-idx="${i}">
      <span class="okruh-num">${o._file}</span>
      <span class="okruh-title">${o.title || o.id || `Okruh ${i + 1}`}</span>
      <span class="okruh-status">${state.done.has(i) ? '✓' : ''}</span>
    </div>
  `).join('');

  list.querySelectorAll('.okruh-item').forEach(el => {
    el.onclick = () => selectOkruh(parseInt(el.dataset.idx));
  });

  updateProgressRing();
}

function updateProgressRing() {
  const total = state.okruhy.length;
  const done = state.done.size;
  const pct = total ? Math.round(done / total * 100) : 0;
  const circumference = 125.6;
  const offset = circumference - (pct / 100 * circumference);

  const ring = $('progressRing');
  if (ring) ring.style.strokeDashoffset = offset;
  const text = $('progressText');
  if (text) text.textContent = pct + '%';
}

/* ============================================================
   WELCOME
============================================================ */
function showWelcome() {
  state.phase = 'welcome';
  state.currentOkruh = null;
  $('welcomeScreen').style.display = 'block';
  $('okruhDetail').style.display = 'none';
  updateStats();
  renderSidebar();
}

function updateStats() {
  const total = state.okruhy.length;
  const done = state.done.size;
  $('statTotal').textContent = total || '—';
  $('statDone').textContent = done;
  const correct = parseInt(localStorage.getItem(`${window.PRAVO_APP_ID || 'pravo_app'}_correct_${state.area}`) || '0');
  $('statStreak').textContent = correct || '—';
}

/* ============================================================
   VÝBER OKRUHU
============================================================ */
function selectOkruh(idx) {
  state.currentOkruh = idx;
  const okruh = state.okruhy[idx];

  $('welcomeScreen').style.display = 'none';
  $('okruhDetail').style.display = 'block';
  $('summaryCard').style.display = 'block';
  $('quizArea').style.display = 'none';
  $('resultsCard').style.display = 'none';
  $('postQuizTabs').style.display = 'none';
  $('memorySection').style.display = 'none';
  $('casesSection').style.display = 'none';
  $('memoryBoard').innerHTML = '';
  $('casesBoard').innerHTML = '';

  const cfg = CONFIG[state.area];
  $('summaryTag').textContent = `${cfg.emoji} ${cfg.label} · ${okruh._file}`;
  $('summaryTitle').textContent = okruh.title || okruh.id || `Okruh ${idx + 1}`;
  $('summaryText').textContent = (okruh.summary || 'Žiadne zhrnutie.').trim();
  $('summarySource').innerHTML = renderSource(okruh.zdroj);

  state.phase = 'summary';
  renderSidebar();

  document.querySelector('.content').scrollTop = 0;
}

/* ============================================================
   KVÍZ
============================================================ */
function startQuiz() {
  const okruh = state.okruhy[state.currentOkruh];
  const questions = okruh.quiz || [];

  if (!questions.length) {
    alert('Tento okruh nemá žiadne otázky.');
    return;
  }

  /* Premiešané poradie možností pri každom spustení kvízu (aj pri
     "Skúsiť znova") – shuffleOptions vracia nové objekty, takže
     kanonické okruh.quiz zostáva nedotknuté. */
  state.quiz = {
    questions: questions.map(shuffleOptions),
    current: 0,
    correct: 0,
    wrong: 0,
    answered: new Array(questions.length).fill(null)
  };

  $('summaryCard').style.display = 'none';
  $('quizArea').style.display = 'block';
  $('resultsCard').style.display = 'none';
  state.phase = 'quiz';

  renderQuestion();
}

function renderQuestion() {
  const q = state.quiz;
  const question = q.questions[q.current];
  const total = q.questions.length;
  const answered = q.answered[q.current];

  const pct = Math.round((q.current / total) * 100);
  $('quizProgressFill').style.width = pct + '%';
  $('qNum').textContent = `${q.current + 1} / ${total}`;
  $('qCorrect').textContent = q.correct;
  $('qWrong').textContent = q.wrong;

  $('questionNumber').textContent = `Otázka ${q.current + 1}`;
  $('questionText').textContent = question.question;
  $('questionSource').innerHTML = renderSource(question.zdroj);
  setupReportButton(question);

  const grid = $('optionsGrid');
  const letters = ['A', 'B', 'C', 'D', 'E'];
  grid.innerHTML = (question.options || []).map((opt, i) => `
    <button class="option-btn ${answered !== null ? (i === question.correct ? 'correct' : (answered === i ? 'wrong' : '')) : ''}"
      data-idx="${i}" ${answered !== null ? 'disabled' : ''}>
      <span class="opt-letter">${letters[i] || i + 1}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  if (answered === null) {
    grid.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.idx)));
    });
  }

  const expBox = $('explanationBox');
  if (answered !== null) {
    const exp = question.explanation || {};
    const isCorrect = answered === question.correct;
    expBox.style.display = 'flex';
    expBox.className = `explanation-box ${isCorrect ? 'correct-exp' : 'wrong-exp'}`;
    $('explanationIcon').textContent = isCorrect ? '✅' : '❌';
    $('explanationText').textContent = isCorrect
      ? (exp.correct || 'Správne!')
      : (exp.wrong || `Nesprávne. Správna odpoveď: ${question.options[question.correct]}`);
  } else {
    expBox.style.display = 'none';
  }

  const nav = $('quizNav');
  nav.style.display = answered !== null ? 'flex' : 'none';
  $('prevQBtn').disabled = q.current === 0;
  $('nextQBtn').textContent = q.current === total - 1 ? 'Výsledky →' : 'Ďalšia →';
}

/* ============================================================
   NAHLÁSENIE PRÁVNEJ NEZROVNALOSTI
   Appka je samostatná stránka bez vlastného reportModalu (ten žije
   v hlavnom index.html), preto otvárame hlavnú stránku v novej
   karte s parametrami na predvyplnenie formulára.
============================================================ */
function setupReportButton(question) {
  const btn = $('questionReportBtn');
  if (!btn) return;
  btn.onclick = () => {
    const okruh = state.okruhy[state.currentOkruh];
    const cfg = CONFIG[state.area];
    const url = `/?report=1&area=${encodeURIComponent(cfg.reportArea)}` +
      `&src=${encodeURIComponent(okruh ? okruh._file || '' : '')}` +
      `&qtext=${encodeURIComponent(question.question || '')}`;
    window.open(url, '_blank');
  };
}

function selectAnswer(optIdx) {
  const q = state.quiz;
  const question = q.questions[q.current];
  const isCorrect = optIdx === question.correct;

  q.answered[q.current] = optIdx;
  if (isCorrect) q.correct++; else q.wrong++;

  renderQuestion();
}

function nextQuestion() {
  const q = state.quiz;
  if (q.current < q.questions.length - 1) {
    q.current++;
    renderQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  const q = state.quiz;
  if (q.current > 0) {
    q.current--;
    renderQuestion();
  }
}

/* ============================================================
   VÝSLEDKY
============================================================ */
async function showResults() {
  const q = state.quiz;
  const total = q.questions.length;
  const pct = Math.round(q.correct / total * 100);

  $('quizArea').style.display = 'none';
  $('resultsCard').style.display = 'block';
  state.phase = 'results';

  let emoji, title;
  if (pct >= 90) { emoji = '🏆'; title = 'Výborne! Skvelý výsledok!'; }
  else if (pct >= 70) { emoji = '🎉'; title = 'Dobrá práca! Takmer perfektné!'; }
  else if (pct >= 50) { emoji = '💪'; title = 'Solídny základ. Pokračuj!'; }
  else { emoji = '📚'; title = 'Nevzdávaj sa, zopakuj si okruh.'; }

  $('resultsEmoji').textContent = emoji;
  $('resultsTitle').textContent = title;
  $('resultsPct').textContent = pct + '%';
  $('resCorrect').textContent = q.correct;
  $('resWrong').textContent = q.wrong;

  if (pct >= 60) {
    state.done.add(state.currentOkruh);
    saveDone();

    const awarded = await awardPar();
    const reward = $('parReward');
    if (reward && awarded) reward.style.display = 'inline-flex';

    const key = `${window.PRAVO_APP_ID || 'pravo_app'}_correct_${state.area}`;
    const prev = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, prev + q.correct);
  }

  renderSidebar();
  updateStats();

  const nextIdx = (state.currentOkruh + 1) < state.okruhy.length
    ? state.currentOkruh + 1
    : null;
  const nextBtn = $('nextOkruhBtn');
  if (nextIdx !== null) {
    nextBtn.style.display = 'inline-flex';
    nextBtn.onclick = () => selectOkruh(nextIdx);
  } else {
    nextBtn.style.display = 'none';
  }

  $('postQuizTabs').style.display = 'block';
  initPostQuizTabs();
}

/* ============================================================
   POST-QUIZ TABS – Memory a Prípady
============================================================ */
function initPostQuizTabs() {
  document.querySelectorAll('.pq-tab').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('.pq-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const which = tab.dataset.tab;
      $('resultsCard').style.display = which === 'results' ? 'block' : 'none';
      $('memorySection').style.display = which === 'memory' ? 'block' : 'none';
      $('casesSection').style.display = which === 'cases' ? 'block' : 'none';
      if (which === 'memory' && !$('memoryBoard').children.length) buildMemory();
      if (which === 'cases' && !$('casesBoard').children.length) buildCases();
    };
  });
}

/* ── MEMORY ── */
function buildMemory() {
  const okruh = state.okruhy[state.currentOkruh];
  const tiles = okruh.tiles || [];
  const board = $('memoryBoard');
  board.innerHTML = '';

  if (!tiles.length) {
    board.innerHTML = '<div class="loading-spinner">Tento okruh zatiaľ nemá kartičky.</div>';
    $('memoryStats').textContent = '';
    return;
  }

  const pairs = tiles.map((t, i) => ({ id: i, left: t.term, right: t.definition })).filter(p => p.left && p.right);

  const cards = [];
  pairs.forEach(p => {
    cards.push({ uid: p.id + '-Q', pairId: p.id, text: p.left, type: 'q' });
    cards.push({ uid: p.id + '-A', pairId: p.id, text: p.right, type: 'a' });
  });

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  let selected = null;
  let matched = 0;
  let attempts = 0;

  const updateStats = () => {
    $('memoryStats').textContent = `Nájdené: ${matched}/${pairs.length} párov · Pokusy: ${attempts}`;
  };

  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'mem-card ' + (card.type === 'q' ? 'q-card' : '');
    el.dataset.uid = card.uid;
    el.dataset.pairId = card.pairId;
    el.textContent = card.text;

    el.onclick = () => {
      if (el.classList.contains('matched') || el.classList.contains('selected')) return;

      if (!selected) {
        selected = el;
        el.classList.add('selected');
        return;
      }

      attempts++;
      if (selected.dataset.pairId === el.dataset.pairId && selected.dataset.uid !== el.dataset.uid) {
        [selected, el].forEach(e => {
          e.classList.remove('selected');
          e.classList.add('matched');
        });
        matched++;
        selected = null;
        updateStats();
        if (matched === pairs.length) {
          setTimeout(() => {
            board.insertAdjacentHTML('afterend', '<div style="text-align:center;padding:16px;font-size:18px;font-weight:700;color:var(--success)">🎉 Všetky páry nájdené!</div>');
          }, 300);
        }
      } else {
        [selected, el].forEach(e => e.classList.add('wrong-flash'));
        const prev = selected;
        setTimeout(() => {
          [prev, el].forEach(e => {
            e.classList.remove('wrong-flash', 'selected');
          });
        }, 500);
        selected = null;
      }
      updateStats();
    };

    board.appendChild(el);
  });

  updateStats();

  $('memoryRestartBtn').onclick = () => {
    board.innerHTML = '';
    const next = board.nextElementSibling;
    if (next && next.textContent.includes('Všetky')) next.remove();
    buildMemory();
  };
}

/* ── PRÍPADY ── */
function buildCases() {
  const okruh = state.okruhy[state.currentOkruh];
  const cases = okruh.cases || [];
  const board = $('casesBoard');
  board.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  let totalQuestions = 0;
  cases.forEach(c => (c.steps || []).forEach(s => { if ((s.options || []).length) totalQuestions++; }));
  let answeredCount = 0;

  const updateProgress = () => {
    $('casesProgress').textContent = `Vyriešené: ${answeredCount} / ${totalQuestions}`;
  };

  if (!cases.length) {
    board.innerHTML = '<div class="loading-spinner">Tento okruh zatiaľ nemá prípady z praxe.</div>';
    updateProgress();
    return;
  }

  cases.forEach((c, ci) => {
    /* Premiešané raz pri zostavení tabu (nie v render(), ktoré sa
       volá znova po každej odpovedi – inak by sa poradie menilo
       spod už zodpovedaného kroku). */
    const steps = (c.steps || []).map(s =>
      Array.isArray(s.options) && s.options.length ? shuffleOptions(s) : s
    );
    const answers = new Array(steps.length).fill(null);
    let revealed = steps.length ? 1 : 0;

    const card = document.createElement('div');
    card.className = 'case-card';
    board.appendChild(card);

    function render() {
      const diffBadge = c.difficulty ? ` · ${c.difficulty}` : '';
      let html = `
        <div class="case-num">Prípad ${ci + 1}${diffBadge} · ${okruh._file || ''}</div>
        <div class="case-question" style="font-family:'Lora',serif;font-weight:700">${c.title || ''}</div>`;

      for (let si = 0; si < revealed; si++) {
        const step = steps[si];
        const hasOptions = Array.isArray(step.options) && step.options.length > 0;

        if (!hasOptions) {
          html += `<div class="case-question" style="font-weight:400"><em style="color:var(--muted)">Scenár:</em> ${step.question}</div>`;
          if (si === revealed - 1 && revealed < steps.length) {
            html += `<button class="nav-btn primary case-continue-btn" data-si="${si}">Pokračovať →</button>`;
          }
          continue;
        }

        html += `<div class="case-question" style="font-weight:600">${step.question}</div>
          <div class="case-options">
            ${step.options.map((opt, i) => {
              let cls = 'case-opt';
              if (answers[si] !== null) {
                if (i === step.correct) cls += ' correct';
                else if (answers[si] === i) cls += ' wrong';
              }
              return `<button class="${cls}" data-si="${si}" data-i="${i}" ${answers[si] !== null ? 'disabled' : ''}>
                <span style="width:22px;height:22px;border-radius:50%;border:1.5px solid var(--border);
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;
                  flex-shrink:0;color:var(--muted)">${letters[i] || i + 1}</span>
                <span>${opt}</span>
              </button>`;
            }).join('')}
          </div>`;

        if (answers[si] !== null) {
          const isCorrect = answers[si] === step.correct;
          const exp = step.explanation || {};
          html += `<div class="case-explanation ${isCorrect ? 'correct' : 'wrong'}">${
            isCorrect ? (exp.correct || '✅ Správne!') : (exp.wrong || `❌ Správna odpoveď: ${step.options[step.correct]}`)
          }</div>`;
        }
      }

      html += `<div class="case-source">${renderSource(c.zdroj)}</div>`;
      card.innerHTML = html;

      const continueBtn = card.querySelector('.case-continue-btn');
      if (continueBtn) {
        continueBtn.onclick = () => {
          if (revealed < steps.length) revealed++;
          render();
        };
      }

      card.querySelectorAll('.case-opt:not([disabled])').forEach(btn => {
        btn.onclick = () => {
          const si = parseInt(btn.dataset.si);
          const i = parseInt(btn.dataset.i);
          if (answers[si] !== null) return;

          answers[si] = i;
          answeredCount++;
          updateProgress();
          if (revealed < steps.length) revealed++;
          render();
        };
      });
    }

    render();
  });

  updateProgress();
}

/* ============================================================
   TÉMA
============================================================ */
function initTheme() {
  const saved = localStorage.getItem('lexarena_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('lexarena_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = $('themeIcon');
  if (!icon) return;
  icon.innerHTML = theme === 'dark'
    ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
    : '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
}

/* ============================================================
   AREA SWITCHER
============================================================ */
function switchArea(area) {
  state.area = area;
  document.querySelectorAll('.area-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.area === area);
  });
  loadOkruhy(area);
}

/* ============================================================
   INICIALIZÁCIA
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  $('themeBtn').addEventListener('click', toggleTheme);

  document.querySelectorAll('.area-btn').forEach(btn => {
    btn.addEventListener('click', () => switchArea(btn.dataset.area));
  });

  $('startQuizBtn').addEventListener('click', startQuiz);
  $('prevQBtn').addEventListener('click', prevQuestion);
  $('nextQBtn').addEventListener('click', nextQuestion);
  $('retryBtn').addEventListener('click', startQuiz);

  const firstArea = Object.keys(CONFIG)[0] || 'hmotne';
  loadOkruhy(firstArea);
});
