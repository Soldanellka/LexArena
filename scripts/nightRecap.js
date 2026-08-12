'use strict';

/* ============================================================
   NOČNÝ VÝCUC – audio opakovanie oblasti pred spaním
   Karta #nightRecapCard (koniec panelu #setStudy).

   Princíp: jedna platba (SINKS.NIGHT_RECAP_UNLOCK) odomkne audio
   výcucy VŠETKÝCH okruhov oblasti na 24 h. Študent si zaškrtá
   okruhy, ktoré sa v ten deň učil (alebo všetky), a appka ich
   zreťazí do jedného plynulého prúdu: <audio> + Media Session,
   reťazenie cez 'ended' (overené na iOS aj pri zamknutej
   obrazovke – Fáza 0), časovač spánku cez deadline v 'timeupdate'
   (setTimeout v iOS pozadí nie je spoľahlivý), slučka.

   Fade-out: na iOS je audio.volume read-only, preto je fade
   zapečený priamo v MP3 (TTS pipeline); JS fade tu je len bonus
   pre Android/desktop. Web Audio API sa NEPOUŽÍVA – iOS ho pri
   zamknutí suspenduje a umlčal by celú feature.

   Vlastný výber okruhov – vedome NEsiaha na __selectedOkruhPair
   ani __area*ForGames (pojednávací výber je iný svet).
============================================================ */

import { ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { econSpend, econBalance, ECONOMY_CONFIG } from './economy.js';
import { escapeHtml } from '../core.js';
import { showRewardToast } from '../ui.js';

/* ---------- KONFIG OBLASTI (Fáza 2 pridá 'obcianske' ako ďalší záznam) ---------- */
const AREA_KEY = 'pracovne';
const AREA_LABEL = 'Pracovné právo';
/* A1–A50; A51–A53 sú v data/ nepoužívané (rovnaký limit ako statnice.js). */
const OKRUH_COUNT = 50;
/* Relatívna cesta (nie LIVE absolútna) – tá istá statika servíruje appku aj
   dáta, takže titulky okruhov fungujú lokálne aj v produkcii bez CORS. */
const DATA_PATH = 'LuluLaw duel Pracovné právo/data/';

const UNLOCK_TTL_MS = 24 * 60 * 60 * 1000;
const PREVIEW_SECONDS = 30;       // bezplatná ukážka pred odomknutím
const FADE_MS = 15000;            // JS fade pred zastavením časovača (len kde volume funguje)

/* Audio žije mimo hlavného repa: repo lexarena-audio cez jsDelivr,
   verzia = git tag (@v1). Nová verzia nahrávok = nový tag = čistá cache.
   Pre lokálny test sa dá prepnúť bez zásahu do kódu:
     localStorage.nightRecapAudioBase = 'http://localhost:8123/night-test-audio/'
     localStorage.nightRecapAudioExt  = '.wav'
     localStorage.nightRecapDevUnlock = '1'   (len UI test bez platby a Firebase) */
const AUDIO_BASE_DEFAULT = 'https://cdn.jsdelivr.net/gh/Soldanellka/lexarena-audio@v1/pracovne/vecny/';
const audioBase = () => localStorage.getItem('nightRecapAudioBase') || AUDIO_BASE_DEFAULT;
const audioExt  = () => localStorage.getItem('nightRecapAudioExt') || '.mp3';
const trackUrl  = (n) => `${audioBase()}A${n}${audioExt()}`;
const devUnlocked = () => localStorage.getItem('nightRecapDevUnlock') === '1';

/* ---------- HELPERY ---------- */
const $id = (x) => document.getElementById(x);
const getDb = () => window.db || null;
const getNick = () => localStorage.getItem('playerNick') || null;
const CACHE_KEY = `nightRecapUnlock:${AREA_KEY}`;
const SEL_KEY = `nightRecapSel:${AREA_KEY}`;
const TITLES_KEY = `nightRecapTitles:${AREA_KEY}`;

function fmtTime(s) {
  s = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/* ---------- STAV ---------- */
let unlockTs = null;              // timestamp odomknutia (null = zamknuté)
let titles = null;                // { 1: 'Pojem…', … } – lazy load
let selection = new Set();        // čísla vybraných okruhov
let playlist = [];                // aktuálny prúd (čísla okruhov)
let trackIdx = 0;
let loop = false;
let sleepDeadline = null;         // Date.now() deadline, null = bez časovača
let sleepMinutes = 0;             // 0 = „celé“ (bez časovača)
let previewMode = false;          // hrá bezplatná ukážka (stop po PREVIEW_SECONDS)
let fadeWarned = false;           // iOS: volume je read-only – logni len raz
let errorStreak = 0;              // po sebe idúce nenačítateľné stopy (poistka slučky chýb)

const isUnlocked = () => devUnlocked() || (unlockTs && Date.now() - unlockTs < UNLOCK_TTL_MS);

/* ---------- ODOMKNUTIE (Firebase + localStorage cache) ---------- */
/* Vzor videoRewards/dailyEarned: cache pre okamžitý render, DB je pravda.
   users/${nick}/nightRecap/${AREA_KEY} = Date.now() – nová podvetva pod
   users/$nick funguje bez zmeny database.rules.json. */
async function loadUnlock() {
  const cached = Number(localStorage.getItem(CACHE_KEY)) || null;
  unlockTs = cached;
  const db = getDb(), nick = getNick();
  if (!db || !nick) return;
  try {
    const snap = await get(ref(db, `users/${nick}/nightRecap/${AREA_KEY}`));
    const dbTs = snap.exists() ? Number(snap.val()) : null;
    if (dbTs !== cached) {
      unlockTs = dbTs;
      if (dbTs) localStorage.setItem(CACHE_KEY, String(dbTs));
      else localStorage.removeItem(CACHE_KEY);
      render();
    }
  } catch (e) {
    /* offline/na chvíľu bez DB – cache necháva kartu použiteľnú */
    console.warn('nightRecap: DB kontrola odomknutia zlyhala', e);
  }
}

async function unlock() {
  const nick = getNick();
  const msg = $id('nrMsg');
  if (!nick) { if (msg) msg.textContent = 'Najprv sa prihlás (nick), potom sa dá odomykať.'; return; }
  const price = ECONOMY_CONFIG.SINKS.NIGHT_RECAP_UNLOCK;

  /* Jemná hláška namiesto tvrdého bloku – nočné opakovanie je návyk,
     nie trestná zóna. Tlačidlo ostáva aktívne, nič sa nezamyká. */
  const balance = await econBalance(nick);
  if (balance < price) {
    if (msg) msg.textContent =
      `Chýba ti ešte ${price - balance} § (máš ${balance} §). Nazbieraš ich v kvízoch, dueloch a Bifľovačke – výcuc tu na teba počká. 🌙`;
    return;
  }

  const ok = await econSpend(nick, price, `Nočný výcuc – ${AREA_LABEL} (24 h)`);
  if (!ok) { if (msg) msg.textContent = 'Platba sa nepodarila, skús to ešte raz.'; return; }

  const ts = Date.now();
  try {
    await set(ref(getDb(), `users/${nick}/nightRecap/${AREA_KEY}`), ts);
  } catch (e) {
    console.warn('nightRecap: zápis odomknutia do DB zlyhal (cache platí)', e);
  }
  unlockTs = ts;
  localStorage.setItem(CACHE_KEY, String(ts));
  showRewardToast('🌙 Nočný výcuc odomknutý na 24 hodín');
  render();
}

/* ---------- TITULKY OKRUHOV (lazy, sessionStorage cache) ---------- */
async function loadTitles() {
  if (titles) return titles;
  try {
    const cached = sessionStorage.getItem(TITLES_KEY);
    if (cached) { titles = JSON.parse(cached); return titles; }
  } catch (e) { /* pokazená cache – načítame nanovo */ }

  const out = {};
  await Promise.all(Array.from({ length: OKRUH_COUNT }, (_, i) => i + 1).map(async (n) => {
    try {
      const r = await fetch(`${DATA_PATH}A${n}.json`);
      const j = await r.json();
      /* id v dátach je tvaru "1. A" – pre zoznam stačí title */
      out[n] = j.title || `Okruh ${n}`;
    } catch (e) {
      out[n] = `Okruh ${n}`;
    }
  }));
  titles = out;
  try { sessionStorage.setItem(TITLES_KEY, JSON.stringify(out)); } catch (e) { /* plné úložisko – nevadí */ }
  return titles;
}

/* ---------- VÝBER OKRUHOV ---------- */
function loadSelection() {
  try {
    const arr = JSON.parse(localStorage.getItem(SEL_KEY) || '[]');
    selection = new Set(arr.filter((n) => Number.isInteger(n) && n >= 1 && n <= OKRUH_COUNT));
  } catch (e) { selection = new Set(); }
}
function saveSelection() {
  localStorage.setItem(SEL_KEY, JSON.stringify([...selection].sort((a, b) => a - b)));
}

/* ---------- PREHRÁVAČ ---------- */
const player = () => $id('nightRecapPlayer');

function updateMediaSession(n) {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: (titles && titles[n]) || `Okruh ${n}`,
      artist: 'Nočný výcuc – LexArena',
      album: AREA_LABEL
    });
    navigator.mediaSession.setActionHandler('play', () => { player()?.play().catch(() => {}); });
    navigator.mediaSession.setActionHandler('pause', () => { player()?.pause(); });
    navigator.mediaSession.setActionHandler('nexttrack', () => stepTrack(1));
    navigator.mediaSession.setActionHandler('previoustrack', () => stepTrack(-1));
  } catch (e) { /* stará WebView bez MediaMetadata – prehrávanie beží aj tak */ }
}

function playTrack(i) {
  const el = player();
  if (!el || !playlist.length) return;
  trackIdx = Math.min(Math.max(i, 0), playlist.length - 1);
  const n = playlist[trackIdx];
  el.src = trackUrl(n);
  try { el.volume = 1; } catch (e) { /* iOS – volume read-only */ }
  updateMediaSession(n);
  updateNowPlaying();
  el.play().catch((e) => {
    /* play() mimo gesta môže odmietnuť len pri prvom štarte – ten je vždy z kliku */
    console.warn('nightRecap: play() zlyhalo', e);
  });
}

function stepTrack(delta) {
  if (!playlist.length) return;
  playTrack((trackIdx + delta + playlist.length) % playlist.length);
}

function stopPlayback() {
  const el = player();
  if (!el) return;
  el.pause();
  el.removeAttribute('src');
  try { el.load(); } catch (e) { /* niektoré prehliadače load() bez src neznesú */ }
  playlist = [];
  previewMode = false;
  sleepDeadline = null;
  updateNowPlaying();
}

function startStream() {
  if (!isUnlocked()) { render(); return; }
  const chosen = [...selection].sort((a, b) => a - b);
  const msg = $id('nrPlayMsg');
  if (!chosen.length) { if (msg) msg.textContent = 'Zaškrtni aspoň jeden okruh.'; return; }
  if (msg) msg.textContent = '';
  previewMode = false;
  errorStreak = 0;
  playlist = chosen;
  sleepDeadline = sleepMinutes ? Date.now() + sleepMinutes * 60000 : null;
  playTrack(0);
}

function startPreview() {
  /* Ukážka zdarma: prvých ~30 s prvého okruhu – nech študent počuje,
     čo kupuje, a 33 § nie je naslepo. */
  previewMode = true;
  errorStreak = 0;
  playlist = [1];
  sleepDeadline = null;
  playTrack(0);
  const msg = $id('nrMsg');
  if (msg) msg.textContent = `Hrá ukážka (${PREVIEW_SECONDS} s) – okruh 1.`;
}

function updateNowPlaying() {
  const box = $id('nrNow');
  if (!box) return;
  const el = player();
  if (!el || !playlist.length || !el.src) { box.textContent = ''; return; }
  const n = playlist[trackIdx];
  const name = (titles && titles[n]) || `Okruh ${n}`;
  let line = `▶ ${trackIdx + 1}/${playlist.length} · ${name} · ${fmtTime(el.currentTime)}/${fmtTime(el.duration)}`;
  if (sleepDeadline) line += ` · 💤 ${fmtTime((sleepDeadline - Date.now()) / 1000)}`;
  box.textContent = line;
}

function wirePlayer() {
  const el = player();
  if (!el) return;

  el.addEventListener('ended', () => {
    errorStreak = 0;
    if (previewMode) { stopPlayback(); return; }
    if (trackIdx < playlist.length - 1) playTrack(trackIdx + 1);
    else if (loop) playTrack(0);
    else stopPlayback();
  });

  el.addEventListener('error', () => {
    /* chýbajúca/nedostupná nahrávka: preskoč, ale max raz za stopu –
       keď zlyhá celý playlist, zastav (žiadna nekonečná slučka chýb) */
    errorStreak++;
    const n = playlist[trackIdx];
    console.warn(`nightRecap: nahrávka A${n} sa nedá načítať`);
    if (previewMode || errorStreak >= playlist.length) {
      showRewardToast('Nahrávky sa nepodarilo načítať 😔');
      stopPlayback();
      return;
    }
    if (trackIdx < playlist.length - 1) playTrack(trackIdx + 1);
    else if (loop) playTrack(0);
    else stopPlayback();
  });

  el.addEventListener('timeupdate', () => {
    updateNowPlaying();

    /* ukážka: tvrdý strih po PREVIEW_SECONDS */
    if (previewMode && el.currentTime >= PREVIEW_SECONDS) {
      stopPlayback();
      const msg = $id('nrMsg');
      if (msg) msg.textContent = 'Koniec ukážky. Celé okruhy odomkneš tlačidlom vyššie. 🌙';
      return;
    }

    /* časovač spánku: deadline-check (nie setTimeout – iOS pozadie) */
    if (sleepDeadline && !el.paused) {
      const rem = sleepDeadline - Date.now();
      if (rem <= 0) {
        stopPlayback();
        return;
      }
      if (rem <= FADE_MS) {
        const target = Math.max(0.05, rem / FADE_MS);
        try {
          el.volume = target;
          if (!fadeWarned && Math.abs(el.volume - target) > 0.1) {
            fadeWarned = true; // iOS: volume read-only – fade je zapečený v MP3
          }
        } catch (e) { fadeWarned = true; }
      }
    }
  });

  el.addEventListener('play', updateNowPlaying);
  el.addEventListener('pause', updateNowPlaying);
}

/* ---------- RENDER ---------- */
function timeLeftLabel() {
  const ms = (unlockTs || 0) + UNLOCK_TTL_MS - Date.now();
  if (devUnlocked() && !unlockTs) return 'DEV režim';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

function renderLocked(body) {
  const price = ECONOMY_CONFIG.SINKS.NIGHT_RECAP_UNLOCK;
  body.innerHTML = `
    <div class="nr-row">
      <button class="btn" id="nrPreviewBtn">🎧 Ukážka zdarma (${PREVIEW_SECONDS} s)</button>
      <button class="btn btn-primary" id="nrUnlockBtn">🔓 Odomkni na 24 h za ${price} §</button>
    </div>
    <div class="small" id="nrMsg" style="margin-top:8px"></div>
    <div class="small nr-now" id="nrNow" style="margin-top:4px"></div>`;
  $id('nrUnlockBtn').addEventListener('click', unlock);
  $id('nrPreviewBtn').addEventListener('click', startPreview);
}

async function renderUnlocked(body) {
  body.innerHTML = `
    <div class="small">Odomknuté ešte <b>${timeLeftLabel()}</b>. Vyber okruhy, ktoré si dnes prešiel – appka ich prehrá za sebou ako jeden prúd.</div>
    <div class="nr-row">
      <button class="btn" id="nrAllBtn">Vybrať všetkých ${OKRUH_COUNT}</button>
      <button class="btn" id="nrNoneBtn">Vyčistiť</button>
    </div>
    <div class="nr-okruh-list" id="nrOkruhList"><div class="small">Načítavam okruhy…</div></div>
    <div class="nr-row">
      <button class="btn btn-primary" id="nrPlayBtn">▶︎ Spustiť</button>
      <button class="btn" id="nrPauseBtn">⏯</button>
      <button class="btn" id="nrPrevBtn">⏮</button>
      <button class="btn" id="nrNextBtn">⏭</button>
    </div>
    <div class="nr-row small">
      💤 Časovač:
      <button class="btn nr-chip" data-sleep="0">celé</button>
      <button class="btn nr-chip" data-sleep="15">15 min</button>
      <button class="btn nr-chip" data-sleep="30">30 min</button>
      <button class="btn nr-chip" data-sleep="60">60 min</button>
      <button class="btn nr-chip" id="nrLoopBtn">🔁 slučka</button>
    </div>
    <div class="small" id="nrPlayMsg"></div>
    <div class="small nr-now" id="nrNow" style="margin-top:4px"></div>`;

  $id('nrPlayBtn').addEventListener('click', startStream);
  $id('nrPauseBtn').addEventListener('click', () => {
    const el = player();
    if (!el || !el.src) return;
    if (el.paused) el.play().catch(() => {}); else el.pause();
  });
  $id('nrPrevBtn').addEventListener('click', () => stepTrack(-1));
  $id('nrNextBtn').addEventListener('click', () => stepTrack(1));
  $id('nrLoopBtn').addEventListener('click', (e) => {
    loop = !loop;
    e.currentTarget.classList.toggle('active', loop);
  });
  body.querySelectorAll('[data-sleep]').forEach((b) => {
    b.addEventListener('click', () => {
      sleepMinutes = Number(b.dataset.sleep) || 0;
      /* zmena časovača platí hneď aj pre bežiaci prúd */
      sleepDeadline = sleepMinutes ? Date.now() + sleepMinutes * 60000 : null;
      try { const el = player(); if (el) el.volume = 1; } catch (e2) { /* iOS */ }
      body.querySelectorAll('[data-sleep]').forEach((x) => x.classList.toggle('active', x === b));
      updateNowPlaying();
    });
  });
  body.querySelector('[data-sleep="0"]').classList.add('active');

  await loadTitles();
  const list = $id('nrOkruhList');
  if (!list) return; // medzitým prekreslené (expirácia)
  list.innerHTML = Array.from({ length: OKRUH_COUNT }, (_, i) => i + 1).map((n) => `
    <label class="nr-okruh">
      <input type="checkbox" data-n="${n}" ${selection.has(n) ? 'checked' : ''}>
      <span>${n}. ${escapeHtml(titles[n])}</span>
    </label>`).join('');

  list.querySelectorAll('input[data-n]').forEach((cb) => {
    cb.addEventListener('change', () => {
      const n = Number(cb.dataset.n);
      if (cb.checked) selection.add(n); else selection.delete(n);
      saveSelection();
    });
  });
  $id('nrAllBtn').addEventListener('click', () => {
    for (let n = 1; n <= OKRUH_COUNT; n++) selection.add(n);
    saveSelection();
    list.querySelectorAll('input[data-n]').forEach((cb) => { cb.checked = true; });
  });
  $id('nrNoneBtn').addEventListener('click', () => {
    selection.clear();
    saveSelection();
    list.querySelectorAll('input[data-n]').forEach((cb) => { cb.checked = false; });
  });
}

function render() {
  const body = $id('nightRecapBody');
  if (!body) return;
  /* Expirácia počas počúvania prúd NEZASTAVÍ (v noci by to bolo kruté) –
     kontroluje sa pri renderi a pri štarte prúdu. */
  if (isUnlocked()) renderUnlocked(body);
  else renderLocked(body);
}

/* ---------- INIT ---------- */
function init() {
  if (!$id('nightRecapCard')) return;
  loadSelection();
  wirePlayer();
  render();          // okamžitý render z cache…
  loadUnlock();      // …a DB dorovnanie (prekreslí, ak sa líši)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
