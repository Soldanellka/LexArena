'use strict';

import { ref, get, update, onValue }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { showRewardToast } from '../ui.js';

/* ============================================================
   KONFIGURÁCIA AVATARA
============================================================ */

const AVATAR_CONFIG = {
  // Energia
  MAX_ENERGY: 100,
  ENERGY_PER_DUEL: -10,      // každý duel (výzva) -10 energie
  ENERGY_PER_QUIZ: -3,       // každý študijný kvíz -3 energie
  FEED_COST: 12,             // kŕmenie stojí 12§
  FEED_ENERGY: 100,          // kŕmenie doplní na 100%
  SLEEP_THRESHOLD: 0,        // pri 0 avatar zaspí

  // Denný login streak
  STREAK_REWARDS: [2, 3, 4, 5, 6, 7, 10], // deň 1-7
  STREAK_SHIELD_COST: 5,     // štít streaku stojí 5§

  // Dostupné avatary (id: { name, file_awake, file_sleep, unlockCondition })
  AVATARS: {
    'student-f': {
      name: 'Študentka práva',
      awake: 'assets/avatars/student-f-awake.svg',
      sleep: 'assets/avatars/student-f-sleep.svg',
      unlock: 'default',
      desc: 'Dostupná pre všetkých'
    },
    'student-m': {
      name: 'Študent práva',
      awake: 'assets/avatars/student-m-awake.svg',
      sleep: 'assets/avatars/student-m-sleep.svg',
      unlock: 'default',
      desc: 'Dostupný pre všetkých'
    },
    'cat': {
      name: 'Právnická mačka',
      awake: 'assets/avatars/cat-avatar.svg',
      sleep: 'assets/avatars/cat-avatar.svg',
      unlock: 'paragraphs_100',
      unlockValue: 100,
      desc: 'Odomkni za 100§'
    },
    'owl': {
      name: 'Sova múdrosti',
      awake: 'assets/avatars/owl-avatar.svg',
      sleep: 'assets/avatars/owl-avatar.svg',
      unlock: 'reports_100',
      unlockValue: 100,
      desc: 'Za 100 uznaných nahlásení'
    }
  }
};

/* ============================================================
   HELPER: prístup k DB a nick
============================================================ */
function getDb() { return window.db || null; }
function getNick() { return localStorage.getItem('playerNick') || null; }

/* ============================================================
   § EKONOMIKA – centralizované prideľovanie
============================================================ */
export async function awardParagrafy(amount, reason = '') {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick || !amount) return;

  const userRef = ref(db, `users/${nick}`);
  const snap = await get(userRef);
  const data = snap.exists() ? snap.val() : {};
  const current = data.paragrafy || 0;
  const newTotal = current + amount;

  await update(userRef, {
    paragrafy: newTotal,
    lastParUpdate: Date.now()
  });

  // Aktualizuj UI
  const el = document.getElementById('parCount') || document.getElementById('paragrafValue');
  if (el) el.textContent = newTotal;

  if (reason) {
    showRewardToast(`+${amount}§ ${reason}`);
  }

  console.log(`💰 ${amount}§ pridelených (${reason}). Celkom: ${newTotal}`);
  return newTotal;
}

export async function spendParagrafy(amount, reason = '') {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return false;

  const userRef = ref(db, `users/${nick}`);
  const snap = await get(userRef);
  const data = snap.exists() ? snap.val() : {};
  const current = data.paragrafy || 0;

  if (current < amount) {
    showRewardToast(`Nemáš dostatok §. Potrebuješ ${amount}§, máš ${current}§.`);
    return false;
  }

  const newTotal = current - amount;
  await update(userRef, { paragrafy: newTotal, lastParUpdate: Date.now() });

  const el = document.getElementById('parCount') || document.getElementById('paragrafValue');
  if (el) el.textContent = newTotal;

  console.log(`💸 ${amount}§ minutých (${reason}). Celkom: ${newTotal}`);
  return true;
}

/* ============================================================
   AVATAR – načítanie a uloženie stavu
============================================================ */
async function loadAvatarState(nick) {
  const db = getDb();
  if (!db || !nick) return null;

  const snap = await get(ref(db, `users/${nick}/avatar`));
  if (!snap.exists()) {
    // Defaultný stav pri prvom prihlásení
    const defaultState = {
      type: 'student-f',
      energy: 100,
      lastEnergyUpdate: Date.now()
    };
    await update(ref(db, `users/${nick}/avatar`), defaultState);
    return defaultState;
  }
  return snap.val();
}

async function saveAvatarState(nick, state) {
  const db = getDb();
  if (!db || !nick) return;
  await update(ref(db, `users/${nick}/avatar`), state);
}

/* ============================================================
   ENERGIA – výpočet aktuálnej energie
   (energia sa nemíňa časom sama od seba, len hraním)
============================================================ */
export async function deductEnergy(amount) {
  const nick = getNick();
  if (!nick) return 100;

  const state = await loadAvatarState(nick);
  if (!state) return 100;

  const newEnergy = Math.max(0, (state.energy || 100) - amount);
  await saveAvatarState(nick, {
    ...state,
    energy: newEnergy,
    lastEnergyUpdate: Date.now()
  });

  updateAvatarUI(newEnergy, state.type);
  return newEnergy;
}

/* ============================================================
   KŔMENIE AVATARA
============================================================ */
export async function feedAvatar() {
  const nick = getNick();
  if (!nick) return;

  const spent = await spendParagrafy(AVATAR_CONFIG.FEED_COST, 'za kŕmenie avatara');
  if (!spent) return;

  const state = await loadAvatarState(nick);
  const newEnergy = AVATAR_CONFIG.FEED_ENERGY;

  await saveAvatarState(nick, {
    ...state,
    energy: newEnergy,
    lastEnergyUpdate: Date.now()
  });

  updateAvatarUI(newEnergy, state.type);
  showRewardToast('🍖 Avatar nakŕmený! Energia 100%');
}

/* ============================================================
   KONTROLA – môže hráč hrať duelový kvíz?
============================================================ */
export async function canPlayDuel() {
  const nick = getNick();
  if (!nick) return true; // ak nie je prihlásený, nevylučujeme

  const state = await loadAvatarState(nick);
  if (!state) return true;

  if ((state.energy || 100) <= AVATAR_CONFIG.SLEEP_THRESHOLD) {
    showRewardToast('😴 Avatar spí! Nakŕm ho za 12§ aby sa prebudil.');
    return false;
  }
  return true;
}

/* ============================================================
   DENNÝ LOGIN + STREAK
============================================================ */
export async function checkDailyLogin() {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return;

  const userRef = ref(db, `users/${nick}`);
  const snap = await get(userRef);
  const data = snap.exists() ? snap.val() : {};

  const now = Date.now();
  const lastLogin = data.lastLogin || 0;
  const streak = data.loginStreak || 0;
  const shieldActive = data.streakShield || false;

  const hoursSinceLast = (now - lastLogin) / (1000 * 60 * 60);

  // Ak prišiel v ten istý deň, nič
  if (hoursSinceLast < 24) return;

  let newStreak = streak;
  let streakBroken = false;

  if (hoursSinceLast < 48) {
    // Prišiel v ďalší deň — streak pokračuje
    newStreak = Math.min(streak + 1, 7);
  } else {
    // Vynechal deň
    if (shieldActive) {
      // Štít zachránil streak
      newStreak = Math.min(streak + 1, 7);
      await update(userRef, { streakShield: false });
      showRewardToast('🛡️ Štít streaku aktivovaný! Streak zachránený.');
    } else {
      // Reset streaku
      newStreak = 1;
      streakBroken = streak > 1;
    }
  }

  // Odmena
  const rewardIndex = Math.min(newStreak - 1, 6);
  const reward = AVATAR_CONFIG.STREAK_REWARDS[rewardIndex];

  await update(userRef, {
    lastLogin: now,
    loginStreak: newStreak
  });

  await awardParagrafy(reward, `za prihlásenie (deň ${newStreak})`);

  // Zobraz streak info
  if (streakBroken) {
    showRewardToast(`💔 Streak prerušený. Začínaš odznova. +${reward}§`);
  } else if (newStreak === 7) {
    showRewardToast(`🔥 STREAK BONUS! 7 dní za sebou! +${reward}§`);
  } else if (newStreak > 1) {
    showRewardToast(`🔥 Streak ${newStreak} dní! +${reward}§. Zajtra +${AVATAR_CONFIG.STREAK_REWARDS[Math.min(newStreak, 6)]}§`);
  }

  // Aktualizuj UI streak
  updateStreakUI(newStreak);
}

/* ============================================================
   KÚPIŤ ŠTÍT STREAKU
============================================================ */
export async function buyStreakShield() {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return;

  const snap = await get(ref(db, `users/${nick}`));
  const data = snap.exists() ? snap.val() : {};

  if (data.streakShield) {
    showRewardToast('Štít streaku už máš aktivovaný.');
    return;
  }

  const spent = await spendParagrafy(AVATAR_CONFIG.STREAK_SHIELD_COST, 'za štít streaku');
  if (!spent) return;

  await update(ref(db, `users/${nick}`), { streakShield: true });
  showRewardToast('🛡️ Štít streaku aktivovaný! Môžeš vynechať 1 deň.');
}

/* ============================================================
   VÝBER AVATARA
============================================================ */
export async function selectAvatar(avatarType) {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return;

  const avatarDef = AVATAR_CONFIG.AVATARS[avatarType];
  if (!avatarDef) return;

  // Kontrola odomknutia
  if (avatarDef.unlock !== 'default') {
    const snap = await get(ref(db, `users/${nick}`));
    const data = snap.exists() ? snap.val() : {};

    if (avatarDef.unlock === 'paragraphs_100') {
      const totalEarned = data.totalParagraphsEarned || 0;
      if (totalEarned < avatarDef.unlockValue) {
        showRewardToast(`Potrebuješ celkovo ${avatarDef.unlockValue}§ na odomknutie tohto avatara.`);
        return;
      }
    }
    if (avatarDef.unlock === 'reports_100') {
      const acceptedReports = data.acceptedReports || 0;
      if (acceptedReports < avatarDef.unlockValue) {
        showRewardToast(`Potrebuješ ${avatarDef.unlockValue} uznaných nahlásení.`);
        return;
      }
    }
  }

  const state = await loadAvatarState(nick);
  await saveAvatarState(nick, { ...state, type: avatarType });
  updateAvatarUI(state.energy || 100, avatarType);
  showRewardToast(`Avatar zmenený na: ${avatarDef.name}`);
}

/* ============================================================
   UI – aktualizácia avatara na stránke
============================================================ */
export function updateAvatarUI(energy, avatarType) {
  const avatarDef = AVATAR_CONFIG.AVATARS[avatarType] || AVATAR_CONFIG.AVATARS['student-f'];
  const isSleeping = energy <= AVATAR_CONFIG.SLEEP_THRESHOLD;

  // Obrázok avatara
  const imgEl = document.getElementById('userAvatar');
  if (imgEl) {
    imgEl.src = isSleeping ? avatarDef.sleep : avatarDef.awake;
    imgEl.alt = avatarDef.name;
    // Animácia pri spánku
    imgEl.style.filter = isSleeping ? 'saturate(0.5) brightness(0.8)' : '';
  }

  // Energy bar (ak existuje)
  const energyBar = document.getElementById('avatarEnergyBar');
  if (energyBar) {
    energyBar.style.width = `${energy}%`;
    energyBar.style.background = energy > 30
      ? 'linear-gradient(90deg, #48bb78, #38a169)'
      : energy > 10
        ? 'linear-gradient(90deg, #ed8936, #dd6b20)'
        : 'linear-gradient(90deg, #fc8181, #e53e3e)';
  }

  const energyText = document.getElementById('avatarEnergyText');
  if (energyText) {
    energyText.textContent = isSleeping ? '😴 Spí' : `⚡ ${energy}%`;
  }

  // Feed button
  const feedBtn = document.getElementById('feedAvatarBtn');
  if (feedBtn) {
    feedBtn.style.display = isSleeping ? 'inline-flex' : 'none';
  }

  // Duel button blokovanie
  const startDuelBtn = document.getElementById('startQuizBtn');
  if (startDuelBtn && isSleeping) {
    startDuelBtn.disabled = true;
    startDuelBtn.title = 'Avatar spí – nakŕm ho!';
  }

  window.__currentAvatarEnergy = energy;
  window.__currentAvatarType = avatarType;
}

export function updateStreakUI(streak) {
  const el = document.getElementById('loginStreakDisplay');
  if (!el) return;
  const flames = streak >= 7 ? '🔥🔥🔥' : streak >= 4 ? '🔥🔥' : streak >= 2 ? '🔥' : '';
  el.textContent = `${flames} Streak: ${streak} ${streak === 7 ? '(MAX!)' : `dní`}`;
}

/* ============================================================
   INIT – spustenie celého systému
============================================================ */
export async function initAvatarSystem() {
  const nick = getNick();
  if (!nick) return;

  const db = getDb();
  if (!db) return;

  // Denný login
  await checkDailyLogin();

  // Načítaj stav
  const state = await loadAvatarState(nick);
  if (state) {
    updateAvatarUI(state.energy || 100, state.type || 'student-f');
  }

  // Live sledovanie zmien avatara
  onValue(ref(db, `users/${nick}/avatar`), (snap) => {
    if (snap.exists()) {
      const s = snap.val();
      updateAvatarUI(s.energy || 100, s.type || 'student-f');
    }
  });

  // Live sledovanie paragrafov
  onValue(ref(db, `users/${nick}`), (snap) => {
    if (snap.exists()) {
      const data = snap.val();
      const el = document.getElementById('parCount') || document.getElementById('paragrafValue');
      if (el && data.paragrafy !== undefined) el.textContent = data.paragrafy;
      updateStreakUI(data.loginStreak || 0);
    }
  });

  // Feed button
  const feedBtn = document.getElementById('feedAvatarBtn');
  if (feedBtn) {
    feedBtn.addEventListener('click', feedAvatar);
  }

  // Shield button
  const shieldBtn = document.getElementById('buyStreakShieldBtn');
  if (shieldBtn) {
    shieldBtn.addEventListener('click', buyStreakShield);
  }

  console.log('🐾 Avatar systém inicializovaný');
}

// Exporty pre globálne použitie
window.feedAvatar = feedAvatar;
window.canPlayDuel = canPlayDuel;
window.awardParagrafy = awardParagrafy;
window.deductEnergy = deductEnergy;
window.selectAvatar = selectAvatar;
window.initAvatarSystem = initAvatarSystem;
