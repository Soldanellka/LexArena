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
