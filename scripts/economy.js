/* ============================================
   LEXARENA – ECONOMY ENGINE (§ + AVATAR)
   - paragrafy
   - avatar energia
   - denné bonusy
   - odmeny za duely a rebríček
============================================ */

/* ---------- KONŠTANTY ---------- */

const ECONOMY_CONFIG = {
  duelWin: 8,
  duelLose: 2,
  acceptChallenge: 3,
  dailyLogin: 2,

  avatarWake: 20,
  avatarFeed: 10,
  avatarSuperMood: 30,

  weeklyRewards: {
    1: 50,
    2: 30,
    3: 20
  },
  monthlyRewards: {
    1: 150,
    2: 100,
    3: 70
  },

  avatarMaxEnergy: 3
};

/* ---------- STORAGE HELPERS ---------- */

function getNumber(key, fallback = 0) {
  return parseInt(localStorage.getItem(key) || fallback.toString(), 10);
}

function setNumber(key, value) {
  localStorage.setItem(key, value.toString());
}

/* ============================================
   1️⃣ PARAGRAFY – ZÁKLADNÉ OPERÁCIE
============================================ */

export function getParagrafy() {
  return getNumber("paragrafy", 0);
}

export function addParagrafy(amount, reason = "") {
  let current = getParagrafy();
  current += amount;
  setNumber("paragrafy", current);
  updateParagrafyUI();
  console.log(`+${amount} § (${reason}) → spolu: ${current}`);
}

export function spendParagrafy(amount, reason = "") {
  let current = getParagrafy();
  if (current < amount) {
    console.log(`Nedostatok § na: ${reason}`);
    return false;
  }
  current -= amount;
  setNumber("paragrafy", current);
  updateParagrafyUI();
  console.log(`-${amount} § (${reason}) → spolu: ${current}`);
  return true;
}

/* Aktualizácia UI – môžeš mať kdekoľvek span#paragrafyCount */
export function updateParagrafyUI() {
  const el = document.getElementById("paragrafyCount");
  if (el) el.textContent = getParagrafy();
}

/* ============================================
   2️⃣ AVATAR – ENERGIA, SPÁNOK, KŔMENIE
============================================ */

export function getAvatarEnergy() {
  let energy = getNumber("avatarEnergy", ECONOMY_CONFIG.avatarMaxEnergy);
  if (energy > ECONOMY_CONFIG.avatarMaxEnergy) {
    energy = ECONOMY_CONFIG.avatarMaxEnergy;
    setNumber("avatarEnergy", energy);
  }
  return energy;
}

export function setAvatarEnergy(value) {
  const v = Math.max(0, Math.min(ECONOMY_CONFIG.avatarMaxEnergy, value));
  setNumber("avatarEnergy", v);
  updateAvatarUI();
}

export function isAvatarSleeping() {
  return localStorage.getItem("avatarSleeping") === "1";
}

export function setAvatarSleeping(sleeping) {
  localStorage.setItem("avatarSleeping", sleeping ? "1" : "0");
  updateAvatarUI();
}

/* Zavolaj PRED štartom duelu – vráti true/false, či môže hrať */
export function canPlayDuel() {
  if (isAvatarSleeping()) return false;
  return getAvatarEnergy() > 0;
}

/* Zavolaj PO každom odohratom dueli */
export function consumeAvatarEnergy() {
  let energy = getAvatarEnergy();
  energy -= 1;
  setAvatarEnergy(energy);
  if (energy <= 0) {
    setAvatarSleeping(true);
  }
}

/* Prebudenie avatara za § */
export function wakeAvatar() {
  if (!isAvatarSleeping() && getAvatarEnergy() > 0) return true;

  const ok = spendParagrafy(ECONOMY_CONFIG.avatarWake, "Prebudenie avatara");
  if (!ok) return false;

  setAvatarEnergy(ECONOMY_CONFIG.avatarMaxEnergy);
  setAvatarSleeping(false);
  return true;
}

/* Kŕmenie avatara – len kozmetika / mood */
export function feedAvatar() {
  const ok = spendParagrafy(ECONOMY_CONFIG.avatarFeed, "Kŕmenie avatara");
  if (!ok) return false;
  // tu môžeš spustiť animáciu, zmenu stavu, atď.
  console.log("Avatar nakŕmený.");
  return true;
}

/* Super mood – drahší efekt */
export function superMoodAvatar() {
  const ok = spendParagrafy(ECONOMY_CONFIG.avatarSuperMood, "Super mood avatara");
  if (!ok) return false;
  console.log("Avatar v super moode.");
  return true;
}

/* Aktualizácia UI avatara – voliteľné */
export function updateAvatarUI() {
  const energyEl = document.getElementById("avatarEnergy");
  const stateEl = document.getElementById("avatarState");

  if (energyEl) energyEl.textContent = getAvatarEnergy();
  if (stateEl) {
    stateEl.textContent = isAvatarSleeping() ? "Spí" : "Aktívny";
  }
}

/* ============================================
   3️⃣ DENNÝ LOGIN BONUS
============================================ */

export function applyDailyLoginBonus() {
  const today = new Date();
  const key = "lastLoginDay";
  const last = localStorage.getItem(key);

  const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD

  if (last === todayStr) {
    return; // už bol bonus pridelený
  }

  localStorage.setItem(key, todayStr);
  addParagrafy(ECONOMY_CONFIG.dailyLogin, "Denný login bonus");
}

/* ============================================
   4️⃣ ODMEŇOVANIE ZA DUELY
============================================ */

export function rewardDuelResult(isWin) {
  if (isWin) {
    addParagrafy(ECONOMY_CONFIG.duelWin, "Výhra v dueli");
  } else {
    addParagrafy(ECONOMY_CONFIG.duelLose, "Účasť v dueli");
  }
}

/* Zavolaj po prijatí výzvy z banky duelov */
export function rewardAcceptChallenge() {
  addParagrafy(ECONOMY_CONFIG.acceptChallenge, "Prijatie výzvy");
}

/* ============================================
   5️⃣ ODMEŇOVANIE REBRÍČKA
============================================ */

export function rewardLeaderboardWinners(type = "monthly", winners = []) {
  // winners = [ "Babu", "Lulu", "Niekto" ]
  const rewards =
    type === "weekly"
      ? ECONOMY_CONFIG.weeklyRewards
      : ECONOMY_CONFIG.monthlyRewards;

  winners.forEach((name, index) => {
    const place = index + 1;
    const amount = rewards[place];
    if (!amount) return;

    // Tu môžeš mať per-user ekonomiku, zatiaľ len log:
    console.log(`Odmena pre ${name}: ${amount} § za ${place}. miesto (${type})`);
    // Ak budeš mať multi-user, tu sa to rozdelí podľa hráča.
  });
}

/* ============================================
   6️⃣ AUTO-INIT PO NAČÍTANÍ
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyDailyLoginBonus();
  updateParagrafyUI();
  updateAvatarUI();
});

/* ============================================
   7️⃣ SPRÍSTUPNENIE DO window (ak chceš volať z HTML)
============================================ */

window.getParagrafy = getParagrafy;
window.addParagrafy = addParagrafy;
window.spendParagrafy = spendParagrafy;

window.getAvatarEnergy = getAvatarEnergy;
window.wakeAvatar = wakeAvatar;
window.feedAvatar = feedAvatar;
window.superMoodAvatar = superMoodAvatar;
window.canPlayDuel = canPlayDuel;
window.consumeAvatarEnergy = consumeAvatarEnergy;

window.rewardDuelResult = rewardDuelResult;
window.rewardAcceptChallenge = rewardAcceptChallenge;
