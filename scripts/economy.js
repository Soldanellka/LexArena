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

/* Len na čítanie – aktuálny zostatok § pre nick (napr. zobrazenie
   "Máš: X§" pri žolíkoch v Bifľovačke). */
export async function econBalance(nick) {
  const db = getDb();
  if (!db || !nick) return 0;
  return await getBalance(db, nick);
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
   6️⃣ REKLAMY – "Získaj §" karta 📺
   econAdStatus(): len na čítanie, pre render karty (koľko zostáva dnes).
   econAdComplete(): volať AŽ PO dopozeraní (20 s časovač v UI vrstve);
   denný limit sa vynucuje transakčne (result.committed), potom sa
   pripíše odmena cez econAward.
============================================================ */
export async function econAdStatus() {
  if (!ECONOMY_CONFIG.ADS.ENABLED) return { enabled: false, remaining: 0 };

  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return { enabled: true, remaining: 0 };

  const snap = await get(ref(db, `users/${nick}/adsWatched/${todayKey()}`));
  const count = snap.exists() ? snap.val() : 0;
  return { enabled: true, remaining: Math.max(0, ECONOMY_CONFIG.ADS.DAILY_MAX - count) };
}

export async function econAdComplete() {
  if (!ECONOMY_CONFIG.ADS.ENABLED) return { success: false, reason: 'disabled' };

  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return { success: false, reason: 'no_user' };

  const max = ECONOMY_CONFIG.ADS.DAILY_MAX;
  const countRef = ref(db, `users/${nick}/adsWatched/${todayKey()}`);

  // Transakčne – nie get-potom-set – aby dve súbežné reklamy v tú istú
  // sekundu nemohli obe prejsť cez limit. Rozhoduje result.committed.
  const result = await runTransaction(countRef, (current) => {
    const count = current || 0;
    if (count >= max) return; // abort – limit už vyčerpaný
    return count + 1;
  });

  if (!result.committed) {
    showRewardToast(`Dnešný limit ${max} reklám je vyčerpaný. Vráť sa zajtra!`);
    return { success: false, reason: 'daily_max' };
  }

  // TODO: pri aktivácii monetizácie sem doplniť volanie SDK poskytovateľa
  // odmeňovanej reklamy PRED zavolaním econAdComplete (t. j. zavolať túto
  // funkciu až po potvrdení od SDK, že reklama bola skutočne dopozeraná),
  // napr.: const result = await adProvider.showRewardedAd();
  //        if (!result.completed) return; // nevolaj econAdComplete()
  await econAward(nick, ECONOMY_CONFIG.ADS.REWARD, 'za pozretie reklamy', { skipCap: true });
  return { success: true };
}

/* Spätná kompatibilita – pôvodná jednofázová funkcia (get+set, nie
   transakcia). Nová UI cez econAdStatus/econAdComplete ju nepoužíva. */
export async function econWatchAd() {
  const status = await econAdStatus();
  if (!status.enabled || status.remaining <= 0) return { available: false };
  const result = await econAdComplete();
  return { available: result.success };
}

/* ============================================================
   PROMO KÓDY – 🎟️ "Zadaj kód" karta
   promoCodes/{CODE}: { amount, active, maxUses, usedCount, expiresAt,
                         createdBy, createdAt, redeemed: { [nick]: true } }
   Jeden nick môže jeden kód uplatniť len raz. Atomicita cez transakciu
   na CELOM uzle (všetky podmienky overené znova v callbacku), double-click
   ochrana rovnako ako pri econAdComplete: rozhoduje result.committed.
============================================================ */
export async function econRedeemCode(rawCode) {
  const db = getDb();
  const nick = getNick();
  const code = (rawCode || '').trim().toUpperCase();
  if (!db || !nick || !code) return { ok: false, message: '❌ Neplatný kód' };

  const codeRef = ref(db, `promoCodes/${code}`);
  const snap = await get(codeRef);

  if (!snap.exists() || snap.val().active !== true) {
    return { ok: false, message: '❌ Neplatný kód' };
  }
  const preData = snap.val();
  if (preData.redeemed && preData.redeemed[nick]) {
    return { ok: false, message: '❌ Kód si už použil/a' };
  }
  const now = Date.now();
  const preExpired = typeof preData.expiresAt === 'number' && preData.expiresAt < now;
  const preExhausted = typeof preData.maxUses === 'number' && (preData.usedCount || 0) >= preData.maxUses;
  if (preExpired || preExhausted) {
    return { ok: false, message: '❌ Kód vypršal alebo bol vyčerpaný' };
  }

  const result = await runTransaction(codeRef, (current) => {
    if (!current || current.active !== true) return; // abort – neplatný/neexistujúci
    if (current.redeemed && current.redeemed[nick]) return; // abort – už uplatnil
    const expired = typeof current.expiresAt === 'number' && current.expiresAt < Date.now();
    const exhausted = typeof current.maxUses === 'number' && (current.usedCount || 0) >= current.maxUses;
    if (expired || exhausted) return; // abort

    return {
      ...current,
      usedCount: (current.usedCount || 0) + 1,
      redeemed: { ...(current.redeemed || {}), [nick]: true }
    };
  });

  if (!result.committed) {
    const final = result.snapshot.val();
    if (!final || final.active !== true) return { ok: false, message: '❌ Neplatný kód' };
    if (final.redeemed && final.redeemed[nick]) return { ok: false, message: '❌ Kód si už použil/a' };
    return { ok: false, message: '❌ Kód vypršal alebo bol vyčerpaný' };
  }

  const amount = result.snapshot.val().amount || 0;
  await econAward(nick, amount, `promo kód ${code}`, { skipCap: true });
  showRewardToast(`🎟️ +${amount}§ za kód ${code}!`);
  return { ok: true, message: `✅ Kód ${code}: +${amount}§!`, amount };
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
   ten vyhodnocuje; ostatní (paralelne otvorení hráči) preskočia.
   POZOR: rozhoduje sa podľa result.committed (návratová hodnota
   runTransaction), NIE podľa vlajky nastavenej vnútri callbacku – ten sa
   môže pri kontencii zavolať viackrát/aj keď transakcia napokon abortne,
   čo pri optimistickom vyhodnocovaní vie spôsobiť dvojitú výplatu. */
async function settlePeriod(db, period) {
  const evaluatedRef = ref(db, `rewards/${period.key}/evaluated`);

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
window.econBalance = econBalance;
window.econEnergy = econEnergy;
window.econCanPlay = econCanPlay;
window.econVideoReward = econVideoReward;
window.econIsVideoClaimed = econIsVideoClaimed;
window.econWatchAd = econWatchAd;
window.econAdStatus = econAdStatus;
window.econAdComplete = econAdComplete;
window.econRedeemCode = econRedeemCode;
window.econGrant = econGrant;
window.econSettleLeaderboards = econSettleLeaderboards;
