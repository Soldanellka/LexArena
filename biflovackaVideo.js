'use strict';

/* ============================================================
   biflovackaVideo.js
   In-app "video režim" pre Bifľovačku (Koľaj A) – definícia sa
   premieta cez celoobrazovkový prehrávač: avatar-moderátor (celá
   postava, rotuje naprieč talárovými avatarmi z avatarCatalog),
   text sa odkrýva po písmenkách synchronizovane s TTS hlasom
   (rodovo prispôsobeným moderátorovi).

   Prvé pozretie je zadarmo a nezapočíta sa do štatistík učenia
   (žiadny zápis do progresu). Opakované pozretie ("Pozrieť znova")
   je spoplatnené (ECONOMY_CONFIG.SINKS.BIFLOVACKA_VIDEO_REPLAY).
============================================================ */

import { speakText } from './memoryTrainer.js';
import { getAvatarCatalog, getModeratorForIndex, avatarStateSrc, getAvatarGender } from './scripts/avatarCatalog.js';
import { econSpend, ECONOMY_CONFIG } from './scripts/economy.js';

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

/* ============================================================
   Hlas TTS podľa pohlavia moderátora. Ak prehliadač neponúka
   žiadny hlas rozlíšiteľný menom podľa rodu, rozdiel sa aspoň
   naznačí výškou hlasu (pitch) na tom istom predvolenom hlase.
============================================================ */
let voicesReadyPromise = null;
function ensureVoicesLoaded() {
  if (!('speechSynthesis' in window)) return Promise.resolve([]);
  if (voicesReadyPromise) return voicesReadyPromise;

  voicesReadyPromise = new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) { resolve(existing); return; }
    const handler = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 500);
  });
  return voicesReadyPromise;
}

async function pickVoiceAndPitch(gender) {
  if (!('speechSynthesis' in window)) return { voice: null, pitch: 1 };
  const voices = await ensureVoicesLoaded();
  const skVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('sk'));
  const pool = skVoices.length ? skVoices : voices;

  const genderPattern = gender === 'm'
    ? /male|muž|matej|filip|martin|peter|tomáš/i
    : /female|žena|zuzana|kvetoslava|laura|klára|zofia/i;

  const match = pool.find(v => genderPattern.test(v.name));
  if (match) return { voice: match, pitch: 1 };

  // Žiadny explicitne rodovo odlíšený hlas nie je k dispozícii –
  // rozdiel medzi moderátormi aspoň naznačí výška hlasu.
  return { voice: pool[0] || null, pitch: gender === 'm' ? 0.82 : 1.15 };
}

/* ============================================================
   Písmenkový (typewriter) odkryv textu, tempovaný na odhadovanú
   dĺžku vety – nezávislý od skutočného konca TTS (ten iba rozhoduje,
   KEDY sa má prejsť na ďalšiu vetu, cez playSentences/onEnd).
============================================================ */
function typewriterReveal(el, text, durationMs) {
  const total = text.length;
  el.textContent = '';
  if (!total) return { cancel() {} };

  let cancelled = false;
  const start = performance.now();

  function tick(now) {
    if (cancelled) return;
    const elapsed = now - start;
    const count = Math.min(total, Math.ceil((elapsed / durationMs) * total));
    el.textContent = text.slice(0, count);
    if (count < total) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return { cancel() { cancelled = true; } };
}

/* Prehrá vety postupne – reťazenie cez onEnd (spoľahlivejšie ako
   'boundary' event pri sk-SK hlasoch, kde ho veľa hlasov nevystavuje).
   Ak TTS nie je dostupné, padne na časový odhad (znaky/15 s). */
function playSentences(sentences, { voice, pitch, onSentenceStart, onDone }) {
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
      voice,
      pitch,
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
    <div class="bf-video-main">
      <div class="bf-video-moderator"><img id="bfVideoModImg" alt="Moderátor" /></div>
      <div class="bf-video-content">
        <div class="bf-video-question" id="bfVideoQuestion"></div>
        <div class="bf-video-answer" id="bfVideoAnswer"></div>
      </div>
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
  const { voice, pitch } = await pickVoiceAndPitch(getAvatarGender(moderator));

  const sentences = splitSentences(reference);
  let paused = false;
  let replayBusy = false;
  let sentenceTypewriter = null;

  overlayEl = buildOverlay();
  document.body.style.overflow = 'hidden';

  document.getElementById('bfVideoQuestion').textContent = question || '';
  const answerEl = document.getElementById('bfVideoAnswer');
  answerEl.innerHTML = sentences.map((s, i) =>
    `<span class="bf-sentence" data-idx="${i}"></span>`
  ).join(' ');

  setModeratorState(moderator, 'full');

  const progressFill = document.getElementById('bfVideoProgressFill');
  const endBox = document.getElementById('bfVideoEnd');
  const pauseBtn = document.getElementById('bfVideoPauseBtn');
  const muteBtn = document.getElementById('bfVideoMuteBtn');
  const replayBtn = document.getElementById('bfVideoReplayBtn');
  muteBtn.textContent = muted ? '🔇' : '🔊';

  function highlightSentence(idx, sentenceText) {
    if (sentenceTypewriter) sentenceTypewriter.cancel();
    answerEl.querySelectorAll('.bf-sentence').forEach(node => node.classList.remove('active'));

    for (let i = 0; i < idx; i++) {
      const node = answerEl.querySelector(`[data-idx="${i}"]`);
      if (node) { node.classList.add('done'); node.textContent = sentences[i]; }
    }

    const cur = answerEl.querySelector(`[data-idx="${idx}"]`);
    if (cur) {
      cur.classList.add('active');
      cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      sentenceTypewriter = typewriterReveal(cur, sentenceText, estimateMs(sentenceText));
    }
    progressFill.style.width = `${Math.round((idx / Math.max(1, sentences.length)) * 100)}%`;
  }

  function finish() {
    if (sentenceTypewriter) sentenceTypewriter.cancel();
    setModeratorState(moderator, 'sleep');
    progressFill.style.width = '100%';
    answerEl.querySelectorAll('.bf-sentence').forEach((node, i) => {
      node.classList.remove('active');
      node.classList.add('done');
      node.textContent = sentences[i];
    });
    endBox.style.display = 'flex';
  }

  function start() {
    endBox.style.display = 'none';
    paused = false;
    pauseBtn.textContent = '⏸️ Pauza';
    ttsController = playSentences(sentences, {
      voice, pitch,
      onSentenceStart: (idx, text) => highlightSentence(idx, text),
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

  /* Opakované pozretie ("druhý pokus") je spoplatnené – prvé
     pozretie (spustené z reveal/review fázy) ostáva zadarmo. */
  replayBtn.addEventListener('click', async () => {
    if (replayBusy) return;
    const nick = localStorage.getItem('playerNick');
    if (!nick) return;

    replayBusy = true;
    replayBtn.disabled = true;
    const ok = await econSpend(nick, ECONOMY_CONFIG.SINKS.BIFLOVACKA_VIDEO_REPLAY, 'video znova v bifľovačke');
    replayBusy = false;
    replayBtn.disabled = false;
    if (!ok) return; // toast pri nedostatku § už zobrazil economy.js

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
