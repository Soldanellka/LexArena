'use strict';

import { $, qsa, shuffleArray, saveParagrafy } from './core.js';
import { paragrafy, setParagrafy } from './state.js';
import { showRewardToast } from './ui.js';
import { playSound } from './audio.js';
import { incrementGamesPlayed } from './avatars.js';
import { LS } from './core.js';

/* ===============================
   Memory state
   =============================== */
let memoryState = {
  cards: [],
  first: null,
  second: null,
  lock: false,
  matches: 0,
  wrongs: 0,
  startTime: null,
  timer: null,
  elapsed: 0
};

let memoryFocusedIndex = 0;

/* ===============================
   Build memory board
   =============================== */
export function buildMemory(setKey = "TPH-A1"){
  const board = $('memoryBoard');
  if(!board) return;

  ensureMemoryControls();

  const pairs = (typeof memorySets !== 'undefined' && memorySets[setKey])
    ? memorySets[setKey]
    : [];

  const cards = [];
  pairs.forEach(p => {
    cards.push({ uid: p.id + "-L", pairId: p.id, text: p.left,  side: 'L', matched:false });
    cards.push({ uid: p.id + "-R", pairId: p.id, text: p.right, side: 'R', matched:false });
  });

  shuffleArray(cards);

  memoryState.cards = cards;
  memoryState.first = null;
  memoryState.second = null;
  memoryState.lock = false;
  memoryState.matches = 0;
  memoryState.wrongs = 0;
  memoryState.elapsed = 0;
  memoryState.startTime = Date.now();

  // start timer only if timer element exists (ensureMemoryControls created it)
  startTimer();

  renderMemoryBoard();
  updateMemoryCounter();
  updateStats();
  memoryFocusedIndex = 0;
}

/* ===============================
   Render board (all cards visible)
   =============================== */
export function renderMemoryBoard(){
  const board = $('memoryBoard');
  if(!board) return;

  board.innerHTML = '';

  memoryState.cards.forEach((card, idx) => {
    const el = document.createElement('div');
    el.className = 'avatar-card memory-card';
    el.style.minHeight = '72px';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontWeight = '600';
    el.style.cursor = 'pointer';
    el.dataset.uid = card.uid;
    el.dataset.index = String(idx);
    el.tabIndex = 0;

    // text directly on the card (no question mark)
    el.textContent = card.text;

    if(card.matched){
      el.classList.add('matched');
      el.style.pointerEvents = 'none';
      el.removeAttribute('tabindex');
    }

    el.addEventListener('click', () => onMemoryClick(card.uid, el));
    el.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        el.click();
      }
    });

    board.appendChild(el);
  });
}

/* ===============================
   Click logic (pairing)
   =============================== */
function onMemoryClick(uid, el){
  if(memoryState.lock) return;

  const card = memoryState.cards.find(c => c.uid === uid);
  if(!card || card.matched) return;

  if(!memoryState.first){
    memoryState.first = { card, el };
    el.classList.add('selected');
    updateMemoryCounter();
    return;
  }

  if(memoryState.first.card.uid === uid) return;

  memoryState.second = { card, el };
  memoryState.lock = true;

  const firstCard = memoryState.first.card;
  const secondCard = memoryState.second.card;

  const mode = $('memoryMode')?.value || 'training';

  if(firstCard.pairId === secondCard.pairId && firstCard.side !== secondCard.side){
    // MATCH
    firstCard.matched = true;
    secondCard.matched = true;
    memoryState.matches++;

    try { playSound(window.soundMatch); } catch(e){}

    // draw connection line
    drawConnection(memoryState.first.el, memoryState.second.el);

    // visual feedback: matched + bounce
    memoryState.first.el.classList.add('matched','bounce');
    memoryState.second.el.classList.add('matched','bounce');

    // remove selected state from first
    memoryState.first.el.classList.remove('selected');

    // disable interactions
    memoryState.first.el.style.pointerEvents = 'none';
    memoryState.second.el.style.pointerEvents = 'none';

    memoryState.first.el.removeAttribute('tabindex');
    memoryState.second.el.removeAttribute('tabindex');

    // clear bounce after short animation
    setTimeout(() => {
      if(memoryState.first && memoryState.first.el) memoryState.first.el.classList.remove('bounce');
      if(memoryState.second && memoryState.second.el) memoryState.second.el.classList.remove('bounce');
    }, 420);

    memoryState.first = null;
    memoryState.second = null;
    memoryState.lock = false;

    updateMemoryCounter();
    updateStats();

    if(memoryState.matches === memoryState.cards.length / 2){
      finishMemoryGame();
    }

  } else {
    // WRONG
    try { playSound(window.soundNoMatch); } catch(e){}

    memoryState.wrongs++;

    // visual feedback: wrong + shake
    memoryState.first.el.classList.add('wrong','shake');
    memoryState.second.el.classList.add('wrong','shake');

    if(mode === 'exam'){
      const newPar = Math.max(0, paragrafy - 1);
      setParagrafy(newPar);
      saveParagrafy(newPar);
      const pc = $('parCount');
      if(pc) pc.textContent = newPar;
      showRewardToast('Nesprávna dvojica • -1 paragraf');
    }

    // remove wrong/selected after short animation
    setTimeout(() => {
      if(memoryState.first && memoryState.first.el) memoryState.first.el.classList.remove('selected','wrong','shake');
      if(memoryState.second && memoryState.second.el) memoryState.second.el.classList.remove('wrong','shake');

      memoryState.first = null;
      memoryState.second = null;
      memoryState.lock = false;

      updateMemoryCounter();
      updateStats();
    }, 700);
  }
}

/* ===============================
   Connection animation
   =============================== */
function drawConnection(el1, el2){
  if(!el1 || !el2) return;

  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  const line = document.createElement('div');
  line.className = 'memory-line';

  const x1 = rect1.left + rect1.width / 2;
  const y1 = rect1.top + rect1.height / 2;
  const x2 = rect2.left + rect2.width / 2;
  const y2 = rect2.top + rect2.height / 2;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  line.style.position = 'fixed';
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.width = `${length}px`;
  line.style.height = '3px';
  line.style.transform = `rotate(${angle}deg)`;
  line.style.transformOrigin = '0 50%';
  line.style.zIndex = 9999;

  document.body.appendChild(line);

  // fade in then remove
  requestAnimationFrame(() => line.classList.add('fade'));
  setTimeout(() => {
    if(line && line.parentNode) line.remove();
  }, 600);
}

/* ===============================
   Timer
   =============================== */
function startTimer(){
  stopTimer();
  memoryState.elapsed = 0;
  const tEl = $('memoryTimer');
  if(tEl) tEl.textContent = 'Čas: 0 s';

  // only start if timer element exists
  if(!tEl) return;

  memoryState.timer = setInterval(() => {
    memoryState.elapsed++;
    const te = $('memoryTimer');
    if(te) te.textContent = `Čas: ${memoryState.elapsed} s`;
  }, 1000);
}

function stopTimer(){
  if(memoryState.timer) {
    clearInterval(memoryState.timer);
    memoryState.timer = null;
  }
}

/* ===============================
   Finish game
   =============================== */
function finishMemoryGame(){
  stopTimer();

  const mode = $('memoryMode')?.value || 'training';
  const reward = Math.max(1, memoryState.cards.length / 8);

  if(mode === 'exam'){
    const newPar = paragrafy + reward;
    setParagrafy(newPar);
    saveParagrafy(newPar);
    const pc = $('parCount');
    if(pc) pc.textContent = newPar;

    try { playSound(window.soundWin); } catch(e){}

    showRewardToast(`Všetky páry spojené • +${reward} paragrafov`);

    saveLeaderboardEntry({
      time: memoryState.elapsed,
      pairs: memoryState.matches,
      date: new Date().toISOString()
    });

    renderLeaderboard();
  } else {
    try { playSound(window.soundWin); } catch(e){}
    showRewardToast(`Tréning dokončený • ${memoryState.matches} párov`);
  }

  incrementGamesPlayed();
}

/* ===============================
   Memory UI controls
   =============================== */
function ensureMemoryControls(){
  const modal = $('memoryModal');
  if(!modal) return;

  const panel = modal.querySelector('.avatar-panel');
  if(!panel) return;

  if(panel.querySelector('.memory-controls')) return;

  const controls = document.createElement('div');
  controls.className = 'memory-controls';
  controls.style.display = 'flex';
  controls.style.flexDirection = 'column';
  controls.style.gap = '8px';
  controls.style.marginTop = '12px';

  /* Mode selector */
  const modeSel = document.createElement('select');
  modeSel.id = 'memoryMode';
  modeSel.className = 'btn';
  modeSel.innerHTML = `
    <option value="training">Tréning</option>
    <option value="exam">Skúška</option>
  `;

  /* Timer */
  const timer = document.createElement('div');
  timer.id = 'memoryTimer';
  timer.className = 'small';
  timer.textContent = 'Čas: 0 s';

  /* Counter */
  const counter = document.createElement('div');
  counter.className = 'small';
  counter.id = 'memoryCounter';
  counter.textContent = 'Páry: 0';

  /* Stats */
  const stats = document.createElement('div');
  stats.id = 'memoryStats';
  stats.className = 'small';
  stats.textContent = 'Úspešnosť: 0 % (0/0)';

  controls.appendChild(modeSel);
  controls.appendChild(timer);
  controls.appendChild(counter);
  controls.appendChild(stats);

  panel.appendChild(controls);

  /* Leaderboard */
  const lb = document.createElement('div');
  lb.id = 'memoryLeaderboard';
  lb.style.marginTop = '12px';
  lb.style.display = 'none';
  panel.appendChild(lb);

  renderLeaderboard();
}

/* ===============================
   Counter
   =============================== */
function updateMemoryCounter(){
  const el = $('memoryCounter');
  if(!el) return;

  const totalPairs = memoryState.cards.length / 2;
  const found = memoryState.matches;

  el.textContent = `Páry: ${found} / ${totalPairs}`;
}

/* ===============================
   Stats
   =============================== */
function updateStats(){
  const el = $('memoryStats');
  if(!el) return;

  const attempts = memoryState.matches + memoryState.wrongs;
  const success = attempts > 0 ? Math.round((memoryState.matches / attempts) * 100) : 0;

  el.textContent = `Úspešnosť: ${success} % (${memoryState.matches}/${attempts})`;
}

/* ===============================
   Leaderboard
   =============================== */
function saveLeaderboardEntry(entry){
  const raw = localStorage.getItem(LS.LEADERBOARD);
  const arr = raw ? JSON.parse(raw) : [];

  arr.push(entry);
  arr.sort((a,b) => a.time - b.time);

  const top = arr.slice(0, 10);

  try {
    localStorage.setItem(LS.LEADERBOARD, JSON.stringify(top));
  } catch(e){}
}

export function renderLeaderboard(){
  const lb = $('memoryLeaderboard');
  if(!lb) return;

  const raw = localStorage.getItem(LS.LEADERBOARD);
  const arr = raw ? JSON.parse(raw) : [];

  if(arr.length === 0){
    lb.innerHTML = '<div class="small">Žiadne záznamy.</div>';
    return;
  }

  let html = '<div style="font-weight:700;margin-bottom:8px">Leaderboard (skúška)</div>';
  html += '<ol style="padding-left:18px;margin:0">';

  arr.forEach(r => {
    const d = new Date(r.date);
    html += `<li style="margin-bottom:6px"><strong>${r.time}s</strong> • ${r.pairs} párov • <span class="small">${d.toLocaleString()}</span></li>`;
  });

  html += '</ol>';
  lb.innerHTML = html;
}

/* ===============================
   Keyboard navigation
   =============================== */
export function attachMemoryKeyboard(){
  memoryFocusedIndex = 0;
  document.addEventListener('keydown', memoryKeyboardHandler);
}

export function detachMemoryKeyboard(){
  document.removeEventListener('keydown', memoryKeyboardHandler);
}

function memoryKeyboardHandler(e){
  const modal = $('memoryModal');
  if(!modal || !modal.classList.contains('open')) return;

  const cards = qsa('#memoryBoard .memory-card');
  if(!cards.length) return;

  if(e.key === 'ArrowRight'){
    memoryFocusedIndex = (memoryFocusedIndex + 1) % cards.length;
    cards[memoryFocusedIndex].focus();
  }

  if(e.key === 'ArrowLeft'){
    memoryFocusedIndex = (memoryFocusedIndex - 1 + cards.length) % cards.length;
    cards[memoryFocusedIndex].focus();
  }

  if(e.key === 'ArrowDown'){
    memoryFocusedIndex = (memoryFocusedIndex + 4) % cards.length;
    cards[memoryFocusedIndex].focus();
  }

  if(e.key === 'ArrowUp'){
    memoryFocusedIndex = (memoryFocusedIndex - 4 + cards.length) % cards.length;
    cards[memoryFocusedIndex].focus();
  }

  if(e.key === 'Enter'){
    cards[memoryFocusedIndex].click();
  }
}
