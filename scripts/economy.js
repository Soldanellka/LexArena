'use strict';

/* ============================================================
   LEXARENA – ECONOMY ENGINE
   Jediná brána pre § a energiu avatara. Žiaden iný modul
   nesmie zapisovať § ani energiu priamo do Firebase – všetko
   ide cez econAward / econSpend / econEnergy / econGrant nižšie.

   Hodnota § = vzácnosť §. Bežný aktívny deň má skončiť približne
   na nule; na drahé veci (streak shield, prestige avatar, balíky)
   hráč šetrí alebo si ich neskôr kúpi.
============================================================ */

import { ref, get, set, update, runTransaction }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

import { awardParagrafy, spendParagrafy, deductEnergy, canPlayDuel }
from './avatar.js';
import { ECONOMY_CONFIG, getRole, logTransaction } from './economyConfig.js';
import { showRewardToast } from '../ui.js';

export { ECONOMY_CONFIG };

/* ---------- HELPERY ---------- */
function getDb() { return window.db || null; }
function getNick() { return localStorage.getItem('playerNick') || null; }
function todayKey() { return new Date().toISOString().slice(0, 10); }

async function getBalance(db, nick) {
  const snap = await get(ref(db, `users/${nick}/paragrafy`));
  return snap.exists() ? snap.val() : 0;
}

/* Priamy zápis § pre ĽUBOVOĽNÝ nick (napr. súper v dueli, ktorý
   nesedí za týmto zariadením) – avatar.js vie pracovať len
   s aktuálnym lokálnym hráčom. */
async function awardParagrafyRemote(db, nick, amount) {
  const userRef = ref(db, `users/${nick}`);
  const snap = await get(userRef);
  const data = snap.exists() ? snap.val() : {};
  const current = data.paragrafy || 0;
  const newTotal = current + amount;
  await update(userRef, {
    paragrafy: newTotal,
    totalParagraphsEarned: (data.totalParagraphsEarned || 0) + amount,
    lastParUpdate: Date.now()
  });
  return newTotal;
}

async function spendParagrafyRemote(db, nick, amount) {
  const current = await getBalance(db, nick);
  if (current < amount) return { ok: false, balanceAfter: current };
  const balanceAfter = current - amount;
  await update(ref(db, `users/${nick}`), { paragrafy: balanceAfter, lastParUpdate: Date.now() });
  return { ok: true, balanceAfter };
}

/* Dorovná denný strop zárobku pre daný nick. Vráti povolenú (prípadne
   orezanú) sumu, alebo null ak je strop už vyčerpaný. */
async function applyDailyCap(db, nick, amount) {
  const cap = ECONOMY_CONFIG.LIMITS.DAILY_EARN_CAP;
  const capRef = ref(db, `users/${nick}/dailyEarned/${todayKey()}`);
  const snap = await get(capRef);
  const earned = snap.exists() ? snap.val() : 0;

  if (earned >= cap) {
    if (nick === getNick()) {
      showRewardToast(`Dosiahol/a si dnešný limit ${cap}§ z aktivít. Streak, rebríčky a videá idú ďalej!`);
    }
    return null;
  }

  const allowed = Math.min(amount, cap - earned);
  await set(capRef, earned + allowed);
  return allowed;
}

/* ============================================================
   1️⃣ econAward – pripíše §
   opts.skipCap = true pre streak, rebríčky, videá, reklamy, granty
============================================================ */
export async function econAward(nick, amount, reason = '', opts = {}) {
  const db = getDb();
  if (!db || !nick || !amount) return null;

  const role = await getRole(nick);
  const skipCap = !!opts.skipCap || role === 'admin';

  let grantAmount = amount;
  if (!skipCap) {
    grantAmount = await applyDailyCap(db, nick, amount);
    if (grantAmount === null) return null;
  }
  if (!grantAmount) return null;

  let balanceAfter;
  if (nick === getNick()) {
    balanceAfter = await awardParagrafy(grantAmount, reason);
  } else {
    balanceAfter = await awardParagrafyRemote(db, nick, grantAmount);
  }

  await logTransaction(nick, { type: 'award', amount: grantAmount, reason, balanceAfter });
  return balanceAfter;
}

/* ============================================================
   2️⃣ econSpend – odpíše §, zlyhá pri nedostatku
   admin: vždy zadarmo (bez odpočtu)
============================================================ */
export async function econSpend(nick, amount, reason = '') {
  const db = getDb();
  if (!db || !nick || !amount) return false;

  const role = await getRole(nick);
  if (role === 'admin') {
    await logTransaction(nick, { type: 'spend', amount: 0, reason: `${reason} (admin zadarmo)`, balanceAfter: null });
    return true;
  }

  if (nick === getNick()) {
    const ok = await spendParagrafy(amount, reason);
    if (!ok) return false;
    const balanceAfter = await getBalance(db, nick);
    await logTransaction(nick, { type: 'spend', amount, reason, balanceAfter });
    return true;
  }

  const result = await spendParagrafyRemote(db, nick, amount);
  if (!result.ok) return false;
  await logTransaction(nick, { type: 'spend', amount, reason, balanceAfter: result.balanceAfter });
  return true;
}

/* ============================================================
   3️⃣ econEnergy – zmení energiu avatara (0–100)
   Energia je viazaná na toto zariadenie (aktuálny lokálny hráč).
============================================================ */
export async function econEnergy(nick, delta, reason = '') {
  if (!delta || nick !== getNick()) return;
  const newEnergy = await deductEnergy(Math.abs(delta));
  await logTransaction(nick, { type: 'energy', amount: delta, reason, balanceAfter: newEnergy });
}

/* ============================================================
   4️⃣ econCanPlay – kontrola pred hraním (duel, bifľovačka,
   memory, prípady). Vráti false + toast, ak avatar spí.
============================================================ */
export async function econCanPlay(activity = '') {
  return await canPlayDuel();
}

/* ============================================================
   5️⃣ VIDEÁ – jednorazová odmena na video a nick
============================================================ */
export async function econVideoReward(videoId) {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick || !videoId) return false;

  const claimedRef = ref(db, `users/${nick}/videoRewards/${videoId}`);
  const already = await get(claimedRef);
  if (already.exists()) {
    showRewardToast('Odmenu za toto video si už získal/a.');
    return false;
  }

  await set(claimedRef, true);
  await econAward(nick, ECONOMY_CONFIG.REWARDS.VIDEO, 'za pozretie videa 🎬', { skipCap: true });
  return true;
}

/* Len na čítanie – pre UI (napr. zobrazenie "už vyzdvihnuté" v modáli videa). */
export async function econIsVideoClaimed(videoId) {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick || !videoId) return false;
  const snap = await get(ref(db, `users/${nick}/videoRewards/${videoId}`));
  return snap.exists();
}

/* ============================================================
   6️⃣ REKLAMY – príprava bez zobrazenia v UI (ADS.ENABLED=false)
============================================================ */
export async function econWatchAd() {
  if (!ECONOMY_CONFIG.ADS.ENABLED) return { available: false };

  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return { available: false };

  const countRef = ref(db, `users/${nick}/adsWatched/${todayKey()}`);
  const snap = await get(countRef);
  const count = snap.exists() ? snap.val() : 0;
  if (count >= ECONOMY_CONFIG.ADS.DAILY_MAX) {
    return { available: false, reason: 'daily_max' };
  }

  // TODO: pri aktivácii monetizácie sem doplniť volanie SDK poskytovateľa
  // odmeňovanej reklamy, napr.:
  //   const result = await adProvider.showRewardedAd();
  //   if (!result.completed) return { available: false, reason: 'not_completed' };
  await set(countRef, count + 1);
  await econAward(nick, ECONOMY_CONFIG.ADS.REWARD, 'za pozretie reklamy', { skipCap: true });
  return { available: true };
}

/* ============================================================
   7️⃣ GARANT – denný limit rozdávania §
============================================================ */
export async function econGrant(fromGarant, toNick, amount) {
  const db = getDb();
  if (!db || !fromGarant || !toNick || !amount) return false;

  const role = await getRole(fromGarant);
  if (role !== 'garant' && role !== 'admin') {
    showRewardToast('Len garant alebo admin môže rozdávať §.');
    return false;
  }

  if (role === 'garant') {
    const cap = ECONOMY_CONFIG.ROLES.GARANT_DAILY_GRANT;
    const grantRef = ref(db, `users/${fromGarant}/dailyGrant/${todayKey()}`);
    const snap = await get(grantRef);
    const already = snap.exists() ? snap.val() : 0;
    if (already + amount > cap) {
      showRewardToast(`Denný limit garanta vyčerpaný (${cap}§).`);
      return false;
    }
    await set(grantRef, already + amount);
  }

  await econAward(toNick, amount, `dar od garanta ${fromGarant}`, { skipCap: true });
  await logTransaction(fromGarant, { type: 'grant', amount: -amount, reason: `dar pre ${toNick}`, balanceAfter: null });
  return true;
}

/* ============================================================
   8️⃣ REBRÍČKY – LAZY vyhodnotenie s ochranou proti dvojitej výplate
============================================================ */
function isoWeekInfo(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return { year: d.getUTCFullYear(), week };
}

function getWeekStartLocal(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getPreviousWeekPeriod(now = new Date()) {
  const thisWeekStart = getWeekStartLocal(now);
  const prevWeekStart = new Date(thisWeekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);
  const { year, week } = isoWeekInfo(prevWeekStart);
  return {
    key: `W-${year}-${String(week).padStart(2, '0')}`,
    start: prevWeekStart.getTime(),
    end: thisWeekStart.getTime(),
    rewardTable: ECONOMY_CONFIG.LEADERBOARD.WEEKLY,
    label: 'týždennom'
  };
}

function getPreviousMonthPeriod(now = new Date()) {
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
  return {
    key: `M-${prevMonthStart.getFullYear()}-${String(prevMonthStart.getMonth() + 1).padStart(2, '0')}`,
    start: prevMonthStart.getTime(),
    end: thisMonthStart.getTime(),
    rewardTable: ECONOMY_CONFIG.LEADERBOARD.MONTHLY,
    label: 'mesačnom'
  };
}

/* Rovnaká agregácia ako scripts/leaderboard.js (duels/{id}.result),
   len ohraničená na konkrétne uzavreté obdobie [start, end). */
function aggregateDuelStats(duelsData, start, end) {
  const stats = {};
  Object.values(duelsData || {}).forEach(duel => {
    if (!duel || duel.status !== 'finished' || !duel.result) return;
    if (!duel.finishedAt || duel.finishedAt < start || duel.finishedAt >= end) return;

    const { firstPlayer, secondPlayer, winner } = duel.result;
    if (!firstPlayer || !secondPlayer) return;

    [firstPlayer, secondPlayer].forEach(p => {
      if (!p || !p.nick || p.nick === 'null' || p.nick === 'Unknown') return;
      if (!stats[p.nick]) stats[p.nick] = { nick: p.nick, points: 0 };
      stats[p.nick].points += (typeof p.score === 'number' ? p.score : 0);
    });
  });
  return Object.values(stats).sort((a, b) => b.points - a.points);
}

/* Transaction lock na rewards/{key}/evaluated – kto prvý zapíše true,
   ten vyhodnocuje; ostatní (paralelne otvorení hráči) preskočia. */
async function settlePeriod(db, period) {
  const evaluatedRef = ref(db, `rewards/${period.key}/evaluated`);

  /* POZOR na optimistický beh Firebase transakcií: callback sa najprv
     spustí s lokálnou (často null) hodnotou a až potom so serverovou.
     Preto sa NESMIE rozhodovať podľa vlajky nastavenej v callbacku –
     jediný spoľahlivý signál je result.committed. */
  const result = await runTransaction(evaluatedRef, (current) => {
    if (current === true) return; // abort – už vyhodnotené
    return true;
  });

  if (!result || !result.committed) return;

  const duelsSnap = await get(ref(db, 'duels'));
  const duelsData = duelsSnap.exists() ? duelsSnap.val() : {};
  const top3 = aggregateDuelStats(duelsData, period.start, period.end).slice(0, 3);

  const winners = [];
  for (let i = 0; i < top3.length; i++) {
    const amount = period.rewardTable[i] || 0;
    if (amount > 0) {
      await econAward(top3[i].nick, amount, `${i + 1}. miesto v ${period.label} rebríčku`, { skipCap: true });
      winners.push({ nick: top3[i].nick, amount, place: i + 1 });
    }
  }

  await set(ref(db, `rewards/${period.key}/winners`), winners);
}

/* Ak je aktuálny hráč medzi výhercami a ešte to nevidel, zobraz toast raz. */
async function announceLeaderboardWinIfAny(db, periods) {
  const nick = getNick();
  if (!nick) return;

  for (const period of periods) {
    const winnersSnap = await get(ref(db, `rewards/${period.key}/winners`));
    if (!winnersSnap.exists()) continue;

    const winners = winnersSnap.val() || [];
    const mine = winners.find(w => w.nick === nick);
    if (!mine) continue;

    const seenRef = ref(db, `rewards/${period.key}/seen/${nick}`);
    const seenSnap = await get(seenRef);
    if (seenSnap.exists()) continue;

    await set(seenRef, true);
    showRewardToast(`🏆 Skončil/a si ${mine.place}. v ${period.label} rebríčku! +${mine.amount}§`);
  }
}

export async function econSettleLeaderboards() {
  const db = getDb();
  if (!db) return;

  const periods = [getPreviousWeekPeriod(), getPreviousMonthPeriod()];
  for (const period of periods) {
    await settlePeriod(db, period);
  }
  await announceLeaderboardWinIfAny(db, periods);
}

window.econAward = econAward;
window.econSpend = econSpend;
window.econEnergy = econEnergy;
window.econCanPlay = econCanPlay;
window.econVideoReward = econVideoReward;
window.econIsVideoClaimed = econIsVideoClaimed;
window.econWatchAd = econWatchAd;
window.econGrant = econGrant;
window.econSettleLeaderboards = econSettleLeaderboards;
