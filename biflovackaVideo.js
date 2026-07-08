'use strict';

/* ============================================================
   biflovackaVideo.js
   In-app "video režim" pre Bifľovačku (Koľaj A) – definícia sa
   premieta cez celoobrazovkový prehrávač: avatar-moderátor (celá
   postava, rotuje naprieč talárovými avatarmi z avatarCatalog),
   text sa odkrýva po vetách synchronizovane s TTS hlasom.

   Žiadny súbor, žiadny hosting – live render. Zadarmo, bez odmien/
   odpočtov, neráta sa do štatistík učenia (žiadne econ* volania,
   žiadny zápis do progresu).
============================================================ */

import { speakText } from './memoryTrainer.js';
import { getAvatarCatalog, getModeratorForIndex, avatarStateSrc } from './scripts/avatarCatalog.js';

let overlayEl = null;
let ttsController = null;
let muted = false;

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/* Rozdelenie na vety podľa '. ' – posledný fragment ostáva ako je
   (zvyčajne už má vlastnú koncovú interpunkciu). */
function splitSentences(text) {
  return String(text || '')
    .split(/\.\s+/)
    .map((s, i, arr) => (i < arr.length - 1 ? `${s}.` : s))
    .map(s => s.trim())
    .filter(Boolean);
}

function estimateMs(sentence) {
  return Math.max(900, Math.round((sentence.length / 15) * 1000));
}

function preloadModerator(mod) {
  if (!mod) return;
  ['full', 'tired', 'sleep'].forEach(state => {
    new Image().src = avatarStateSrc(mod, state);
  });
}

/* Prehrá vety postupne – reťazenie cez onEnd (spoľahlivejšie ako
   'boundary' event pri sk-SK hlasoch, kde ho veľa hlasov nevystavuje).
   Ak TTS nie je dostupné, padne na časový odhad (znaky/15 s). */
function playSentences(sentences, { onSentenceStart, onDone }) {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();

  let idx = 0;
  let cancelled = false;
  let fallbackHandle = null;

  function next() {
    if (cancelled) return;
    if (idx >= sentences.length) { onDone(); return; }

    const sentence = sentences[idx];
    onSentenceStart(idx, sentence);

    const spoke = speakText(sentence, {
      cancelPrevious: false,
      volume: muted ? 0 : 1,
      onEnd: () => { idx++; next(); }
    });

    if (!spoke) {
      fallbackHandle = setTimeout(() => { idx++; next(); }, estimateMs(sentence));
    }
  }

  next();

  return {
    cancel() {
      cancelled = true;
      if (fallbackHandle) clearTimeout(fallbackHandle);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };
}

function buildOverlay() {
  const el = document.createElement('div');
  el.className = 'bf-video-overlay';
  el.innerHTML = `
    <div class="bf-video-bg"></div>
    <div class="bf-video-moderator"><img id="bfVideoModImg" alt="Moderátor" /></div>
    <div class="bf-video-content">
      <div class="bf-video-question" id="bfVideoQuestion"></div>
      <div class="bf-video-answer" id="bfVideoAnswer"></div>
    </div>
    <div class="bf-video-bottom">
      <div class="bf-video-progress"><div class="bf-video-progress-fill" id="bfVideoProgressFill"></div></div>
      <div class="bf-video-controls">
        <button class="btn" id="bfVideoPauseBtn" type="button">⏸️ Pauza</button>
        <button class="btn" id="bfVideoMuteBtn" type="button">🔊</button>
        <button class="btn" id="bfVideoCloseBtn" type="button">✕ Zavrieť</button>
      </div>
    </div>
    <div class="bf-video-end" id="bfVideoEnd" style="display:none">
      <button class="btn" id="bfVideoReplayBtn" type="button">🔁 Pozrieť znova</button>
      <button class="btn btn-primary" id="bfVideoNextBtn" type="button">➡️ Ďalšia definícia</button>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

function setModeratorState(mod, state) {
  const img = document.getElementById('bfVideoModImg');
  if (img && mod) img.src = avatarStateSrc(mod, state);
}

export async function openVideoPlayer({ question, reference, defIndex = 0, onExit, onNext } = {}) {
  closeVideoPlayer();

  const catalog = await getAvatarCatalog();
  const moderator = getModeratorForIndex(catalog, defIndex);
  preloadModerator(moderator);

  const sentences = splitSentences(reference);
  let paused = false;

  overlayEl = buildOverlay();
  document.body.style.overflow = 'hidden';

  document.getElementById('bfVideoQuestion').textContent = question || '';
  const answerEl = document.getElementById('bfVideoAnswer');
  answerEl.innerHTML = sentences.map((s, i) =>
    `<span class="bf-sentence" data-idx="${i}">${escapeHtml(s)}</span>`
  ).join(' ');

  setModeratorState(moderator, 'full');

  const progressFill = document.getElementById('bfVideoProgressFill');
  const endBox = document.getElementById('bfVideoEnd');
  const pauseBtn = document.getElementById('bfVideoPauseBtn');
  const muteBtn = document.getElementById('bfVideoMuteBtn');
  muteBtn.textContent = muted ? '🔇' : '🔊';

  function highlightSentence(idx) {
    answerEl.querySelectorAll('.bf-sentence').forEach(node => node.classList.remove('active'));
    for (let i = 0; i < idx; i++) {
      const node = answerEl.querySelector(`[data-idx="${i}"]`);
      if (node) node.classList.add('done');
    }
    const cur = answerEl.querySelector(`[data-idx="${idx}"]`);
    if (cur) {
      cur.classList.add('active');
      cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    progressFill.style.width = `${Math.round((idx / Math.max(1, sentences.length)) * 100)}%`;
  }

  function finish() {
    setModeratorState(moderator, 'sleep');
    progressFill.style.width = '100%';
    answerEl.querySelectorAll('.bf-sentence').forEach(node => {
      node.classList.remove('active');
      node.classList.add('done');
    });
    endBox.style.display = 'flex';
  }

  function start() {
    endBox.style.display = 'none';
    paused = false;
    pauseBtn.textContent = '⏸️ Pauza';
    ttsController = playSentences(sentences, {
      onSentenceStart: (idx) => highlightSentence(idx),
      onDone: finish
    });
  }

  start();

  pauseBtn.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) return;
    paused = !paused;
    if (paused) {
      window.speechSynthesis.pause();
      pauseBtn.textContent = '▶️ Pokračovať';
    } else {
      window.speechSynthesis.resume();
      pauseBtn.textContent = '⏸️ Pauza';
    }
  });

  muteBtn.addEventListener('click', () => {
    muted = !muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
  });

  document.getElementById('bfVideoCloseBtn').addEventListener('click', () => {
    closeVideoPlayer();
    if (onExit) onExit();
  });

  document.getElementById('bfVideoReplayBtn').addEventListener('click', () => {
    setModeratorState(moderator, 'tired');
    start();
  });

  document.getElementById('bfVideoNextBtn').addEventListener('click', () => {
    closeVideoPlayer();
    if (onNext) onNext();
    else if (onExit) onExit();
  });
}

export function closeVideoPlayer() {
  if (ttsController) { ttsController.cancel(); ttsController = null; }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (overlayEl) { overlayEl.remove(); overlayEl = null; }
  document.body.style.overflow = '';
}
