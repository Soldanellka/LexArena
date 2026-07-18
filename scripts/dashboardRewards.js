'use strict';

/* ============================================================
   ODMENY OSOBNÉHO PREHĽADU PROGRESU – Fáza 3, bod 4 + MEDZIMEDAILY (2026-07-18)
   +1§ prvýkrát téma ≥30 %, +2§ prvýkrát ≥50 %, +5§ prvýkrát ≥80 %,
   +50§ oblasť na 100 % (VŠETKY jej témy). Medzimedaily (30/50 %) existujú
   proti "dlhému tichu" medzi 0 a 80 % – priebežná motivácia namiesto
   jedinej vzdialenej odmeny.

   ⚠️ CESTA B (2026-07-18) – oprava § pasce: VŠETKY idú cez econAward
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
   flag nezmaže). Každý prah má VLASTNÝ podstrom (tema30/, tema50/,
   tema/ – posledný beze zmeny, pôvodný názov pre 80 % zámerne nemenený,
   aby sa nesplietol/neduplikoval s už udelenými flagmi z produkcie).

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

/* Jeden míľnik: over → udeľ (skipCap) → flag AŽ PO úspechu. Zdieľané všetkými
   prahmi nižšie, aby sa vzor isClaimed→econAward→markClaimed neopakoval
   4-krát s rizikom, že sa niektorá kópia časom rozíde od ostatných. */
async function maybeAwardMilestone(nick, path, amount, reason) {
  if (await isClaimed(nick, path)) return;
  const result = await econAward(nick, amount, reason, { skipCap: true });
  if (result !== null) await markClaimed(nick, path);
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

        const base = `${area.appId}/${sub.subArea}/${okruh.key}`;
        const title = okruh.title || okruh.key;

        if (okruh.percent >= 30) {
          await maybeAwardMilestone(nick, `tema30/${base}`, ECONOMY_CONFIG.DASHBOARD.TEMA_30, `téma "${title}" dosiahla ≥30 %`);
        }
        if (okruh.percent >= 50) {
          await maybeAwardMilestone(nick, `tema50/${base}`, ECONOMY_CONFIG.DASHBOARD.TEMA_50, `téma "${title}" dosiahla ≥50 %`);
        }
        if (okruh.percent >= 80) {
          await maybeAwardMilestone(nick, `tema/${base}`, ECONOMY_CONFIG.DASHBOARD.TEMA_80, `téma "${title}" dosiahla ≥80 %`);
        }
      }
    }

    if (allTemy100) {
      await maybeAwardMilestone(nick, `oblast/${area.appId}`, ECONOMY_CONFIG.DASHBOARD.OBLAST_100, `oblasť ${area.title} na 100 %`);
    }
  }
}
