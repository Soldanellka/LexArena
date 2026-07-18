'use strict';

/* ============================================================
   ODMENY OSOBNÉHO PREHĽADU PROGRESU – Fáza 3, bod 4
   +5§ jednorazovo za tému (okruh), ktorá prvýkrát dosiahne ≥80 %.
   +50§ jednorazovo za oblasť, kde sú VŠETKY témy na 100 %.

   ⚠️ CESTA B (2026-07-18) – oprava § pasce: obe idú cez econAward
   S { skipCap: true }. Sú to jednorazové nefarmovateľné míľniky (flag
   nižšie zaručuje jednorazovosť) presne ako streak/rebríčky/videá, nie
   opakovateľná grindovateľná aktivita, proti ktorej denný strop
   LIMITS.DAILY_EARN_CAP existuje – preto sa doň (rovnako ako streak/
   rebríčky) nepočítajú. econAward pri skipCap:true vôbec nevolá
   applyDailyCap, takže dashboard § sa NEPRIPOČÍTAVAJÚ do
   users/{nick}/dailyEarned/{deň} a nijako neuberajú z toho, čo môže
   hráč zarobiť bežnou hrou (duel/kartičky/prípady/štátnica – tie
   naďalej idú BEZ skipCap, teda v strope).

   Jednorazovosť: users/{nick}/dashboardRewards/... flag – nedá sa
   získať opakovane ani po resete/zopakovaní aktivity (reset/zhoršenie
   flag nezmaže).

   ⚠️ OBRANNÁ POISTKA nezávislá od skipCap: flag sa zapíše AŽ PO tom,
   čo econAward reálne uspeje (vráti nie-null) – nie vopred. Ak by
   econAward zlyhal z akéhokoľvek iného dôvodu (napr. výpadok zápisu),
   flag ostane nezapísaný a odmena sa skúsi znova pri ďalšom otvorení
   dashboardu namiesto toho, aby sa navždy stratila pri zapísanom, ale
   nevyplatenom flagu.

   NEDOTÝKA SA duels/, leaderboard/, groups/, assignments/, contentOverrides.
============================================================ */
import { ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { econAward } from './economy.js';
import { ECONOMY_CONFIG } from './economyConfig.js';

function getDb() { return window.db || null; }

async function isClaimed(nick, path) {
  const db = getDb();
  if (!db) return true; // bez DB radšej nič neudeľuj, než riskovať duplicitu neskôr
  const snap = await get(ref(db, `users/${nick}/dashboardRewards/${path}`));
  return snap.exists();
}

async function markClaimed(nick, path) {
  const db = getDb();
  if (!db) return;
  await set(ref(db, `users/${nick}/dashboardRewards/${path}`), true);
}

/*
  dashboard: výstup computeFullDashboard(nick) zo scripts/dashboardStats.js.
  Prejde všetky témy/oblasti a udelí nové odmeny (ak nejaké pribudli od
  posledného prepočtu). Bezpečné volať opakovane – flag sa zapíše len po
  úspešnom econAward, takže druhýkrát sa nič nepripíše navyše.
*/
export async function checkAndAwardDashboardRewards(nick, dashboard) {
  if (!nick || !Array.isArray(dashboard)) return;

  for (const area of dashboard) {
    let allTemy100 = area.subAreas.some(s => s.okruhy.length); // musí existovať aspoň 1 téma
    for (const sub of area.subAreas) {
      for (const okruh of sub.okruhy) {
        if (okruh.percent < 100) allTemy100 = false;

        if (okruh.percent >= 80) {
          const path = `tema/${area.appId}/${sub.subArea}/${okruh.key}`;
          if (!(await isClaimed(nick, path))) {
            const result = await econAward(
              nick, ECONOMY_CONFIG.DASHBOARD.TEMA_80, `téma ${okruh.key} dosiahla ≥80 %`,
              { skipCap: true }
            );
            if (result !== null) await markClaimed(nick, path);
          }
        }
      }
    }

    if (allTemy100) {
      const path = `oblast/${area.appId}`;
      if (!(await isClaimed(nick, path))) {
        const result = await econAward(
          nick, ECONOMY_CONFIG.DASHBOARD.OBLAST_100, `oblasť ${area.title} na 100 %`,
          { skipCap: true }
        );
        if (result !== null) await markClaimed(nick, path);
      }
    }
  }
}
