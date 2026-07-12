'use strict';

/* ============================================================
   LEXARENA – EKONOMICKÁ KONFIGURÁCIA
   Jediný zdroj pravdy pre všetky čísla ekonomiky (§ + energia).
   Žiaden modul nesmie mať vlastné hardcodované ceny/odmeny –
   všetko sa číta odtiaľto (cez economy.js, prípadne priamo tu
   pre avatar.js – pozri poznámku nižšie).

   Prečo samostatný súbor a nie priamo v economy.js:
   economy.js interne importuje funkcie z avatar.js (aby UI
   ostalo synchronizované), a avatar.js zároveň potrebuje túto
   konfiguráciu (FEED_COST, STREAK, ...). Keby ECONOMY_CONFIG
   žil v economy.js, vznikol by cyklický import
   avatar.js ↔ economy.js. Tento súbor je list v strome importov
   (nič neimportuje z avatar.js/economy.js), takže cyklus nehrozí.
   economy.js re-exportuje ECONOMY_CONFIG, takže zvyšok appky
   naďalej importuje všetko len z economy.js.

   ⚠️ SÍDLO PRAVDY, ALE NIE JEDINÉ MIESTO S TÝMITO ČÍSLAMI:
   Návod „Ako funguje LexArena" (index.html, #guideModal) uvádza tieto
   isté odmeny/náklady hráčom doslovne v texte (tabuľky pri dueli,
   kartičkách, bifľovačke, energii, streaku, rebríčkoch, pečatiach aj
   § navyše). Ak tu zmeníš čísla, over/uprav aj text v #guideModal,
   inak sa návod rozíde so skutočným správaním appky.
============================================================ */

import { ref, get, push }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export const ECONOMY_CONFIG = {
  // ENERGIA (náklady v % z max 100)
  ENERGY: {
    DUEL: -5,              // odohratý duel – výzva aj prijatie
    BIFLOVACKA_CARD: -1,   // za kartičku (pôvodne −2; učenie je jadro appky, netrestať –
                           //  50 kartičiek = polovica energie, nie celá)
    MEMORY_SET: -2,        // za dohranú sadu pexesa
    CASES_SET: -4,         // za dohranú sadu prípadov
    FEED_COST: 12,         // § za nakŕmenie
    FEED_TO: 100           // kŕmenie doplní na 100 %
  },

  // ODMENY §
  REWARDS: {
    DUEL_WIN: 7,
    DUEL_DRAW: 3,
    DUEL_LOSS: 0,          // pôvodne +1; pri +1 je duel VŽDY ziskový (20 duelov na plnú
                           //  energiu = min. +20§ vs. kŕmenie 12§) a § stráca hodnotu
    BIFLOVACKA_OKRUH: 2,   // NOVÉ: za dokončený okruh so skóre ≥ 80 % – priebežná motivácia
    BIFLOVACKA_AREA: 10,   // 100 % celej oblasti (pôvodný návrh zachovaný)
    MEMORY_PERFECT: 5,     // sada bez chyby
    CASES_SET: 5,          // dokončená sada
    CASES_PERFECT: 10,     // sada na 100 %
    CHALLENGE_NEW: 7,      // prijatie duel-linku novým nickom (zjednotiť s existujúcou logikou)
    CHALLENGE_EXISTING: 1,
    VIDEO: 12              // odmena za náukové video – JEDNORAZOVO na video a nick
    // TODO (Audit otázok): až sa rozhodne odmeňovať § za schválené nahlásenia,
    // pridaj REWARDS.REPORT_APPROVED sem a zavolaj econAward(reporterNick,
    // REWARDS.REPORT_APPROVED, 'za schválené nahlásenie') z openVerdictModal()
    // v index.html (vetva decision === 'approved', vedľa awardSeal logiky).
    // Zatiaľ zámerne bez odmeny – rieši sa samostatným zadaním.
  },

  // STREAK – krivka so stropom (pôvodne 1–50§ lineárne; 50§/deň = 1500§/mesiac zadarmo
  //  → inflácia, balíky by nemali zmysel. Krivka so stropom drží hodnotu §.)
  STREAK: {
    BASE: [1, 2, 3, 4, 5, 6, 7],   // deň 1–7
    AFTER: 7,                      // deň 8+ = 7§/deň
    MILESTONES: { 7: 10, 30: 50 }  // bonus navyše v míľnikový deň
  },

  // REBRÍČKY
  LEADERBOARD: {
    WEEKLY:  [50, 30, 10],    // 1., 2., 3. miesto; vyhodnotiť po nedeli 24:00
    MONTHLY: [200, 100, 50]   // po poslednom dni mesiaca 24:00
  },

  // ROLE
  ROLES: {
    ADMIN_UNLIMITED: true,
    GARANT_DAILY_GRANT: 50    // koľko § môže garant rozdať denne
  },

  // ANTI-ABUSE
  LIMITS: {
    DAILY_EARN_CAP: 60        // max § z aktivít/deň; NEPOČÍTA sa: streak, rebríčky, videá
  },

  // SINKY – aby mal hráč na čo míňať (hodnota § rastie s možnosťami minúť)
  SINKS: {
    QUIZ_HINT_5050: 3,        // nápoveda 50:50 v duelovom kvíze
    STREAK_SHIELD: 5,         // existuje v avatar.js – zjednotiť sem
    PRESTIGE_AVATAR_MIN: 300, // cenové pásmo prestige avatarov (300–500§), viď Sinky
    BIFLOVACKA_JOKER_SKELETON: 3, // žolík: kostra – každé 3. slovo definície viditeľné
    BIFLOVACKA_JOKER_INITIALS: 2, // žolík: iniciály – prvé písmeno každého slova
    BIFLOVACKA_JOKER_REPLAY: 1,   // žolík: vypočuť definíciu znova cez TTS (v odpovedacej fáze)
    BIFLOVACKA_VIDEO_REPLAY: 2    // "Pozrieť znova" vo video režime (prvé pozretie ostáva zadarmo)
  },

  // SENÁTY – skupinová súťaž (skipCap: true pri econAward, sú to udalosti, nie grind)
  SENATY: {
    FOUND_COMPLETE: 10,   // predsedovi, keď senát dosiahne 3 členov
    RECRUIT: 5,           // pozývateľovi za každého člena po dokončení senátu (raz na člena)
    JOIN_NEW_PLAYER: 7,   // úplne nový nick, čo sa pridá cez senátny pozývací link
    SPOR_WIN: 15,         // každému členovi víťazného senátu v senátnom spore
    SPOR_DRAW: 6,         // každému členovi pri remíze
    SPOR_LOSS: 2,         // každému členovi prehrávajúceho senátu (útecha, nie 0)
    LB_WEEKLY: [40, 25, 10],   // každému členovi senátu na 1./2./3. mieste týždenného rebríčka
    LB_MONTHLY: [150, 80, 40] // rovnako, mesačný rebríček
  },

  // FAKULTY – tretia úroveň súťaže (skipCap: true pri econAward, mesačná udalosť)
  FACULTIES: {
    MONTHLY_BONUS: 20 // každému aktívnemu hráčovi víťaznej fakulty na konci mesiaca
  },

  // ŠTÁTNICOVÁ SIEŇ – prototyp (skipCap: true pri odmene, je to výkon, nie grind)
  STATNICE: {
    EXAM_COST: 15,                          // econSpend pred štartom (admin zadarmo – rieši econSpend)
    EXAM_REWARD: { 1: 25, 2: 15, 3: 8, 4: 0 } // podľa známky zo záverečnej spätnej väzby
  },

  // MONETIZÁCIA – pripraviť, NEZOBRAZOVAŤ v UI
  PACKS: {
    small:  { sg: 100, eur: 1.99 },
    medium: { sg: 300, eur: 4.99 },
    big:    { sg: 800, eur: 9.99 }
  },
  ADS: {
    ENABLED: true,            // "Získaj §" – zatiaľ placeholder videami, nie skutočným SDK
    REWARD: 3,                // § za pozretie odmeňovanej reklamy (rewarded ad)
    DAILY_MAX: 3              // max reklám denne (t. j. max +9§/deň z reklám)
  }
};

/* ============================================================
   ROLA HRÁČA – vždy zo skutočného Firebase záznamu
   (nie z lokálneho "view" prepínača v localStorage, ten slúži
   len na náhľad UI iných rolí a dal by sa zneužiť na obídenie
   ekonomiky).
============================================================ */
export async function getRole(nick) {
  const db = window.db;
  if (!db || !nick) return 'student';
  try {
    const snap = await get(ref(db, `users/${nick}/role`));
    return snap.exists() ? snap.val() : 'student';
  } catch (e) {
    console.warn('economyConfig: čítanie role zlyhalo', e);
    return 'student';
  }
}

/* ============================================================
   TRANSAKČNÝ LOG – audit aj podklad pre budúcu monetizáciu.
   users/{nick}/transactions (push): { ts, type, amount, reason, balanceAfter }
============================================================ */
export async function logTransaction(nick, entry) {
  const db = window.db;
  if (!db || !nick) return;
  try {
    await push(ref(db, `users/${nick}/transactions`), { ts: Date.now(), ...entry });
  } catch (e) {
    console.warn('economyConfig: zápis transakcie zlyhal', e);
  }
}
