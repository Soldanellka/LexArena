'use strict';

/* ============================================================
   SENÁTY – skupinová súťaž (skupina = Senát, zakladateľ = Predseda).
   Veľkosť 3–5 členov, súťažný (môže viesť senátne spory) od 3.
   Hráč môže byť členom max 2 senátov.

   Firebase model:
   senaty/{senatId}: { name, founder, members: {nick:{joinedAt,role}},
     status:'forming'|'active', createdAt, wins, draws, losses, points }
   users/{nick}/senaty: { senatId: true }
   senatInvites/{senatId}: { code }
============================================================ */

import { ref, get, set, update, push, runTransaction }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

import { econAward } from './economy.js';
import { ECONOMY_CONFIG } from './economyConfig.js';
import { showRewardToast } from '../ui.js';

function getDb() { return window.db || null; }
function getNick() { return localStorage.getItem('playerNick') || null; }

const MAX_MEMBERS = 5;
const MIN_ACTIVE = 3;
const MAX_SENATY_PER_PLAYER = 2;

/* ============================================================
   Pomocné čítanie
============================================================ */
export async function getSenat(senatId) {
  const db = getDb();
  if (!db || !senatId) return null;
  const snap = await get(ref(db, `senaty/${senatId}`));
  return snap.exists() ? { id: senatId, ...snap.val() } : null;
}

export async function getMojeSenaty(nick) {
  const db = getDb();
  if (!db || !nick) return [];
  const idsSnap = await get(ref(db, `users/${nick}/senaty`));
  if (!idsSnap.exists()) return [];
  const ids = Object.keys(idsSnap.val() || {});
  const senaty = await Promise.all(ids.map(id => getSenat(id)));
  return senaty.filter(Boolean);
}

function memberCount(senat) {
  return senat && senat.members ? Object.keys(senat.members).length : 0;
}

function isPredseda(senat, nick) {
  return !!(senat && senat.members && senat.members[nick] && senat.members[nick].role === 'predseda');
}

/* ============================================================
   ZALOŽENIE SENÁTU
============================================================ */
function generateInviteCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function createSenat(name) {
  const db = getDb();
  const nick = getNick();
  if (!db || !nick) return { ok: false, message: 'Musíš byť prihlásený.' };

  const trimmed = (name || '').trim();
  if (trimmed.length < 3 || trimmed.length > 30) {
    return { ok: false, message: 'Názov senátu musí mať 3–30 znakov.' };
  }

  const mySenaty = await getMojeSenaty(nick);
  if (mySenaty.length >= MAX_SENATY_PER_PLAYER) {
    return { ok: false, message: `Môžeš byť členom max ${MAX_SENATY_PER_PLAYER} senátov.` };
  }

  // Kontrola unikátnosti názvu (case-insensitive)
  const allSnap = await get(ref(db, 'senaty'));
  const all = allSnap.exists() ? allSnap.val() : {};
  const nameTaken = Object.values(all).some(s => (s.name || '').toLowerCase() === trimmed.toLowerCase());
  if (nameTaken) {
    return { ok: false, message: 'Senát s týmto názvom už existuje.' };
  }

  const senatRef = push(ref(db, 'senaty'));
  const senatId = senatRef.key;
  const now = Date.now();

  await set(senatRef, {
    name: trimmed,
    founder: nick,
    members: { [nick]: { joinedAt: now, role: 'predseda' } },
    status: 'forming',
    createdAt: now,
    wins: 0, draws: 0, losses: 0, points: 0
  });

  await set(ref(db, `users/${nick}/senaty/${senatId}`), true);
  await set(ref(db, `senatInvites/${senatId}`), { code: generateInviteCode(), createdAt: now });

  return { ok: true, senatId, name: trimmed };
}

/* ============================================================
   POZVÁNKY
============================================================ */
export function getInviteLink(senatId) {
  return `https://www.lexarena.sk/?senat=${senatId}`;
}

export function buildInviteMessage(predsedaNick, senatName, senatId) {
  const link = getInviteLink(senatId);
  return `⚖️ ${predsedaNick} ťa pozýva do senátu ${senatName} v LexAréne! Pridaj sa: ${link}`;
}

/* ============================================================
   PRIPOJENIE K SENÁTU
   Členstvo sa zapisuje transakčne (result.committed rozhoduje, nie
   vlajka nastavená vnútri callbacku – vzor ako economy.js settlePeriod),
   aby dvaja hráči nemohli súčasne obsadiť posledné voľné miesto.
============================================================ */
export async function joinSenat(senatId, nick) {
  const db = getDb();
  if (!db || !senatId || !nick) return { ok: false, message: 'Chýba senát alebo nick.' };

  const senat = await getSenat(senatId);
  if (!senat) return { ok: false, message: 'Senát neexistuje.' };
  if (senat.members && senat.members[nick]) return { ok: false, message: 'V tomto senáte už si.' };
  if (memberCount(senat) >= MAX_MEMBERS) return { ok: false, message: 'Senát je už plný (5/5).' };

  const mySenaty = await getMojeSenaty(nick);
  if (mySenaty.length >= MAX_SENATY_PER_PLAYER) {
    return { ok: false, message: `Môžeš byť členom max ${MAX_SENATY_PER_PLAYER} senátov.` };
  }

  // Nový hráč? (skontroluj PRED akýmkoľvek zápisom)
  const userSnap = await get(ref(db, `users/${nick}`));
  const isNewPlayer = !userSnap.exists();

  const membersRef = ref(db, `senaty/${senatId}/members`);
  const now = Date.now();
  const result = await runTransaction(membersRef, (current) => {
    const members = current || {};
    if (members[nick]) return; // abort – už je členom (konkurenčný beh)
    if (Object.keys(members).length >= MAX_MEMBERS) return; // abort – plný
    return { ...members, [nick]: { joinedAt: now, role: 'clen' } };
  });

  if (!result || !result.committed) {
    return { ok: false, message: 'Nepodarilo sa pridať do senátu (plný alebo už si členom).' };
  }

  await set(ref(db, `users/${nick}/senaty/${senatId}`), true);

  // Odmena novému hráčovi (jednorazovo, mimo denného stropu)
  if (isNewPlayer) {
    await econAward(nick, ECONOMY_CONFIG.SENATY.JOIN_NEW_PLAYER, `nový hráč cez senátny link ${senatId}`, { skipCap: true });
  }

  // Odmena predsedovi za nábor tohto člena (raz na člena, ochrana cez recruitClaimed)
  const founder = senat.founder;
  if (founder && founder !== nick) {
    const claimedRef = ref(db, `senaty/${senatId}/recruitClaimed/${nick}`);
    const claimResult = await runTransaction(claimedRef, (current) => {
      if (current === true) return; // abort – už vyplatené
      return true;
    });
    if (claimResult && claimResult.committed) {
      await econAward(founder, ECONOMY_CONFIG.SENATY.RECRUIT, `nábor člena ${nick} do senátu`, { skipCap: true });
    }
  }

  // Aktivácia senátu pri dosiahnutí 3 členov (transakčne raz)
  const newCount = memberCount({ members: (await get(membersRef)).val() });
  if (newCount >= MIN_ACTIVE) {
    const statusRef = ref(db, `senaty/${senatId}/status`);
    const statusResult = await runTransaction(statusRef, (current) => {
      if (current === 'active') return; // abort – už aktivovaný
      return 'active';
    });
    if (statusResult && statusResult.committed) {
      if (founder) {
        await econAward(founder, ECONOMY_CONFIG.SENATY.FOUND_COMPLETE, `senát ${senat.name} dokončený (3 členovia)`, { skipCap: true });
      }
      if (nick === getNick()) {
        showRewardToast(`⚖️ Senát ${senat.name} je kompletný!`);
      }
    }
  }

  return { ok: true, senatName: senat.name, isNewPlayer };
}

/* ============================================================
   SPRÁVA SENÁTU (predseda)
============================================================ */
export async function renameSenat(senatId, newName, nick) {
  const db = getDb();
  const senat = await getSenat(senatId);
  if (!senat) return { ok: false, message: 'Senát neexistuje.' };
  if (!isPredseda(senat, nick)) return { ok: false, message: 'Len predseda môže premenovať senát.' };

  const trimmed = (newName || '').trim();
  if (trimmed.length < 3 || trimmed.length > 30) {
    return { ok: false, message: 'Názov senátu musí mať 3–30 znakov.' };
  }

  await update(ref(db, `senaty/${senatId}`), { name: trimmed });
  return { ok: true };
}

export async function kickMember(senatId, targetNick, byNick) {
  const db = getDb();
  const senat = await getSenat(senatId);
  if (!senat) return { ok: false, message: 'Senát neexistuje.' };
  if (!isPredseda(senat, byNick)) return { ok: false, message: 'Len predseda môže vyhodiť člena.' };
  if (targetNick === byNick) return { ok: false, message: 'Nemôžeš vyhodiť sám seba – zruš senát alebo ho premenuj na iného predsedu.' };
  if (!senat.members || !senat.members[targetNick]) return { ok: false, message: 'Hráč nie je členom tohto senátu.' };

  await update(ref(db, `senaty/${senatId}/members`), { [targetNick]: null });
  await update(ref(db, `users/${targetNick}/senaty`), { [senatId]: null });

  const remaining = memberCount(senat) - 1;
  if (remaining < MIN_ACTIVE) {
    await update(ref(db, `senaty/${senatId}`), { status: 'forming' });
  }

  return { ok: true };
}

export async function leaveSenat(senatId, nick) {
  const db = getDb();
  const senat = await getSenat(senatId);
  if (!senat) return { ok: false, message: 'Senát neexistuje.' };
  if (isPredseda(senat, nick)) {
    return { ok: false, message: 'Predseda nemôže odísť – zruš senát alebo najprv premenuj iného člena na predsedu.' };
  }

  await update(ref(db, `senaty/${senatId}/members`), { [nick]: null });
  await update(ref(db, `users/${nick}/senaty`), { [senatId]: null });

  const remaining = memberCount(senat) - 1;
  if (remaining < MIN_ACTIVE) {
    await update(ref(db, `senaty/${senatId}`), { status: 'forming' });
  }

  return { ok: true };
}

export async function disbandSenat(senatId, nick) {
  const db = getDb();
  const senat = await getSenat(senatId);
  if (!senat) return { ok: false, message: 'Senát neexistuje.' };
  if (!isPredseda(senat, nick)) return { ok: false, message: 'Len predseda môže zrušiť senát.' };

  const members = Object.keys(senat.members || {});
  await Promise.all(members.map(m => update(ref(db, `users/${m}/senaty`), { [senatId]: null })));
  await set(ref(db, `senaty/${senatId}`), null);
  await set(ref(db, `senatInvites/${senatId}`), null);

  return { ok: true };
}

window.getMojeSenaty = getMojeSenaty;
window.createSenat = createSenat;
window.joinSenat = joinSenat;
