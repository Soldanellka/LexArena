'use strict';

import { ref, get, update, onValue }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { showRewardToast } from '../ui.js';
import { ECONOMY_CONFIG, getRole, logTransaction } from './economyConfig.js';

/* ============================================================
   KONFIGURÁCIA AVATARA
   FEED_COST, FEED_ENERGY a STREAK_SHIELD_COST sa čítajú z
   ECONOMY_CONFIG (scripts/economyConfig.js) – jediný zdroj pravdy.
============================================================ */

const AVATAR_CONFIG = {
  // Energia
  MAX_ENERGY: 100,
  FEED_COST: ECONOMY_CONFIG.ENERGY.FEED_COST,     // kŕmenie stojí 12§
  FEED_ENERGY: ECONOMY_CONFIG.ENERGY.FEED_TO,     // kŕmenie doplní na 100%
  SLEEP_THRESHOLD: 0,        // pri 0 avatar zaspí

  // Denný login streak – krivka viď ECONOMY_CONFIG.STREAK v checkDailyLogin()
  STREAK_SHIELD_COST: ECONOMY_CONFIG.SINKS.STREAK_SHIELD,     // štít streaku stojí 5§

  // Dostupné avatary (id: { name, file_awake, file_sleep, unlockCondition })
  AVATARS: {
    'student-f': {
      name: 'Študentka práva',
      awake: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20150%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27sk%27%20cx=%2745%25%27%20cy=%2735%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23fde8d0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23f0b88a%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27hr%27%20cx=%2750%25%27%20cy=%2710%25%27%20r=%2775%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%237a4a20%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%233a1a05%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27ir%27%20cx=%2735%25%27%20cy=%2730%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23c87830%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%236a3010%27%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id=%27su%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%2710%25%27%20y2=%27100%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%231a1a2e%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%230d0d18%27%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27118%27%20rx=%2732%27%20ry=%2730%27%20fill=%27url%28%23su%29%27%2F%3E%0A%3Cpath%20d=%27M48%2092%20Q60%20100%2072%2092%20L70%20102%20Q60%20107%2050%20102Z%27%20fill=%27%230d0d20%27%2F%3E%0A%3Cpath%20d=%27M53%2092%20Q60%2098%2067%2092%20L66%20100%20Q60%20104%2054%20100Z%27%20fill=%27%23f0f0ff%27%2F%3E%0A%3Cellipse%20cx=%2757%27%20cy=%2793%27%20rx=%274%27%20ry=%272.5%27%20fill=%27%23cc2244%27%2F%3E%0A%3Cellipse%20cx=%2763%27%20cy=%2793%27%20rx=%274%27%20ry=%272.5%27%20fill=%27%23cc2244%27%2F%3E%0A%3Ccircle%20cx=%2760%27%20cy=%2795%27%20r=%272%27%20fill=%27%23991133%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2758%27%20rx=%2736%27%20ry=%2732%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M24%2065%20Q18%2088%2022%20108%20Q28%20104%2030%2092%20Q27%2076%2028%2065Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M96%2065%20Q102%2088%2098%20108%20Q92%20104%2090%2092%20Q93%2076%2092%2065Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2738%27%20rx=%2734%27%20ry=%2718%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M26%2060%20Q34%2038%2060%2035%20Q86%2038%2094%2060%20Q82%2052%2072%2050%20Q66%2038%2060%2040%20Q54%2038%2048%2050%20Q38%2052%2026%2060Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2762%27%20rx=%2731%27%20ry=%2733%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2729%27%20cy=%2764%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%3Cellipse%20cx=%2729%27%20cy=%2764%27%20rx=%274%27%20ry=%275%27%20fill=%27%23f0c090%27%2F%3E%0A%3Cellipse%20cx=%2791%27%20cy=%2764%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%3Cellipse%20cx=%2791%27%20cy=%2764%27%20rx=%274%27%20ry=%275%27%20fill=%27%23f0c090%27%2F%3E%0A%3Ccircle%20cx=%2729%27%20cy=%2771%27%20r=%272.5%27%20fill=%27%23d4af37%27%2F%3E%3Ccircle%20cx=%2791%27%20cy=%2771%27%20r=%272.5%27%20fill=%27%23d4af37%27%2F%3E%0A%3Cellipse%20cx=%2747%27%20cy=%2762%27%20rx=%2710%27%20ry=%2711%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2747%27%20cy=%2763%27%20rx=%277%27%20ry=%278%27%20fill=%27url%28%23ir%29%27%2F%3E%0A%3Cellipse%20cx=%2747%27%20cy=%2764%27%20rx=%274%27%20ry=%275%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2750%27%20cy=%2759%27%20r=%273%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2744%27%20cy=%2767%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.6%27%2F%3E%0A%3Cellipse%20cx=%2773%27%20cy=%2762%27%20rx=%2710%27%20ry=%2711%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2773%27%20cy=%2763%27%20rx=%277%27%20ry=%278%27%20fill=%27url%28%23ir%29%27%2F%3E%0A%3Cellipse%20cx=%2773%27%20cy=%2764%27%20rx=%274%27%20ry=%275%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2759%27%20r=%273%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2770%27%20cy=%2767%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.6%27%2F%3E%0A%3Cpath%20d=%27M37%2050%20Q47%2044%2057%2050%27%20stroke=%27%233a1a05%27%20stroke-width=%272%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2050%20Q73%2044%2083%2050%27%20stroke=%27%233a1a05%27%20stroke-width=%272%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M37%2051%20Q47%2046%2055%2051%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M65%2051%20Q73%2046%2083%2051%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M54%2076%20Q60%2080%2066%2076%27%20stroke=%27%23d06050%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M55%2076%20Q60%2080%2065%2076%20Q60%2083%2055%2076Z%27%20fill=%27%23e08878%27%20opacity=%27.4%27%2F%3E%0A%3Cellipse%20cx=%2736%27%20cy=%2774%27%20rx=%2710%27%20ry=%277%27%20fill=%27%23ffb0b0%27%20opacity=%27.4%27%2F%3E%0A%3Cellipse%20cx=%2784%27%20cy=%2774%27%20rx=%2710%27%20ry=%277%27%20fill=%27%23ffb0b0%27%20opacity=%27.4%27%2F%3E%0A%3Cpath%20d=%27M55%2072%20Q60%2075%2065%2072%27%20stroke=%27%23d09060%27%20stroke-width=%271.2%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Ctext%20x=%2786%27%20y=%2750%27%20font-size=%2710%27%20fill=%27%23d4af37%27%20opacity=%27.8%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Crect%20x=%2728%27%20y=%27112%27%20width=%2726%27%20height=%2720%27%20rx=%273%27%20fill=%27%238B0000%27%2F%3E%0A%3Ctext%20x=%2741%27%20y=%27125%27%20text-anchor=%27middle%27%20font-family=%27serif%27%20font-size=%274%27%20fill=%27%23f0d080%27%20font-weight=%27bold%27%3ELAW%3C%2Ftext%3E%0A%3Ctext%20x=%2772%27%20y=%27130%27%20font-family=%27serif%27%20font-size=%2722%27%20fill=%27%23d4af37%27%20font-weight=%27bold%27%3E%C2%A7%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
      sleep: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20150%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27sk%27%20cx=%2745%25%27%20cy=%2735%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23fde0c5%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23e8a878%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27hr%27%20cx=%2750%25%27%20cy=%2710%25%27%20r=%2775%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%237a4a20%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%233a1a05%27%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id=%27su%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%2710%25%27%20y2=%27100%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%231a1a2e%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%230d0d18%27%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Cg%20transform=%27rotate%2810%2C60%2C110%29%27%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27118%27%20rx=%2732%27%20ry=%2728%27%20fill=%27url%28%23su%29%27%2F%3E%0A%3Cpath%20d=%27M48%2092%20Q60%20100%2072%2092%20L70%20102%20Q60%20107%2050%20102Z%27%20fill=%27%230d0d20%27%2F%3E%0A%3Cpath%20d=%27M53%2092%20Q60%2098%2067%2092%20L66%20100%20Q60%20104%2054%20100Z%27%20fill=%27%23f0f0ff%27%2F%3E%0A%3C%2Fg%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2758%27%20rx=%2736%27%20ry=%2732%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M24%2065%20Q18%2088%2022%20108%20Q28%20104%2030%2092%20Q27%2076%2028%2065Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M96%2065%20Q102%2088%2098%20108%20Q92%20104%2090%2092%20Q93%2076%2092%2065Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2738%27%20rx=%2734%27%20ry=%2718%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M26%2060%20Q34%2038%2060%2035%20Q86%2038%2094%2060%20Q82%2052%2072%2050%20Q66%2038%2060%2040%20Q54%2038%2048%2050%20Q38%2052%2026%2060Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cg%20transform=%27rotate%2814%2C60%2C62%29%27%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2762%27%20rx=%2731%27%20ry=%2733%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2729%27%20cy=%2764%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%3Cellipse%20cx=%2791%27%20cy=%2764%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Ccircle%20cx=%2729%27%20cy=%2771%27%20r=%272.5%27%20fill=%27%23b89020%27%2F%3E%3Ccircle%20cx=%2791%27%20cy=%2771%27%20r=%272.5%27%20fill=%27%23b89020%27%2F%3E%0A%3Cpath%20d=%27M37%2062%20Q47%2072%2057%2062%27%20stroke=%27%232a1a0a%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M37%2062%20Q40%2056%2044%2059%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M46%2057%20Q50%2052%2054%2057%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M56%2059%20Q59%2055%2062%2059%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2062%20Q73%2072%2083%2062%27%20stroke=%27%232a1a0a%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2062%20Q66%2056%2070%2059%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M72%2057%20Q76%2052%2080%2057%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M82%2059%20Q85%2055%2088%2059%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M37%2050%20Q47%2045%2057%2050%27%20stroke=%27%233a1a05%27%20stroke-width=%271.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2050%20Q73%2045%2083%2050%27%20stroke=%27%233a1a05%27%20stroke-width=%271.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2776%27%20rx=%279%27%20ry=%276%27%20fill=%27%23ffb0a0%27%20opacity=%27.5%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2776%27%20rx=%279%27%20ry=%276%27%20fill=%27%23ffb0a0%27%20opacity=%27.5%27%2F%3E%0A%3Cpath%20d=%27M55%2072%20Q60%2075%2065%2072%27%20stroke=%27%23c08060%27%20stroke-width=%271.2%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%2Fg%3E%0A%3Cellipse%20cx=%2725%27%20cy=%2798%27%20rx=%2714%27%20ry=%279%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2718%27%20cy=%2792%27%20rx=%276%27%20ry=%275%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2713%27%20cy=%2798%27%20rx=%275%27%20ry=%275%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%27138%27%20rx=%2748%27%20ry=%2712%27%20fill=%27white%27%20opacity=%27.88%27%2F%3E%0A%3Cellipse%20cx=%2736%27%20cy=%27142%27%20rx=%2730%27%20ry=%2710%27%20fill=%27white%27%20opacity=%27.88%27%2F%3E%0A%3Ctext%20x=%2730%27%20y=%27140%27%20font-family=%27Arial%20Black%27%20font-size=%278%27%20fill=%27%236060a8%27%20font-weight=%27900%27%3Ez%3C%2Ftext%3E%0A%3Ctext%20x=%2742%27%20y=%27132%27%20font-family=%27Arial%20Black%27%20font-size=%2711%27%20fill=%27%235050a0%27%20font-weight=%27900%27%3Ez%3C%2Ftext%3E%0A%3Ctext%20x=%2756%27%20y=%27122%27%20font-family=%27Arial%20Black%27%20font-size=%2714%27%20fill=%27%234040a0%27%20font-weight=%27900%27%3EZ%3C%2Ftext%3E%0A%3Cpath%20d=%27M10%2028%20Q16%2018%2024%2021%20Q18%2026%2017%2032%20Q14%2036%208%2034%20Q8%2031%2010%2028Z%27%20fill=%27%23f0e050%27%20opacity=%27.65%27%2F%3E%0A%3Ccircle%20cx=%2714%27%20cy=%2720%27%20r=%271.2%27%20fill=%27%23c0b0e0%27%20opacity=%27.6%27%2F%3E%0A%3Ccircle%20cx=%2722%27%20cy=%2714%27%20r=%271%27%20fill=%27%23c0b0e0%27%20opacity=%27.5%27%2F%3E%0A%3C%2Fsvg%3E',
      unlock: 'default',
      desc: 'Dostupná pre všetkých'
    },
    'student-m': {
      name: 'Študent práva',
      awake: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20150%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27sk%27%20cx=%2745%25%27%20cy=%2735%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23fde8d0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23f0b88a%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27hr%27%20cx=%2750%25%27%20cy=%270%25%27%20r=%2780%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%238a5020%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%233a1a05%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27ir%27%20cx=%2735%25%27%20cy=%2730%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23c87830%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%236a3010%27%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id=%27su%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%2710%25%27%20y2=%27100%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%231a2a4a%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%230d1528%27%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27118%27%20rx=%2732%27%20ry=%2730%27%20fill=%27url%28%23su%29%27%2F%3E%0A%3Cpath%20d=%27M48%2092%20Q60%20100%2072%2092%20L70%20102%20Q60%20107%2050%20102Z%27%20fill=%27%230d1e38%27%2F%3E%0A%3Cpath%20d=%27M53%2092%20Q60%2098%2067%2092%20L66%20100%20Q60%20104%2054%20100Z%27%20fill=%27%23f0f0ff%27%2F%3E%0A%3Cpath%20d=%27M58%2092%20L60%2092%20L61%20100%20L60%20118%20L59%20100Z%27%20fill=%27%23cc1122%27%2F%3E%0A%3Cpath%20d=%27M57%2092%20L60%2096%20L63%2092Z%27%20fill=%27%23cc1122%27%2F%3E%0A%3Cpath%20d=%27M24%2064%20Q18%2080%2020%20100%20Q26%2096%2028%2085%20Q26%2072%2026%2064Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M96%2064%20Q102%2080%20100%20100%20Q94%2096%2092%2085%20Q94%2072%2094%2064Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2755%27%20rx=%2734%27%20ry=%2728%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M38%2046%20Q36%2030%2042%2026%20Q44%2036%2044%2044Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M50%2042%20Q48%2024%2056%2022%20Q57%2034%2058%2042Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M62%2040%20Q62%2022%2070%2022%20Q70%2034%2070%2042Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M74%2044%20Q76%2028%2082%2030%20Q80%2040%2078%2046Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2762%27%20rx=%2731%27%20ry=%2733%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2729%27%20cy=%2763%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%3Cellipse%20cx=%2729%27%20cy=%2763%27%20rx=%274%27%20ry=%275%27%20fill=%27%23f0c090%27%2F%3E%0A%3Cellipse%20cx=%2791%27%20cy=%2763%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%3Cellipse%20cx=%2791%27%20cy=%2763%27%20rx=%274%27%20ry=%275%27%20fill=%27%23f0c090%27%2F%3E%0A%3Cellipse%20cx=%2747%27%20cy=%2761%27%20rx=%2710%27%20ry=%2711%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2747%27%20cy=%2762%27%20rx=%277%27%20ry=%278%27%20fill=%27url%28%23ir%29%27%2F%3E%0A%3Cellipse%20cx=%2747%27%20cy=%2763%27%20rx=%274%27%20ry=%275%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2750%27%20cy=%2758%27%20r=%273%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2744%27%20cy=%2766%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.6%27%2F%3E%0A%3Cellipse%20cx=%2773%27%20cy=%2761%27%20rx=%2710%27%20ry=%2711%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2773%27%20cy=%2762%27%20rx=%277%27%20ry=%278%27%20fill=%27url%28%23ir%29%27%2F%3E%0A%3Cellipse%20cx=%2773%27%20cy=%2763%27%20rx=%274%27%20ry=%275%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2758%27%20r=%273%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2770%27%20cy=%2766%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.6%27%2F%3E%0A%3Cpath%20d=%27M37%2048%20Q47%2042%2057%2048%27%20stroke=%27%233a1a05%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2048%20Q73%2042%2083%2048%27%20stroke=%27%233a1a05%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M54%2075%20Q60%2079%2066%2075%27%20stroke=%27%23d06050%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M55%2075%20Q60%2079%2065%2075%20Q60%2082%2055%2075Z%27%20fill=%27%23e08878%27%20opacity=%27.4%27%2F%3E%0A%3Cellipse%20cx=%2736%27%20cy=%2773%27%20rx=%2710%27%20ry=%277%27%20fill=%27%23ffb0a0%27%20opacity=%27.35%27%2F%3E%0A%3Cellipse%20cx=%2784%27%20cy=%2773%27%20rx=%2710%27%20ry=%277%27%20fill=%27%23ffb0a0%27%20opacity=%27.35%27%2F%3E%0A%3Cpath%20d=%27M55%2071%20Q60%2074%2065%2071%27%20stroke=%27%23d09060%27%20stroke-width=%271.2%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Ctext%20x=%278%27%20y=%2742%27%20font-size=%2710%27%20fill=%27%23d4af37%27%20opacity=%27.8%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%2786%27%20y=%2750%27%20font-size=%2722%27%20fill=%27%23d4af37%27%20font-weight=%27bold%27%3E%C2%A7%3C%2Ftext%3E%0A%3Cpath%20d=%27M79%2098%20Q86%20104%2088%20120%20Q84%20122%2082%20118%20Q82%20108%2076%20102Z%27%20fill=%27url%28%23su%29%27%2F%3E%0A%3Crect%20x=%2784%27%20y=%27116%27%20width=%2712%27%20height=%2710%27%20rx=%272%27%20fill=%27%238B4513%27%2F%3E%0A%3C%2Fsvg%3E',
      sleep: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20150%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27sk%27%20cx=%2745%25%27%20cy=%2735%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23fde0c5%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23e8a878%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27hr%27%20cx=%2750%25%27%20cy=%270%25%27%20r=%2780%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%238a5020%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%233a1a05%27%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id=%27su%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%2710%25%27%20y2=%27100%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%231a2a4a%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%230d1528%27%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Cg%20transform=%27rotate%28-10%2C60%2C110%29%27%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27118%27%20rx=%2732%27%20ry=%2728%27%20fill=%27url%28%23su%29%27%2F%3E%0A%3Cpath%20d=%27M48%2092%20Q60%20100%2072%2092%20L70%20102%20Q60%20107%2050%20102Z%27%20fill=%27%230d1e38%27%2F%3E%0A%3Cpath%20d=%27M53%2092%20Q60%2098%2067%2092%20L66%20100%20Q60%20104%2054%20100Z%27%20fill=%27%23f0f0ff%27%2F%3E%0A%3Cpath%20d=%27M58%2092%20L60%2092%20L61%20100%20L60%20118%20L59%20100Z%27%20fill=%27%23cc1122%27%20opacity=%27.8%27%2F%3E%0A%3Cpath%20d=%27M57%2092%20L60%2096%20L63%2092Z%27%20fill=%27%23cc1122%27%20opacity=%27.8%27%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d=%27M24%2064%20Q18%2080%2020%20100%20Q26%2096%2028%2085%20Q26%2072%2026%2064Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M96%2064%20Q102%2080%20100%20100%20Q94%2096%2092%2085%20Q94%2072%2094%2064Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2755%27%20rx=%2734%27%20ry=%2728%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M38%2046%20Q36%2030%2042%2026%20Q44%2036%2044%2044Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M50%2042%20Q48%2024%2056%2022%20Q57%2034%2058%2042Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M62%2040%20Q62%2022%2070%2022%20Q70%2034%2070%2042Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cpath%20d=%27M74%2044%20Q76%2028%2082%2030%20Q80%2040%2078%2046Z%27%20fill=%27url%28%23hr%29%27%2F%3E%0A%3Cg%20transform=%27rotate%28-14%2C60%2C62%29%27%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2762%27%20rx=%2731%27%20ry=%2733%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2729%27%20cy=%2763%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%3Cellipse%20cx=%2791%27%20cy=%2763%27%20rx=%276%27%20ry=%277%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cpath%20d=%27M37%2061%20Q47%2071%2057%2061%27%20stroke=%27%232a1a0a%27%20stroke-width=%272.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M37%2061%20Q40%2055%2044%2058%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M46%2056%20Q50%2051%2054%2056%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M56%2058%20Q59%2054%2062%2058%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2061%20Q73%2071%2083%2061%27%20stroke=%27%232a1a0a%27%20stroke-width=%272.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2061%20Q66%2055%2070%2058%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M72%2056%20Q76%2051%2080%2056%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M82%2058%20Q85%2054%2088%2058%27%20stroke=%27%231a0a05%27%20stroke-width=%271.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M37%2048%20Q47%2043%2057%2048%27%20stroke=%27%233a1a05%27%20stroke-width=%272%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M63%2048%20Q73%2043%2083%2048%27%20stroke=%27%233a1a05%27%20stroke-width=%272%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2775%27%20rx=%279%27%20ry=%276%27%20fill=%27%23ffb0a0%27%20opacity=%27.45%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2775%27%20rx=%279%27%20ry=%276%27%20fill=%27%23ffb0a0%27%20opacity=%27.45%27%2F%3E%0A%3C%2Fg%3E%0A%3Cellipse%20cx=%2795%27%20cy=%2798%27%20rx=%2714%27%20ry=%279%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%27102%27%20cy=%2792%27%20rx=%276%27%20ry=%275%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%27107%27%20cy=%2798%27%20rx=%275%27%20ry=%275%27%20fill=%27url%28%23sk%29%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%27138%27%20rx=%2748%27%20ry=%2712%27%20fill=%27white%27%20opacity=%27.88%27%2F%3E%0A%3Cellipse%20cx=%2784%27%20cy=%27142%27%20rx=%2730%27%20ry=%2710%27%20fill=%27white%27%20opacity=%27.88%27%2F%3E%0A%3Ctext%20x=%2764%27%20y=%27140%27%20font-family=%27Arial%20Black%27%20font-size=%278%27%20fill=%27%236060a8%27%20font-weight=%27900%27%3Ez%3C%2Ftext%3E%0A%3Ctext%20x=%2776%27%20y=%27132%27%20font-family=%27Arial%20Black%27%20font-size=%2711%27%20fill=%27%235050a0%27%20font-weight=%27900%27%3Ez%3C%2Ftext%3E%0A%3Ctext%20x=%2788%27%20y=%27122%27%20font-family=%27Arial%20Black%27%20font-size=%2714%27%20fill=%27%234040a0%27%20font-weight=%27900%27%3EZ%3C%2Ftext%3E%0A%3Cpath%20d=%27M100%2028%20Q106%2018%20114%2021%20Q108%2026%20107%2032%20Q104%2036%2098%2034%20Q98%2031%20100%2028Z%27%20fill=%27%23f0e050%27%20opacity=%27.65%27%2F%3E%0A%3Ccircle%20cx=%27104%27%20cy=%2720%27%20r=%271.2%27%20fill=%27%23c0b0e0%27%20opacity=%27.6%27%2F%3E%0A%3C%2Fsvg%3E',
      unlock: 'default',
      desc: 'Dostupný pre všetkých'
    },
    'cat': {
      name: 'Právnická mačka',
      awake: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20140%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27cb%27%20cx=%2750%25%27%20cy=%2740%25%27%20r=%2760%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f0a840%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23c06010%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27cy%27%20cx=%2750%25%27%20cy=%2750%25%27%20r=%2755%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23fde8c0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23f0c880%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27ce%27%20cx=%2735%25%27%20cy=%2730%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%2380e040%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23208000%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27cn%27%20cx=%2750%25%27%20cy=%2740%25%27%20r=%2760%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f080a0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23c04070%27%2F%3E%3C%2FradialGradient%3E%0A%3Cfilter%20id=%27cs%27%3E%3CfeDropShadow%20dx=%271%27%20dy=%272%27%20stdDeviation=%273%27%20flood-color=%27rgba%280%2C0%2C0%2C0.2%29%27%2F%3E%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%21--%20Chvost%20--%3E%0A%3Cpath%20d=%27M92%20110%20Q118%2095%20114%2072%20Q110%2055%20100%2058%20Q108%2070%20106%2082%20Q104%2096%2092%20104Z%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cpath%20d=%27M92%20110%20Q116%2097%20112%2076%20Q108%2060%20102%2062%27%20stroke=%27%23c06010%27%20stroke-width=%271.5%27%20fill=%27none%27%20opacity=%27.4%27%2F%3E%0A%3C%21--%20Telo%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27105%27%20rx=%2736%27%20ry=%2732%27%20fill=%27url%28%23cb%29%27%20filter=%27url%28%23cs%29%27%2F%3E%0A%3C%21--%20Brucho%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27112%27%20rx=%2722%27%20ry=%2722%27%20fill=%27url%28%23cy%29%27%2F%3E%0A%3C%21--%20Pr%C3%BA%C5%BEky%20tabby%20na%20tele%20--%3E%0A%3Cpath%20d=%27M34%2092%20Q40%20100%2034%20108%27%20stroke=%27%23b05010%27%20stroke-width=%273%27%20fill=%27none%27%20opacity=%27.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M39%2088%20Q45%2098%2039%20106%27%20stroke=%27%23b05010%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M86%2092%20Q80%20100%2086%20108%27%20stroke=%27%23b05010%27%20stroke-width=%273%27%20fill=%27none%27%20opacity=%27.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M81%2088%20Q75%2098%2081%20106%27%20stroke=%27%23b05010%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Hlava%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2760%27%20rx=%2736%27%20ry=%2734%27%20fill=%27url%28%23cb%29%27%20filter=%27url%28%23cs%29%27%2F%3E%0A%3C%21--%20U%C5%A1i%20%C5%A1picat%C3%A9%20--%3E%0A%3Cpolygon%20points=%2730%2C34%2018%2C8%2044%2C28%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cpolygon%20points=%2732%2C32%2022%2C12%2042%2C26%27%20fill=%27%23e08030%27%20opacity=%27.7%27%2F%3E%0A%3Cpolygon%20points=%2733%2C30%2025%2C16%2040%2C25%27%20fill=%27%23f0b080%27%20opacity=%27.5%27%2F%3E%0A%3Cpolygon%20points=%2790%2C34%20102%2C8%2076%2C28%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cpolygon%20points=%2788%2C32%2098%2C12%2078%2C26%27%20fill=%27%23e08030%27%20opacity=%27.7%27%2F%3E%0A%3Cpolygon%20points=%2787%2C30%2095%2C16%2080%2C25%27%20fill=%27%23f0b080%27%20opacity=%27.5%27%2F%3E%0A%3C%21--%20Pr%C3%BA%C5%BEky%20na%20hlave%20--%3E%0A%3Cpath%20d=%27M48%2032%20Q54%2022%2060%2020%20Q66%2022%2072%2032%27%20stroke=%27%23c06010%27%20stroke-width=%272.5%27%20fill=%27none%27%20opacity=%27.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M44%2038%20Q50%2030%2056%2028%27%20stroke=%27%23c06010%27%20stroke-width=%271.8%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M76%2038%20Q70%2030%2064%2028%27%20stroke=%27%23c06010%27%20stroke-width=%271.8%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20O%C4%8Di%20zelen%C3%A9%20ve%C4%BEk%C3%A9%20--%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2758%27%20rx=%2712%27%20ry=%2713%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2759%27%20rx=%279%27%20ry=%2710%27%20fill=%27url%28%23ce%29%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2759%27%20rx=%274%27%20ry=%278%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2748%27%20cy=%2754%27%20r=%273.5%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2740%27%20cy=%2763%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2758%27%20rx=%2712%27%20ry=%2713%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2759%27%20rx=%279%27%20ry=%2710%27%20fill=%27url%28%23ce%29%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2759%27%20rx=%274%27%20ry=%278%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2780%27%20cy=%2754%27%20r=%273.5%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2772%27%20cy=%2763%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3C%21--%20Obo%C4%8Die%20ma%C4%8Dacie%20--%3E%0A%3Cpath%20d=%27M32%2044%20Q44%2038%2056%2044%27%20stroke=%27%23a04808%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M64%2044%20Q76%2038%2088%2044%27%20stroke=%27%23a04808%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Nos%20srdcie%C4%8Dkov%C3%BD%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2772%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cn%29%27%2F%3E%0A%3Cpath%20d=%27M54.5%2072%20Q60%2077%2065.5%2072%27%20fill=%27url%28%23cn%29%27%20opacity=%27.6%27%2F%3E%0A%3C%21--%20%C3%9Asta%20--%3E%0A%3Cpath%20d=%27M60%2075%20L54%2081%27%20stroke=%27%23c04060%27%20stroke-width=%271.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M60%2075%20L66%2081%27%20stroke=%27%23c04060%27%20stroke-width=%271.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20F%C3%BAzy%20--%3E%0A%3Cline%20x1=%2720%27%20y1=%2768%27%20x2=%2750%27%20y2=%2774%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.85%27%2F%3E%0A%3Cline%20x1=%2720%27%20y1=%2773%27%20x2=%2750%27%20y2=%2776%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.75%27%2F%3E%0A%3Cline%20x1=%2720%27%20y1=%2778%27%20x2=%2750%27%20y2=%2777%27%20stroke=%27white%27%20stroke-width=%271.2%27%20opacity=%27.65%27%2F%3E%0A%3Cline%20x1=%2770%27%20y1=%2774%27%20x2=%27100%27%20y2=%2768%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.85%27%2F%3E%0A%3Cline%20x1=%2770%27%20y1=%2776%27%20x2=%27100%27%20y2=%2773%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.75%27%2F%3E%0A%3Cline%20x1=%2770%27%20y1=%2777%27%20x2=%27100%27%20y2=%2778%27%20stroke=%27white%27%20stroke-width=%271.2%27%20opacity=%27.65%27%2F%3E%0A%3C%21--%20L%C3%AD%C4%8Dka%20--%3E%0A%3Cellipse%20cx=%2732%27%20cy=%2770%27%20rx=%2710%27%20ry=%276%27%20fill=%27%23ffb0b0%27%20opacity=%27.3%27%2F%3E%0A%3Cellipse%20cx=%2788%27%20cy=%2770%27%20rx=%2710%27%20ry=%276%27%20fill=%27%23ffb0b0%27%20opacity=%27.3%27%2F%3E%0A%3C%21--%20Obojok%20s%20%C2%A7%20--%3E%0A%3Crect%20x=%2738%27%20y=%2784%27%20width=%2744%27%20height=%2710%27%20rx=%275%27%20fill=%27%23cc2244%27%2F%3E%0A%3Crect%20x=%2740%27%20y=%2785%27%20width=%2740%27%20height=%278%27%20rx=%274%27%20fill=%27%23e03355%27%2F%3E%0A%3Ctext%20x=%2760%27%20y=%2792%27%20text-anchor=%27middle%27%20font-family=%27serif%27%20font-size=%277%27%20fill=%27%23d4af37%27%20font-weight=%27bold%27%3E%C2%A7%20%C2%A7%20%C2%A7%3C%2Ftext%3E%0A%3C%21--%20Tlapky%20--%3E%0A%3Cellipse%20cx=%2738%27%20cy=%27132%27%20rx=%2712%27%20ry=%278%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cellipse%20cx=%2732%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2738%27%20cy=%27136%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2744%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%0A%3Cellipse%20cx=%2782%27%20cy=%27132%27%20rx=%2712%27%20ry=%278%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2782%27%20cy=%27136%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2788%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%0A%3C%21--%20Hviezdi%C4%8Dky%20--%3E%0A%3Ctext%20x=%278%27%20y=%2730%27%20font-size=%2710%27%20fill=%27%23d4af37%27%20opacity=%27.7%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%27100%27%20y=%2724%27%20font-size=%278%27%20fill=%27%23d4af37%27%20opacity=%27.5%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
      sleep: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20140%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27cb%27%20cx=%2750%25%27%20cy=%2740%25%27%20r=%2760%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f0a840%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23c06010%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27cy%27%20cx=%2750%25%27%20cy=%2750%25%27%20r=%2755%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23fde8c0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23f0c880%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27ce%27%20cx=%2735%25%27%20cy=%2730%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%2380e040%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23208000%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27cn%27%20cx=%2750%25%27%20cy=%2740%25%27%20r=%2760%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f080a0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23c04070%27%2F%3E%3C%2FradialGradient%3E%0A%3Cfilter%20id=%27cs%27%3E%3CfeDropShadow%20dx=%271%27%20dy=%272%27%20stdDeviation=%273%27%20flood-color=%27rgba%280%2C0%2C0%2C0.2%29%27%2F%3E%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%21--%20Chvost%20--%3E%0A%3Cpath%20d=%27M92%20110%20Q118%2095%20114%2072%20Q110%2055%20100%2058%20Q108%2070%20106%2082%20Q104%2096%2092%20104Z%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cpath%20d=%27M92%20110%20Q116%2097%20112%2076%20Q108%2060%20102%2062%27%20stroke=%27%23c06010%27%20stroke-width=%271.5%27%20fill=%27none%27%20opacity=%27.4%27%2F%3E%0A%3C%21--%20Telo%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27105%27%20rx=%2736%27%20ry=%2732%27%20fill=%27url%28%23cb%29%27%20filter=%27url%28%23cs%29%27%2F%3E%0A%3C%21--%20Brucho%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27112%27%20rx=%2722%27%20ry=%2722%27%20fill=%27url%28%23cy%29%27%2F%3E%0A%3C%21--%20Pr%C3%BA%C5%BEky%20tabby%20na%20tele%20--%3E%0A%3Cpath%20d=%27M34%2092%20Q40%20100%2034%20108%27%20stroke=%27%23b05010%27%20stroke-width=%273%27%20fill=%27none%27%20opacity=%27.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M39%2088%20Q45%2098%2039%20106%27%20stroke=%27%23b05010%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M86%2092%20Q80%20100%2086%20108%27%20stroke=%27%23b05010%27%20stroke-width=%273%27%20fill=%27none%27%20opacity=%27.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M81%2088%20Q75%2098%2081%20106%27%20stroke=%27%23b05010%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Hlava%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2760%27%20rx=%2736%27%20ry=%2734%27%20fill=%27url%28%23cb%29%27%20filter=%27url%28%23cs%29%27%2F%3E%0A%3C%21--%20U%C5%A1i%20%C5%A1picat%C3%A9%20--%3E%0A%3Cpolygon%20points=%2730%2C34%2018%2C8%2044%2C28%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cpolygon%20points=%2732%2C32%2022%2C12%2042%2C26%27%20fill=%27%23e08030%27%20opacity=%27.7%27%2F%3E%0A%3Cpolygon%20points=%2733%2C30%2025%2C16%2040%2C25%27%20fill=%27%23f0b080%27%20opacity=%27.5%27%2F%3E%0A%3Cpolygon%20points=%2790%2C34%20102%2C8%2076%2C28%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cpolygon%20points=%2788%2C32%2098%2C12%2078%2C26%27%20fill=%27%23e08030%27%20opacity=%27.7%27%2F%3E%0A%3Cpolygon%20points=%2787%2C30%2095%2C16%2080%2C25%27%20fill=%27%23f0b080%27%20opacity=%27.5%27%2F%3E%0A%3C%21--%20Pr%C3%BA%C5%BEky%20na%20hlave%20--%3E%0A%3Cpath%20d=%27M48%2032%20Q54%2022%2060%2020%20Q66%2022%2072%2032%27%20stroke=%27%23c06010%27%20stroke-width=%272.5%27%20fill=%27none%27%20opacity=%27.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M44%2038%20Q50%2030%2056%2028%27%20stroke=%27%23c06010%27%20stroke-width=%271.8%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M76%2038%20Q70%2030%2064%2028%27%20stroke=%27%23c06010%27%20stroke-width=%271.8%27%20fill=%27none%27%20opacity=%27.4%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20O%C4%8Di%20zelen%C3%A9%20ve%C4%BEk%C3%A9%20--%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2758%27%20rx=%2712%27%20ry=%2713%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2759%27%20rx=%279%27%20ry=%2710%27%20fill=%27url%28%23ce%29%27%2F%3E%0A%3Cellipse%20cx=%2744%27%20cy=%2759%27%20rx=%274%27%20ry=%278%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2748%27%20cy=%2754%27%20r=%273.5%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2740%27%20cy=%2763%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2758%27%20rx=%2712%27%20ry=%2713%27%20fill=%27white%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2759%27%20rx=%279%27%20ry=%2710%27%20fill=%27url%28%23ce%29%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%2759%27%20rx=%274%27%20ry=%278%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2780%27%20cy=%2754%27%20r=%273.5%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2772%27%20cy=%2763%27%20r=%271.5%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3C%21--%20Obo%C4%8Die%20ma%C4%8Dacie%20--%3E%0A%3Cpath%20d=%27M32%2044%20Q44%2038%2056%2044%27%20stroke=%27%23a04808%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M64%2044%20Q76%2038%2088%2044%27%20stroke=%27%23a04808%27%20stroke-width=%272.5%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Nos%20srdcie%C4%8Dkov%C3%BD%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2772%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cn%29%27%2F%3E%0A%3Cpath%20d=%27M54.5%2072%20Q60%2077%2065.5%2072%27%20fill=%27url%28%23cn%29%27%20opacity=%27.6%27%2F%3E%0A%3C%21--%20%C3%9Asta%20--%3E%0A%3Cpath%20d=%27M60%2075%20L54%2081%27%20stroke=%27%23c04060%27%20stroke-width=%271.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M60%2075%20L66%2081%27%20stroke=%27%23c04060%27%20stroke-width=%271.8%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20F%C3%BAzy%20--%3E%0A%3Cline%20x1=%2720%27%20y1=%2768%27%20x2=%2750%27%20y2=%2774%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.85%27%2F%3E%0A%3Cline%20x1=%2720%27%20y1=%2773%27%20x2=%2750%27%20y2=%2776%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.75%27%2F%3E%0A%3Cline%20x1=%2720%27%20y1=%2778%27%20x2=%2750%27%20y2=%2777%27%20stroke=%27white%27%20stroke-width=%271.2%27%20opacity=%27.65%27%2F%3E%0A%3Cline%20x1=%2770%27%20y1=%2774%27%20x2=%27100%27%20y2=%2768%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.85%27%2F%3E%0A%3Cline%20x1=%2770%27%20y1=%2776%27%20x2=%27100%27%20y2=%2773%27%20stroke=%27white%27%20stroke-width=%271.5%27%20opacity=%27.75%27%2F%3E%0A%3Cline%20x1=%2770%27%20y1=%2777%27%20x2=%27100%27%20y2=%2778%27%20stroke=%27white%27%20stroke-width=%271.2%27%20opacity=%27.65%27%2F%3E%0A%3C%21--%20L%C3%AD%C4%8Dka%20--%3E%0A%3Cellipse%20cx=%2732%27%20cy=%2770%27%20rx=%2710%27%20ry=%276%27%20fill=%27%23ffb0b0%27%20opacity=%27.3%27%2F%3E%0A%3Cellipse%20cx=%2788%27%20cy=%2770%27%20rx=%2710%27%20ry=%276%27%20fill=%27%23ffb0b0%27%20opacity=%27.3%27%2F%3E%0A%3C%21--%20Obojok%20s%20%C2%A7%20--%3E%0A%3Crect%20x=%2738%27%20y=%2784%27%20width=%2744%27%20height=%2710%27%20rx=%275%27%20fill=%27%23cc2244%27%2F%3E%0A%3Crect%20x=%2740%27%20y=%2785%27%20width=%2740%27%20height=%278%27%20rx=%274%27%20fill=%27%23e03355%27%2F%3E%0A%3Ctext%20x=%2760%27%20y=%2792%27%20text-anchor=%27middle%27%20font-family=%27serif%27%20font-size=%277%27%20fill=%27%23d4af37%27%20font-weight=%27bold%27%3E%C2%A7%20%C2%A7%20%C2%A7%3C%2Ftext%3E%0A%3C%21--%20Tlapky%20--%3E%0A%3Cellipse%20cx=%2738%27%20cy=%27132%27%20rx=%2712%27%20ry=%278%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cellipse%20cx=%2732%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2738%27%20cy=%27136%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2744%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%0A%3Cellipse%20cx=%2782%27%20cy=%27132%27%20rx=%2712%27%20ry=%278%27%20fill=%27url%28%23cb%29%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2782%27%20cy=%27136%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%3Cellipse%20cx=%2788%27%20cy=%27134%27%20rx=%275.5%27%20ry=%274%27%20fill=%27url%28%23cy%29%27%2F%3E%0A%3C%21--%20Hviezdi%C4%8Dky%20--%3E%0A%3Ctext%20x=%278%27%20y=%2730%27%20font-size=%2710%27%20fill=%27%23d4af37%27%20opacity=%27.7%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%27100%27%20y=%2724%27%20font-size=%278%27%20fill=%27%23d4af37%27%20opacity=%27.5%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
      unlock: 'paragraphs_100',
      unlockValue: 100,
      desc: 'Odomkni za 100§'
    },
    'owl': {
      name: 'Sova múdrosti',
      awake: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20150%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27ob%27%20cx=%2750%25%27%20cy=%2735%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23a08060%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%235a3a18%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27oy%27%20cx=%2750%25%27%20cy=%2750%25%27%20r=%2755%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f0e8d0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23d8c8a0%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27oe%27%20cx=%2735%25%27%20cy=%2730%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f5d030%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23c08010%27%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id=%27om%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%270%25%27%20y2=%27100%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%231a1a1a%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%230a0a0a%27%2F%3E%3C%2FlinearGradient%3E%0A%3Cfilter%20id=%27os%27%3E%3CfeDropShadow%20dx=%271%27%20dy=%272%27%20stdDeviation=%273%27%20flood-color=%27rgba%280%2C0%2C0%2C0.22%29%27%2F%3E%3C%2Ffilter%3E%0A%3Cfilter%20id=%27og%27%3E%3CfeGaussianBlur%20stdDeviation=%272%27%20result=%27b%27%2F%3E%3CfeMerge%3E%3CfeMergeNode%20in=%27b%27%2F%3E%3CfeMergeNode%20in=%27SourceGraphic%27%2F%3E%3C%2FfeMerge%3E%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%21--%20Kr%C3%ADdla%20--%3E%0A%3Cpath%20d=%27M26%2088%20Q10%20108%2014%20128%20Q26%20124%2030%20110%20Q31%2096%2033%2088Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M28%2090%20Q14%20108%2018%20124%20Q28%20118%2030%20108%27%20stroke=%27%237a5a38%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%2F%3E%0A%3Cpath%20d=%27M94%2088%20Q110%20108%20106%20128%20Q94%20124%2090%20110%20Q89%2096%2087%2088Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M92%2090%20Q106%20108%20102%20124%20Q92%20118%2090%20108%27%20stroke=%27%237a5a38%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%2F%3E%0A%3C%21--%20Telo%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27112%27%20rx=%2734%27%20ry=%2736%27%20fill=%27url%28%23ob%29%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3C%21--%20Brucho%20s%20per%C3%ADm%20vzor%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27118%27%20rx=%2722%27%20ry=%2726%27%20fill=%27url%28%23oy%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27100%27%20rx=%2715%27%20ry=%2711%27%20fill=%27url%28%23oy%29%27%20opacity=%27.6%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27116%27%20rx=%2714%27%20ry=%2710%27%20fill=%27url%28%23oy%29%27%20opacity=%27.5%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27130%27%20rx=%2713%27%20ry=%279%27%20fill=%27url%28%23oy%29%27%20opacity=%27.4%27%2F%3E%0A%3C%21--%20Hlava%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2764%27%20rx=%2734%27%20ry=%2733%27%20fill=%27url%28%23ob%29%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3C%21--%20Tufty%20peria%20na%20hlave%20--%3E%0A%3Cpath%20d=%27M36%2036%20Q28%2018%2034%2010%20Q37%2024%2040%2032Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M40%2032%20Q34%2014%2038%206%20Q41%2020%2043%2030Z%27%20fill=%27%238a6840%27%2F%3E%0A%3Cpath%20d=%27M84%2036%20Q92%2018%2086%2010%20Q83%2024%2080%2032Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M80%2032%20Q86%2014%2082%206%20Q79%2020%2077%2030Z%27%20fill=%27%238a6840%27%2F%3E%0A%3C%21--%20Mort%C3%A1rov%C3%A1%20%C4%8Diapka%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2738%27%20rx=%2730%27%20ry=%279%27%20fill=%27url%28%23om%29%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3Crect%20x=%2736%27%20y=%2730%27%20width=%2748%27%20height=%2710%27%20rx=%273%27%20fill=%27url%28%23om%29%27%2F%3E%0A%3C%21--%20Strapec%20--%3E%0A%3Cline%20x1=%2789%27%20y1=%2734%27%20x2=%2798%27%20y2=%2742%27%20stroke=%27%23d4af37%27%20stroke-width=%272%27%2F%3E%0A%3Ccircle%20cx=%2798%27%20cy=%2743%27%20r=%273%27%20fill=%27%23d4af37%27%2F%3E%0A%3Cline%20x1=%2798%27%20y1=%2743%27%20x2=%2795%27%20y2=%2754%27%20stroke=%27%23d4af37%27%20stroke-width=%271.5%27%2F%3E%0A%3Cline%20x1=%2798%27%20y1=%2743%27%20x2=%2798%27%20y2=%2755%27%20stroke=%27%23d4af37%27%20stroke-width=%271.5%27%2F%3E%0A%3Cline%20x1=%2798%27%20y1=%2743%27%20x2=%27101%27%20y2=%2754%27%20stroke=%27%23d4af37%27%20stroke-width=%271.5%27%2F%3E%0A%3C%21--%20O%C4%8Di%20ve%C4%BEk%C3%A9%20okr%C3%BAhle%20--%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%2716%27%20fill=%27white%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%2712%27%20fill=%27url%28%23oe%29%27%2F%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%277%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2749%27%20cy=%2756%27%20r=%274%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2739%27%20cy=%2767%27%20r=%272%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%2715%27%20fill=%27none%27%20stroke=%27%238a6030%27%20stroke-width=%272%27%20opacity=%27.55%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%2716%27%20fill=%27white%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%2712%27%20fill=%27url%28%23oe%29%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%277%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2781%27%20cy=%2756%27%20r=%274%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2771%27%20cy=%2767%27%20r=%272%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%2715%27%20fill=%27none%27%20stroke=%27%238a6030%27%20stroke-width=%272%27%20opacity=%27.55%27%2F%3E%0A%3C%21--%20Obo%C4%8Die%20vedcovsk%C3%A9%20--%3E%0A%3Cpath%20d=%27M30%2046%20Q44%2040%2058%2046%27%20stroke=%27%235a3a10%27%20stroke-width=%273%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M62%2046%20Q76%2040%2090%2046%27%20stroke=%27%235a3a10%27%20stroke-width=%273%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Zob%C3%A1k%20--%3E%0A%3Cpolygon%20points=%2760%2C72%2054%2C84%2066%2C84%27%20fill=%27%23e09020%27%2F%3E%0A%3Cpolygon%20points=%2760%2C72%2055%2C80%2065%2C80%27%20fill=%27%23f0b030%27%2F%3E%0A%3C%21--%20Perie%20pod%20krkom%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2786%27%20rx=%2718%27%20ry=%277%27%20fill=%27url%28%23oy%29%27%2F%3E%0A%3Cpath%20d=%27M44%2084%20Q50%2089%2056%2084%27%20fill=%27%23d0c090%27%20opacity=%27.5%27%2F%3E%0A%3Cpath%20d=%27M56%2084%20Q62%2089%2068%2084%27%20fill=%27%23d0c090%27%20opacity=%27.5%27%2F%3E%0A%3Cpath%20d=%27M68%2084%20Q74%2089%2076%2084%27%20fill=%27%23d0c090%27%20opacity=%27.5%27%2F%3E%0A%3C%21--%20Labky%20--%3E%0A%3Cellipse%20cx=%2744%27%20cy=%27140%27%20rx=%2711%27%20ry=%277%27%20fill=%27%23c07818%27%2F%3E%0A%3Cline%20x1=%2736%27%20y1=%27137%27%20x2=%2734%27%20y2=%27147%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2740%27%20y1=%27139%27%20x2=%2739%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2744%27%20y1=%27140%27%20x2=%2744%27%20y2=%27150%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2748%27%20y1=%27139%27%20x2=%2749%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%27140%27%20rx=%2711%27%20ry=%277%27%20fill=%27%23c07818%27%2F%3E%0A%3Cline%20x1=%2768%27%20y1=%27137%27%20x2=%2766%27%20y2=%27147%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2772%27%20y1=%27139%27%20x2=%2771%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2776%27%20y1=%27140%27%20x2=%2776%27%20y2=%27150%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2780%27%20y1=%27139%27%20x2=%2781%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Hviezda%20z%C3%A1sluh%20--%3E%0A%3Ctext%20x=%2760%27%20y=%27128%27%20text-anchor=%27middle%27%20font-size=%2714%27%20fill=%27%23d4af37%27%20filter=%27url%28%23og%29%27%3E%E2%98%85%3C%2Ftext%3E%0A%3C%21--%20Hviezdi%C4%8Dky%20--%3E%0A%3Ctext%20x=%278%27%20y=%2730%27%20font-size=%2710%27%20fill=%27%23d4af37%27%20opacity=%27.7%27%20filter=%27url%28%23og%29%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%27104%27%20y=%2724%27%20font-size=%278%27%20fill=%27%23d4af37%27%20opacity=%27.5%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%27108%27%20y=%2744%27%20font-size=%276%27%20fill=%27%23d4af37%27%20opacity=%27.4%27%3E%C2%B7%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
      sleep: 'data:image/svg+xml,%3Csvg%20xmlns=%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox=%270%200%20120%20150%27%3E%0A%3Cdefs%3E%0A%3CradialGradient%20id=%27ob%27%20cx=%2750%25%27%20cy=%2735%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23a08060%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%235a3a18%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27oy%27%20cx=%2750%25%27%20cy=%2750%25%27%20r=%2755%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f0e8d0%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23d8c8a0%27%2F%3E%3C%2FradialGradient%3E%0A%3CradialGradient%20id=%27oe%27%20cx=%2735%25%27%20cy=%2730%25%27%20r=%2765%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%23f5d030%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%23c08010%27%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id=%27om%27%20x1=%270%25%27%20y1=%270%25%27%20x2=%270%25%27%20y2=%27100%25%27%3E%3Cstop%20offset=%270%25%27%20stop-color=%27%231a1a1a%27%2F%3E%3Cstop%20offset=%27100%25%27%20stop-color=%27%230a0a0a%27%2F%3E%3C%2FlinearGradient%3E%0A%3Cfilter%20id=%27os%27%3E%3CfeDropShadow%20dx=%271%27%20dy=%272%27%20stdDeviation=%273%27%20flood-color=%27rgba%280%2C0%2C0%2C0.22%29%27%2F%3E%3C%2Ffilter%3E%0A%3Cfilter%20id=%27og%27%3E%3CfeGaussianBlur%20stdDeviation=%272%27%20result=%27b%27%2F%3E%3CfeMerge%3E%3CfeMergeNode%20in=%27b%27%2F%3E%3CfeMergeNode%20in=%27SourceGraphic%27%2F%3E%3C%2FfeMerge%3E%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%21--%20Kr%C3%ADdla%20--%3E%0A%3Cpath%20d=%27M26%2088%20Q10%20108%2014%20128%20Q26%20124%2030%20110%20Q31%2096%2033%2088Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M28%2090%20Q14%20108%2018%20124%20Q28%20118%2030%20108%27%20stroke=%27%237a5a38%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%2F%3E%0A%3Cpath%20d=%27M94%2088%20Q110%20108%20106%20128%20Q94%20124%2090%20110%20Q89%2096%2087%2088Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M92%2090%20Q106%20108%20102%20124%20Q92%20118%2090%20108%27%20stroke=%27%237a5a38%27%20stroke-width=%272%27%20fill=%27none%27%20opacity=%27.4%27%2F%3E%0A%3C%21--%20Telo%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27112%27%20rx=%2734%27%20ry=%2736%27%20fill=%27url%28%23ob%29%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3C%21--%20Brucho%20s%20per%C3%ADm%20vzor%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27118%27%20rx=%2722%27%20ry=%2726%27%20fill=%27url%28%23oy%29%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27100%27%20rx=%2715%27%20ry=%2711%27%20fill=%27url%28%23oy%29%27%20opacity=%27.6%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27116%27%20rx=%2714%27%20ry=%2710%27%20fill=%27url%28%23oy%29%27%20opacity=%27.5%27%2F%3E%0A%3Cellipse%20cx=%2760%27%20cy=%27130%27%20rx=%2713%27%20ry=%279%27%20fill=%27url%28%23oy%29%27%20opacity=%27.4%27%2F%3E%0A%3C%21--%20Hlava%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2764%27%20rx=%2734%27%20ry=%2733%27%20fill=%27url%28%23ob%29%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3C%21--%20Tufty%20peria%20na%20hlave%20--%3E%0A%3Cpath%20d=%27M36%2036%20Q28%2018%2034%2010%20Q37%2024%2040%2032Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M40%2032%20Q34%2014%2038%206%20Q41%2020%2043%2030Z%27%20fill=%27%238a6840%27%2F%3E%0A%3Cpath%20d=%27M84%2036%20Q92%2018%2086%2010%20Q83%2024%2080%2032Z%27%20fill=%27url%28%23ob%29%27%2F%3E%0A%3Cpath%20d=%27M80%2032%20Q86%2014%2082%206%20Q79%2020%2077%2030Z%27%20fill=%27%238a6840%27%2F%3E%0A%3C%21--%20Mort%C3%A1rov%C3%A1%20%C4%8Diapka%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2738%27%20rx=%2730%27%20ry=%279%27%20fill=%27url%28%23om%29%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3Crect%20x=%2736%27%20y=%2730%27%20width=%2748%27%20height=%2710%27%20rx=%273%27%20fill=%27url%28%23om%29%27%2F%3E%0A%3C%21--%20Strapec%20--%3E%0A%3Cline%20x1=%2789%27%20y1=%2734%27%20x2=%2798%27%20y2=%2742%27%20stroke=%27%23d4af37%27%20stroke-width=%272%27%2F%3E%0A%3Ccircle%20cx=%2798%27%20cy=%2743%27%20r=%273%27%20fill=%27%23d4af37%27%2F%3E%0A%3Cline%20x1=%2798%27%20y1=%2743%27%20x2=%2795%27%20y2=%2754%27%20stroke=%27%23d4af37%27%20stroke-width=%271.5%27%2F%3E%0A%3Cline%20x1=%2798%27%20y1=%2743%27%20x2=%2798%27%20y2=%2755%27%20stroke=%27%23d4af37%27%20stroke-width=%271.5%27%2F%3E%0A%3Cline%20x1=%2798%27%20y1=%2743%27%20x2=%27101%27%20y2=%2754%27%20stroke=%27%23d4af37%27%20stroke-width=%271.5%27%2F%3E%0A%3C%21--%20O%C4%8Di%20ve%C4%BEk%C3%A9%20okr%C3%BAhle%20--%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%2716%27%20fill=%27white%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%2712%27%20fill=%27url%28%23oe%29%27%2F%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%277%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2749%27%20cy=%2756%27%20r=%274%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2739%27%20cy=%2767%27%20r=%272%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3Ccircle%20cx=%2744%27%20cy=%2762%27%20r=%2715%27%20fill=%27none%27%20stroke=%27%238a6030%27%20stroke-width=%272%27%20opacity=%27.55%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%2716%27%20fill=%27white%27%20filter=%27url%28%23os%29%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%2712%27%20fill=%27url%28%23oe%29%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%277%27%20fill=%27%23111%27%2F%3E%0A%3Ccircle%20cx=%2781%27%20cy=%2756%27%20r=%274%27%20fill=%27white%27%2F%3E%3Ccircle%20cx=%2771%27%20cy=%2767%27%20r=%272%27%20fill=%27white%27%20opacity=%27.5%27%2F%3E%0A%3Ccircle%20cx=%2776%27%20cy=%2762%27%20r=%2715%27%20fill=%27none%27%20stroke=%27%238a6030%27%20stroke-width=%272%27%20opacity=%27.55%27%2F%3E%0A%3C%21--%20Obo%C4%8Die%20vedcovsk%C3%A9%20--%3E%0A%3Cpath%20d=%27M30%2046%20Q44%2040%2058%2046%27%20stroke=%27%235a3a10%27%20stroke-width=%273%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cpath%20d=%27M62%2046%20Q76%2040%2090%2046%27%20stroke=%27%235a3a10%27%20stroke-width=%273%27%20fill=%27none%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Zob%C3%A1k%20--%3E%0A%3Cpolygon%20points=%2760%2C72%2054%2C84%2066%2C84%27%20fill=%27%23e09020%27%2F%3E%0A%3Cpolygon%20points=%2760%2C72%2055%2C80%2065%2C80%27%20fill=%27%23f0b030%27%2F%3E%0A%3C%21--%20Perie%20pod%20krkom%20--%3E%0A%3Cellipse%20cx=%2760%27%20cy=%2786%27%20rx=%2718%27%20ry=%277%27%20fill=%27url%28%23oy%29%27%2F%3E%0A%3Cpath%20d=%27M44%2084%20Q50%2089%2056%2084%27%20fill=%27%23d0c090%27%20opacity=%27.5%27%2F%3E%0A%3Cpath%20d=%27M56%2084%20Q62%2089%2068%2084%27%20fill=%27%23d0c090%27%20opacity=%27.5%27%2F%3E%0A%3Cpath%20d=%27M68%2084%20Q74%2089%2076%2084%27%20fill=%27%23d0c090%27%20opacity=%27.5%27%2F%3E%0A%3C%21--%20Labky%20--%3E%0A%3Cellipse%20cx=%2744%27%20cy=%27140%27%20rx=%2711%27%20ry=%277%27%20fill=%27%23c07818%27%2F%3E%0A%3Cline%20x1=%2736%27%20y1=%27137%27%20x2=%2734%27%20y2=%27147%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2740%27%20y1=%27139%27%20x2=%2739%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2744%27%20y1=%27140%27%20x2=%2744%27%20y2=%27150%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2748%27%20y1=%27139%27%20x2=%2749%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cellipse%20cx=%2776%27%20cy=%27140%27%20rx=%2711%27%20ry=%277%27%20fill=%27%23c07818%27%2F%3E%0A%3Cline%20x1=%2768%27%20y1=%27137%27%20x2=%2766%27%20y2=%27147%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2772%27%20y1=%27139%27%20x2=%2771%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2776%27%20y1=%27140%27%20x2=%2776%27%20y2=%27150%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3Cline%20x1=%2780%27%20y1=%27139%27%20x2=%2781%27%20y2=%27149%27%20stroke=%27%23a06010%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%2F%3E%0A%3C%21--%20Hviezda%20z%C3%A1sluh%20--%3E%0A%3Ctext%20x=%2760%27%20y=%27128%27%20text-anchor=%27middle%27%20font-size=%2714%27%20fill=%27%23d4af37%27%20filter=%27url%28%23og%29%27%3E%E2%98%85%3C%2Ftext%3E%0A%3C%21--%20Hviezdi%C4%8Dky%20--%3E%0A%3Ctext%20x=%278%27%20y=%2730%27%20font-size=%2710%27%20fill=%27%23d4af37%27%20opacity=%27.7%27%20filter=%27url%28%23og%29%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%27104%27%20y=%2724%27%20font-size=%278%27%20fill=%27%23d4af37%27%20opacity=%27.5%27%3E%E2%9C%A6%3C%2Ftext%3E%0A%3Ctext%20x=%27108%27%20y=%2744%27%20font-size=%276%27%20fill=%27%23d4af37%27%20opacity=%27.4%27%3E%C2%B7%3C%2Ftext%3E%0A%3C%2Fsvg%3E',
      unlock: 'reports_100',
      unlockValue: 100,
      desc: 'Za 100 uznaných nahlásení'
    },

    /* ============================================================
       ZÁKLADNÁ SADA (18 PNG, avatars/) – zadarmo, 3 stavy energie
       (full/tired/sleep) namiesto starých 2 (awake/sleep).
       avatarSrc() nižšie rozlišuje podľa prítomnosti `base`.
    ============================================================ */
    'studentka-tmava':  { name: 'Študentka (tmavé vlasy)',  base: 'avatars/studentka-tmava',  unlock: 'default', isBasic: true },
    'studentka-medena': { name: 'Študentka (medené vlasy)', base: 'avatars/studentka-medena', unlock: 'default', isBasic: true },
    'studentka-blond':  { name: 'Študentka (blond vlasy)',  base: 'avatars/studentka-blond',  unlock: 'default', isBasic: true },
    'student-tmavy':    { name: 'Študent (tmavé vlasy)',    base: 'avatars/student-tmavy',    unlock: 'default', isBasic: true },
    'student-medeny':   { name: 'Študent (medené vlasy)',   base: 'avatars/student-medeny',   unlock: 'default', isBasic: true },
    'student-blond':    { name: 'Študent (blond vlasy)',    base: 'avatars/student-blond',    unlock: 'default', isBasic: true }
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
    totalParagraphsEarned: (data.totalParagraphsEarned || 0) + amount,
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

  const isAdmin = (await getRole(nick)) === 'admin';
  const spent = isAdmin ? true : await spendParagrafy(AVATAR_CONFIG.FEED_COST, 'za kŕmenie avatara');
  if (!spent) return;

  const state = await loadAvatarState(nick);
  const newEnergy = AVATAR_CONFIG.FEED_ENERGY;

  await saveAvatarState(nick, {
    ...state,
    energy: newEnergy,
    lastEnergyUpdate: Date.now()
  });

  updateAvatarUI(newEnergy, state.type);
  await logTransaction(nick, {
    type: 'spend',
    amount: isAdmin ? 0 : AVATAR_CONFIG.FEED_COST,
    reason: isAdmin ? 'za kŕmenie avatara (admin zadarmo)' : 'za kŕmenie avatara',
    balanceAfter: null
  });
  showRewardToast(isAdmin ? '🍖 Avatar nakŕmený (admin zadarmo)! Energia 100%' : '🍖 Avatar nakŕmený! Energia 100%');
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
    showRewardToast(`😴 Avatar spí! Nakŕm ho za ${AVATAR_CONFIG.FEED_COST}§ aby sa prebudil.`);
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
    // Prišiel v ďalší deň — streak pokračuje (bez stropu, kvôli míľnikom napr. deň 30)
    newStreak = streak + 1;
  } else {
    // Vynechal deň
    if (shieldActive) {
      // Štít zachránil streak
      newStreak = streak + 1;
      await update(userRef, { streakShield: false });
      showRewardToast('🛡️ Štít streaku aktivovaný! Streak zachránený.');
    } else {
      // Reset streaku
      newStreak = 1;
      streakBroken = streak > 1;
    }
  }

  // Odmena – krivka so stropom: deň 1-7 podľa BASE, deň 8+ = AFTER, + prípadný míľnikový bonus
  const { BASE, AFTER, MILESTONES } = ECONOMY_CONFIG.STREAK;
  const base = newStreak <= BASE.length ? BASE[newStreak - 1] : AFTER;
  const milestone = MILESTONES[newStreak] || 0;
  const reward = base + milestone;

  await update(userRef, {
    lastLogin: now,
    loginStreak: newStreak
  });

  await awardParagrafy(reward, `za prihlásenie (deň ${newStreak})`);
  await logTransaction(nick, { type: 'award', amount: reward, reason: `streak deň ${newStreak}`, balanceAfter: null });

  // Zobraz streak info
  if (streakBroken) {
    showRewardToast(`💔 Streak prerušený. Začínaš odznova. +${reward}§`);
  } else if (milestone > 0) {
    showRewardToast(`🔥 Streak ${newStreak} dní! +${base}§ +${milestone}§ bonus!`);
  } else if (newStreak > 1) {
    showRewardToast(`🔥 Streak ${newStreak} dní! +${reward}§`);
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

  const isAdmin = (await getRole(nick)) === 'admin';
  const spent = isAdmin ? true : await spendParagrafy(AVATAR_CONFIG.STREAK_SHIELD_COST, 'za štít streaku');
  if (!spent) return;

  await update(ref(db, `users/${nick}`), { streakShield: true });
  await logTransaction(nick, {
    type: 'spend',
    amount: isAdmin ? 0 : AVATAR_CONFIG.STREAK_SHIELD_COST,
    reason: isAdmin ? 'za štít streaku (admin zadarmo)' : 'za štít streaku',
    balanceAfter: null
  });
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
      // Použi totalParagraphsEarned, ak neexistuje, fallback na aktuálny zostatok
      const totalEarned = data.totalParagraphsEarned || data.paragrafy || 0;
      if (totalEarned < avatarDef.unlockValue) {
        const chyba = avatarDef.unlockValue - totalEarned;
        showRewardToast(`🔒 Mačka je zamknutá. Chýba ti ešte ${chyba}§ (celkovo nazbieraných).`);
        return;
      }
    }
    if (avatarDef.unlock === 'reports_100') {
      const acceptedReports = data.acceptedReports || 0;
      if (acceptedReports < avatarDef.unlockValue) {
        const chyba = avatarDef.unlockValue - acceptedReports;
        showRewardToast(`🔒 Sova je zamknutá. Chýba ti ešte ${chyba} uznaných nahlásení.`);
        return;
      }
    }
  }

  const state = await loadAvatarState(nick);
  await saveAvatarState(nick, { ...state, type: avatarType });
  preloadAvatarStates(avatarDef);
  updateAvatarUI(state.energy || 100, avatarType);
  showRewardToast(`Avatar zmenený na: ${avatarDef.name}`);
}

/* ============================================================
   UI – aktualizácia avatara na stránke
============================================================ */
/* Zdroj obrázka avatara podľa energie.
   - Základná sada (def.base): 3 stavy full/tired/sleep. variant 'bust' vráti
     portrét (hlavička, rebríček – malý kruh, celá postava by bola nečitateľná
     s odseknutou hlavou), variant 'full' celú postavu (výberový modal, avatar
     sekcia).
   - Staré/obchodné avatary (def.awake/def.sleep): pôvodné 2 stavy, bust
     nemajú – variant sa ignoruje, bez zmeny správania. */
function avatarSrc(def, energy, variant = 'full') {
  if (def.base) {
    const state = energy <= 0 ? 'sleep' : energy <= 50 ? 'tired' : 'full';
    const suffix = variant === 'bust' ? '-bust' : '';
    return `${def.base}-${state}${suffix}.png`;
  }
  return energy <= AVATAR_CONFIG.SLEEP_THRESHOLD ? def.sleep : def.awake;
}

/* Pre iné moduly (napr. scripts/leaderboard.js), ktoré potrebujú bust cestu
   pre avatar ĽUBOVOĽNÉHO hráča, nielen aktuálne prihláseného. Vráti null pre
   staré/obchodné avatary bez bust verzie – volajúci použije vlastný fallback. */
export function getAvatarBustSrc(avatarType, energy) {
  const def = AVATAR_CONFIG.AVATARS[avatarType];
  if (!def || !def.base) return null;
  return avatarSrc(def, energy, 'bust');
}

/* Preloadne všetky 3 stavy základnej sady (celá postava aj bust), nech
   full→tired→sleep neblikne ani v hlavičke, ani v obchode/sekcii avatara. */
function preloadAvatarStates(def) {
  if (!def || !def.base) return;
  ['full', 'tired', 'sleep'].forEach(state => {
    new Image().src = `${def.base}-${state}.png`;
    new Image().src = `${def.base}-${state}-bust.png`;
  });
}

export function updateAvatarUI(energy, avatarType) {
  const avatarDef = AVATAR_CONFIG.AVATARS[avatarType] || AVATAR_CONFIG.AVATARS['student-f'];
  const isSleeping = energy <= AVATAR_CONFIG.SLEEP_THRESHOLD;

  // Obrázok avatara – hlavička VŽDY bust (portrét), aj pre základnú sadu
  const imgEl = document.getElementById('userAvatar');
  if (imgEl) {
    imgEl.src = avatarSrc(avatarDef, energy, 'bust');
    imgEl.alt = avatarDef.name;
    // Animácia pri spánku – len staré avatary (2 stavy); nová sada má vlastný spiaci render
    imgEl.style.filter = (!avatarDef.base && isSleeping) ? 'saturate(0.5) brightness(0.8)' : '';
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
   VRSTVENIE – taláre a zvieratká (príprava, BEZ UI)
   TODO: assety avatars/talar-{farba}.png a avatars/pet-{typ}.png
   ešte neexistujú; admin udeľovanie (kto dostane čo) bude
   samostatné zadanie. Tu len nastavíme src ak dáta existujú,
   s bezpečným zlyhaním (onerror → skryť), nech chýbajúci súbor
   nič nerozbije.
============================================================ */
export async function applyAccessories(nick) {
  const db = getDb();
  if (!db || !nick) return;

  const snap = await get(ref(db, `users/${nick}/accessories`));
  const acc = snap.exists() ? snap.val() : {};

  // POZOR: #avatarWrap img { display:block !important } (existujúce pravidlo pre
  // #userAvatar) by inak prebilo skrytie týchto vrstiev – preto setProperty(...,'important').
  const talarEl = document.getElementById('avatarTalar');
  if (talarEl) {
    if (acc.talar) {
      talarEl.onerror = () => { talarEl.style.setProperty('display', 'none', 'important'); };
      talarEl.src = `avatars/talar-${acc.talar}.png`;
      talarEl.style.setProperty('display', 'block', 'important');
    } else {
      talarEl.style.setProperty('display', 'none', 'important');
    }
  }

  const petEl = document.getElementById('avatarPet');
  if (petEl) {
    if (acc.pet) {
      petEl.onerror = () => { petEl.style.setProperty('display', 'none', 'important'); };
      petEl.src = `avatars/pet-${acc.pet}.png`;
      petEl.style.setProperty('display', 'block', 'important');
    } else {
      petEl.style.setProperty('display', 'none', 'important');
    }
  }
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
    const avatarDef = AVATAR_CONFIG.AVATARS[state.type];
    updateAvatarUI(state.energy || 100, state.type || 'student-f');
    preloadAvatarStates(avatarDef);

    // Nový nick (loadAvatarState ho práve defaultol) alebo starý typ pred
    // zavedením základnej sady – jednorazovo ponúkni výber zo 6 nových avatarov.
    if ((state.type === 'student-f' || state.type === 'student-m') &&
        typeof window.openAvatarPickerModal === 'function') {
      window.openAvatarPickerModal(true);
    }
  }

  // Taláre/zvieratká (príprava bez UI)
  applyAccessories(nick);

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
