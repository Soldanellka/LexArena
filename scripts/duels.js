/* ============================================================
   FIREBASE IMPORTY
============================================================ */
import {
  ref,
  push,
  set,
  get,
  update,
  remove,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { econAward, econEnergy, econCanPlay, ECONOMY_CONFIG } from './economy.js';
import { showRewardToast } from '../ui.js';
import { awardFacultyPoints } from './faculties.js';
import { getOkruhPercentMap } from './dashboardStats.js';
import { recordOkruhResult, PROGRESS_ACTIVITIES } from './progressTracking.js';

/* Bezpečný prístup k db */
function getDb() {
  const db = window.db;
  if (!db) {
    console.error("❌ Firebase DB (window.db) nie je inicializovaná.");
  }
  return db;
}

/* ============================================================
   VÝBER OTÁZOK PODĽA TVOJHO MODELU
============================================================ */
/* Shuffluje odpovede otázky a správne aktualizuje index správnej odpovede */
function shuffleQuestionOptions(q) {
  q = JSON.parse(JSON.stringify(q)); // deep copy
  if (!Array.isArray(q.options) || q.options.length === 0) return q;

  const correctText = (typeof q.correct === 'number')
    ? q.options[q.correct]
    : null;

  // Fisher-Yates shuffle
  for (let i = q.options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
  }

  // Aktualizuj index správnej odpovede
  if (correctText !== null) {
    const newIndex = q.options.findIndex(o => o === correctText);
    q.correct = newIndex >= 0 ? newIndex : 0;
  }

  return q;
}

/* Zoskup otázky podľa zdrojového súboru/okruhu (napr. "A1", "A23") */
function groupBySource(list) {
  const groups = {};
  (list || []).forEach(q => {
    const id = q.source;
    if (!id) return;
    if (!groups[id]) groups[id] = [];
    groups[id].push(q);
  });
  return groups;
}

/* Zoraď kľúče okruhov numericky (A1, A2, A3... A10, A11...) */
function sortedOkruhKeys(groups) {
  return Object.keys(groups).filter(k => /^A\d+$/.test(k)).sort(
    (a, b) => Number(a.replace("A", "")) - Number(b.replace("A", ""))
  );
}

/* Vytvor páry po dvoch (A1+A2, A3+A4...); nepárny posledný kľúč sa vynechá */
function buildConsecutivePairs(keys) {
  const pairs = [];
  for (let i = 0; i < keys.length - 1; i += 2) {
    pairs.push([keys[i], keys[i + 1]]);
  }
  return pairs;
}

function pickOneRandomOkruh(areaQuestions, maxPerOkruh) {
  const groups = groupBySource(areaQuestions);
  const keys = sortedOkruhKeys(groups);
  if (keys.length === 0) return { key: null, questions: [] };
  const key = keys[Math.floor(Math.random() * keys.length)];
  const qs = groups[key] || [];
  return { key, questions: maxPerOkruh ? qs.slice(0, maxPerOkruh) : qs };
}

/* Popisuje, ako sa pre danú oblasť skladá "dvojica okruhov" na jednu study session. */
function getPairStructure(areaName) {
  // 🔥 PÁROVÉ OBLASTI – páry A1+A2, A3+A4, … (rovnaký mechanizmus pre
  // Pracovné právo aj Európske právo, žiadna EÚ-špecifická vetva).
  if (areaName === "Pracovné právo" || areaName === "Európske právo") {
    return { type: "pair", pool: areaName };
  }
  if (areaName === "Trestné právo" || areaName === "Trestné právo hmotné" || areaName === "Trestné právo procesné") {
    return { type: "dual", poolA: "Trestné právo hmotné", poolB: "Trestné právo procesné" };
  }
  if (areaName === "Občianske právo" || areaName === "Občianske právo hmotné" || areaName === "Občianske právo procesné") {
    return { type: "dual", poolA: "Občianske právo hmotné", poolB: "Občianske právo procesné" };
  }
  return { type: "flat", pool: areaName };
}

export function pickQuestions(areaName) {
  const structure = getPairStructure(areaName);
  let questions = [];

  if (structure.type === "pair") {
    const all = window.areas[structure.pool] || [];
    const groups = groupBySource(all);
    const keys = sortedOkruhKeys(groups);
    const pairs = buildConsecutivePairs(keys);

    if (pairs.length === 0) {
      // Fallback: vyber náhodných 10
      questions = all.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    } else {
      const [k1, k2] = pairs[Math.floor(Math.random() * pairs.length)];
      questions = [...(groups[k1] || []), ...(groups[k2] || [])];
    }
  }

  else if (structure.type === "dual") {
    // 1 náhodný okruh z poolu A (max 5 otázok) + 1 náhodný okruh z poolu B (max 5 otázok)
    const poolA = window.areas[structure.poolA] || [];
    const poolB = window.areas[structure.poolB] || [];

    const fromA = pickOneRandomOkruh(poolA, 5);
    const fromB = pickOneRandomOkruh(poolB, 5);

    console.log(`🔥 ${areaName}: ${structure.poolA} okruh ${fromA.key}, ${structure.poolB} okruh ${fromB.key}`);
    questions = [...fromA.questions, ...fromB.questions];
  }

  // 🔥 Ostatné oblasti – fallback
  else {
    const all = window.areas[areaName] || [];
    questions = all.slice().sort(()=>Math.random()-0.5).slice(0,10);
  }

  // 🔥 Shuffluj odpovede každej otázky
  return questions.map(q => shuffleQuestionOptions(q));
}

/* ============================================================
   VÝBER DVOJICE OKRUHOV PRE CELÚ STUDY SESSION
   (pojednávanie + kartičky + prípady čerpajú z tej istej dvojice)
============================================================ */
async function filterKeysByMode(keys, mode, nick, poolAreaName) {
  if (mode === "random") return keys;
  // Bez nicku niet čo čítať z Firebase – správaj sa, akoby mal každý okruh 0 %
  // (rovnaké ako čerstvo prihlásený študent bez histórie).
  const pctMap = nick ? await getOkruhPercentMap(nick, poolAreaName, keys) : {};
  const wantStudied = mode === "studied";
  return keys.filter(k => {
    const pct = pctMap[k] ?? 0;
    return wantStudied ? pct >= 80 : pct < 30;
  });
}

/*
  mode: 'random' (🎲, default) | 'studied' (📗 ≥80 %) | 'unstudied' (📕 <30 %)
  Vráti { keys, questions, usedFallback, empty }.
  Ak filtrovaná množina pre zvolený režim vyjde prázdna, potichu spadne
  na náhodný výber z celej množiny (usedFallback = true) – volajúci si
  môže zobraziť hlásku a použiť vrátenú dvojicu ako náhradu za "🎲".
  empty = true len ak dvojicu nejde zostaviť vôbec (napr. oblasť bez dát).
*/
export async function pickOkruhPair(areaName, mode = "random", nick = null) {
  const structure = getPairStructure(areaName);

  if (structure.type === "pair") {
    const groups = groupBySource(window.areas[structure.pool] || []);
    const allKeys = sortedOkruhKeys(groups);
    let pairs = buildConsecutivePairs(allKeys);
    let usedFallback = false;

    if (mode !== "random" && pairs.length) {
      const okKeys = new Set(await filterKeysByMode(allKeys, mode, nick, structure.pool));
      const filteredPairs = pairs.filter(([k1, k2]) => okKeys.has(k1) && okKeys.has(k2));
      if (filteredPairs.length) pairs = filteredPairs;
      else usedFallback = true;
    }

    if (!pairs.length) return { keys: [], sources: [], questions: [], usedFallback: true, empty: true };

    const [k1, k2] = pairs[Math.floor(Math.random() * pairs.length)];
    const questions = [...(groups[k1] || []), ...(groups[k2] || [])].map(shuffleQuestionOptions);
    return {
      keys: [k1, k2],
      // { area, key } páry – rovnaká oblasť pre oba, source kľúče sú tu unikátne.
      sources: [{ area: structure.pool, key: k1 }, { area: structure.pool, key: k2 }],
      questions,
      usedFallback,
      empty: false
    };
  }

  if (structure.type === "dual") {
    const groupsA = groupBySource(window.areas[structure.poolA] || []);
    const groupsB = groupBySource(window.areas[structure.poolB] || []);
    let keysA = sortedOkruhKeys(groupsA);
    let keysB = sortedOkruhKeys(groupsB);
    let usedFallback = false;

    if (mode !== "random" && keysA.length && keysB.length) {
      const filteredA = await filterKeysByMode(keysA, mode, nick, structure.poolA);
      const filteredB = await filterKeysByMode(keysB, mode, nick, structure.poolB);
      if (filteredA.length && filteredB.length) {
        keysA = filteredA;
        keysB = filteredB;
      } else {
        usedFallback = true;
      }
    }

    if (!keysA.length || !keysB.length) return { keys: [], sources: [], questions: [], usedFallback: true, empty: true };

    const kA = keysA[Math.floor(Math.random() * keysA.length)];
    const kB = keysB[Math.floor(Math.random() * keysB.length)];
    const questions = [...(groupsA[kA] || []).slice(0, 5), ...(groupsB[kB] || []).slice(0, 5)].map(shuffleQuestionOptions);
    return {
      keys: [kA, kB],
      // 🔥 DÔLEŽITÉ: hmotné aj procesné majú vlastné A1..A30/A40/A45 súbory
      // s ROVNAKÝMI source kľúčmi (napr. "A15" existuje v oboch) – filtrovanie
      // kartičiek/prípadov MUSÍ vedieť, z ktorého konkrétneho poolu kľúč je,
      // inak by zlúčenie zobralo obsah oboch okruhov naraz (krížová kontaminácia).
      sources: [{ area: structure.poolA, key: kA }, { area: structure.poolB, key: kB }],
      questions,
      usedFallback,
      empty: false
    };
  }

  // flat fallback (neznáme/iné oblasti) – bez párovania, ako pôvodný random-10
  const all = window.areas[structure.pool] || [];
  const questions = all.slice().sort(() => Math.random() - 0.5).slice(0, 10).map(shuffleQuestionOptions);
  const uniqKeys = [...new Set(questions.map(q => q.source).filter(Boolean))];
  return {
    keys: uniqKeys,
    sources: uniqKeys.map(key => ({ area: structure.pool, key })),
    questions,
    usedFallback: false,
    empty: questions.length === 0
  };
}

/* ============================================================
   HLAVNÁ FUNKCIA – SPUSTENIE DUELOVÉHO KVÍZU (TVORBA VÝZVY)
============================================================ */
/* ============================================================
   ČAKANIE NA NAČÍTANIE OTÁZOK (asynchrónne z data.js)
============================================================ */
export function waitForQuestions(areaName) {
  return new Promise((resolve) => {
    const areasToCheck = areaName === "Trestné právo"
      ? ["Trestné právo hmotné", "Trestné právo procesné"]
      : areaName === "Občianske právo"
        ? ["Občianske právo hmotné", "Občianske právo procesné"]
        : [areaName];

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      const ready = areasToCheck.every(a =>
        window.areasLoaded && window.areasLoaded[a]
      );
      if (ready) {
        clearInterval(timer);
        resolve();
      }
      if (attempts > 100) { // 10 sekúnd max
        clearInterval(timer);
        console.warn("⚠️ Otázky sa nenačítali včas pre:", areaName);
        resolve();
      }
    }, 100);
  });
}

/*
  precomputedPair: voliteľná dvojica okruhov, ktorú si už vybral výber
  oblasti (mode picker 🎲/📗/📕) pre celú study session – ak je k dispozícii,
  znovu sa NEROLUJE náhodne (pojednávanie musí čerpať z tej istej dvojice
  ako kartičky/prípady). Bez nej sa správa presne ako predtým.
*/
export async function startDuel(areaName, precomputedPair = null) {
  console.log("🔥 startDuel() – štartujem duel pre oblasť:", areaName);

  const canPlay = await econCanPlay('duel');
  if (!canPlay) return;

  // 🔥 Počkaj kým sú otázky načítané (TPH a TPP prídu asynchrónne)
  await waitForQuestions(areaName);

  if (!areaName) {
    console.warn("⚠️ Oblasť neexistuje.");
    return;
  }

  const selected = (precomputedPair && Array.isArray(precomputedPair.questions) && precomputedPair.questions.length)
    ? precomputedPair.questions
    : pickQuestions(areaName);

  console.log("🔥 Vybrané otázky:", selected);

  if (!selected.length) {
    console.warn(`⚠️ Oblasť "${areaName}" zatiaľ nemá dostatok otázok.`);
    showRewardToast('📚 Táto oblasť zatiaľ nemá dostatok otázok. Skús inú oblasť alebo to skús neskôr.');
    return;
  }

  const nick = localStorage.getItem("playerNick") || "Unknown";

  // 🔥 OPRAVA: uložíme duel aj pre prvého hráča
  window.currentDuel = {
    id: null,
    from: nick,
    areaTitle: areaName,
    questions: selected
  };

  window.currentDuelMeta = window.currentDuel;
  window.duelQuestions = selected;
  window.currentOpponent = null;

  if (typeof window.startDuelQuiz === "function") {
    window.startDuelQuiz(selected);
  } else {
    console.error("❌ startDuelQuiz() neexistuje!");
  }
}

/* ============================================================
   ULOŽENIE VÝZVY DO FIREBASE (PRVÝ HRÁČ)
============================================================ */
export function saveDuel(from, areaTitle, questions) {
  const db = getDb();
  if (!db) return;

  const duelRef = push(ref(db, "duels"));
  const duelId = duelRef.key;

  const duelData = {
    id: duelId,
    from,
    areaTitle,
    questions,
    created: Date.now(),
    expiresIn: 86400,
    status: "pending",
    result: null
  };

  set(duelRef, duelData);
  update(ref(db, `users/${from}/duels/${duelId}`), duelData);

  // 🔥 OPRAVA: uložíme meta aj lokálne
  window.currentDuel.id = duelId;
  window.currentDuelMeta = window.currentDuel;

  console.log("🔥 Duel uložený do Firebase:", duelId);
}

/* ============================================================
   SKÓRE, PARAGRAFY, REBRÍČEK
============================================================ */
function computeScoreFromQuestions(questions = []) {
  return questions.reduce((sum, q) => {
    if (typeof q.correct === "number" &&
        typeof q.selectedIndex === "number" &&
        q.selectedIndex === q.correct) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

/* ============================================================
   ATRIBÚCIA OTÁZKA → OKRUH (Fáza 2, bod 0)
   Zoskupí zodpovedané otázky podľa (_area, source) a pre KAŽDÝ okruh
   zapíše najlepší % kvízu/duelu. _area (napr. "Trestné právo procesné")
   je nutná – hmotné aj procesné majú vlastné A1..A30/A40/A45 súbory
   s ROVNAKÝMI source kľúčmi, takže bez nej by sa dva rôzne okruhy
   omylom zliali do jedného.
============================================================ */
function tallyOkruhScores(questions) {
  const buckets = {};
  (questions || []).forEach(q => {
    const area = q._area || null;
    const source = q.source || null;
    if (!area || !source) return;
    const key = area + '::' + source;
    if (!buckets[key]) buckets[key] = { area, source, correct: 0, total: 0 };
    buckets[key].total++;
    if (typeof q.correct === 'number' && typeof q.selectedIndex === 'number' && q.selectedIndex === q.correct) {
      buckets[key].correct++;
    }
  });
  return Object.values(buckets);
}

function recordDuelOkruhProgress(nick, questions) {
  if (!nick) return;
  tallyOkruhScores(questions).forEach(({ area, source, correct, total }) => {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    recordOkruhResult(nick, area, source, PROGRESS_ACTIVITIES.QUIZ, pct);
  });
}

function updateLeaderboardWithResult(nick, score, isWin) {
  const db = getDb();
  if (!db || !nick) return;

  const playerRef = ref(db, `leaderboard/${nick}`);

  onValue(playerRef, (snap) => {
    const data = snap.val();

    if (!data) {
      set(playerRef, {
        nick,
        duels: 1,
        wins: isWin ? 1 : 0,
        points: score,
        lastUpdate: Date.now()
      });
    } else {
      update(playerRef, {
        duels: (data.duels || 0) + 1,
        wins: isWin ? (data.wins || 0) + 1 : (data.wins || 0),
        points: (data.points || 0) + score,
        lastUpdate: Date.now()
      });
    }
  }, { onlyOnce: true });
}

/* ============================================================
   FINÁLNE VYHODNOTENIE DUELU
============================================================ */
function finalizeDuel(duel, opponentNick, opponentQuestions) {
  const db = getDb();
  if (!db || !duel || !opponentNick || !Array.isArray(opponentQuestions)) return;

  const firstNick = duel.from;
  const areaTitle = duel.areaTitle || "Neznáma oblasť";

  const scoreA = computeScoreFromQuestions(duel.questions || []);
  const scoreB = computeScoreFromQuestions(opponentQuestions || []);

  let winner = null;
  if (scoreA > scoreB) winner = firstNick;
  else if (scoreB > scoreA) winner = opponentNick;
  else winner = "draw";

  // 🔥 § EKONOMIKA – jediná brána: economy.js
  if (winner === 'draw') {
    econAward(firstNick, ECONOMY_CONFIG.REWARDS.DUEL_DRAW, 'remíza v dueli');
    econAward(opponentNick, ECONOMY_CONFIG.REWARDS.DUEL_DRAW, 'remíza v dueli');
  } else {
    const loserNick = winner === firstNick ? opponentNick : firstNick;
    econAward(winner, ECONOMY_CONFIG.REWARDS.DUEL_WIN, 'výhra v dueli');
    econAward(loserNick, ECONOMY_CONFIG.REWARDS.DUEL_LOSS, 'prehra v dueli');
  }
  // Energia avatara za odohraný duel – len prijímateľ (tento hráč sedí za týmto
  // zariadením); tvorcovi sa energia odpočíta pri jeho vlastnom odohraní v quiz.js.
  econEnergy(opponentNick, ECONOMY_CONFIG.ENERGY.DUEL, 'odohraný duel');

  // 🔥 Rebríček
  updateLeaderboardWithResult(firstNick, scoreA, winner === firstNick);
  updateLeaderboardWithResult(opponentNick, scoreB, winner === opponentNick);

  // 🏛️ Fakulty – každé odohrané pojednávanie pripíše body fakulte hráča
  awardFacultyPoints(firstNick, scoreA);
  awardFacultyPoints(opponentNick, scoreB);

  // 📊 Osobný prehľad progresu – najlepší % kvízu per okruh (Fáza 2)
  recordDuelOkruhProgress(firstNick, duel.questions);
  recordDuelOkruhProgress(opponentNick, opponentQuestions);

  // 🔥 Uloženie výsledku
  const duelRef = ref(db, `duels/${duel.id}`);

  const resultPayload = {
    status: "finished",
    result: {
      areaTitle,
      firstPlayer: {
        nick: firstNick,
        score: scoreA
      },
      secondPlayer: {
        nick: opponentNick,
        score: scoreB
      },
      winner
    },
    finishedAt: Date.now()
  };

  update(duelRef, resultPayload);

  console.log("🔥 Duel vyhodnotený:", duel.id, resultPayload);
}

/* ============================================================
   BANKA DUELOV
============================================================ */
function loadDuelBank(callback) {
  const db = getDb();
  if (!db) return;

  const duelsRef = ref(db, "duels");

  onValue(duelsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const list = Object.values(data);
    const now = Date.now();

    const valid = list.filter(d =>
      (now - d.created) / 1000 < d.expiresIn &&
      d.status === "pending"
    );

    callback(valid);
  });
}

export function renderDuelBank() {
  const box = document.getElementById("duelBank");
  if (!box) return;

  box.innerHTML = "<p class='small muted'>Načítavam…</p>";

  const currentUser = localStorage.getItem('playerNick') || "Unknown";

  loadDuelBank((stored) => {
    box.innerHTML = "";

    if (!stored.length) {
      box.innerHTML = "<p class='small muted'>Žiadne uložené pojednávania.</p>";
      return;
    }

    const now = Date.now();

    stored.forEach((duel) => {
      const div = document.createElement("div");
      div.className = "duel-item";
      const isOwn = duel.from === currentUser;

      div.innerHTML = `
        <div class="duel-banner">
          ⚔️ <strong>${duel.from}</strong> vyzýva na pojednávanie<br>
          <span class="duel-topic">téma: <em>${duel.areaTitle}</em></span>
        </div>

        <div class="duel-header">
          <div class="duel-title">
            Výzva od: <strong>${duel.from}</strong>
          </div>
          <div class="duel-expire small muted">
            Expiruje o ${Math.ceil((duel.expiresIn - (now - duel.created) / 1000) / 60)} min
          </div>
        </div>

        <div class="duel-actions">
          ${isOwn
            ? `<button class="duel-accept duel-send">📤 Poslať</button>`
            : `<button class="duel-accept">Prijať</button>`}
          <button class="duel-reject">Odmietnuť</button>
        </div>
      `;

      const sendBtn = div.querySelector(".duel-send");
      if (sendBtn) {
        sendBtn.onclick = async () => {
          const link = `https://www.lexarena.sk/?duel=${duel.id}`;
          const message = `⚔️ ${duel.from} ťa vyzýva na pojednávanie z oblasti ${duel.areaTitle} v LexAréne! Prijmi výzvu: ${link}`;
          try {
            await navigator.clipboard.writeText(message);
            showRewardToast('Výzva skopírovaná – stačí vložiť ✅');
          } catch (e) {
            window.prompt('Skopíruj správu manuálne:', message);
          }
          if (navigator.share) {
            navigator.share({
              title: 'Výzva na pojednávanie – LexArena',
              text: message,
              url: link
            }).catch(() => {});
          }
        };
      }

      const acceptBtn = div.querySelector(".duel-accept:not(.duel-send)");
      if (acceptBtn) {
        acceptBtn.onclick = async () => {
          const canPlay = await econCanPlay('duel');
          if (!canPlay) return;

          // 🔥 OPRAVA: správny nick hráča
          window.currentUser = currentUser;

          window.currentDuelId = duel.id;
          window.currentDuelMeta = duel;
          window.currentDuel = duel;
          window.duelQuestions = duel.questions;
          window.currentOpponent = duel.from;

          if (typeof window.startDuelQuiz === "function") {
            window.startDuelQuiz(duel.questions);
          } else {
            console.error("❌ startDuelQuiz() neexistuje!");
          }

          // 🔥 § za prijatie výzvy (energia sa odpočíta až po odohraní duelu)
          econAward(currentUser, ECONOMY_CONFIG.REWARDS.CHALLENGE_EXISTING, 'za prijatie výzvy');

          const db = getDb();
          if (db) {
            update(ref(db, `duels/${duel.id}`), { status: "accepted", acceptedBy: currentUser });
          }
        };
      }

      div.querySelector(".duel-reject").onclick = () => {
        const db = getDb();
        if (!db) return;

        remove(ref(db, `duels/${duel.id}`));
        renderDuelBank();
      };

      box.appendChild(div);
    });
  });
}

/* ============================================================
   🔴 PULZUJÚCI ODZNAK NA TLAČIDLE "Uložené výzvy"
   Sleduje počet duelov so statusom "pending" (a ešte
   nevypršaných) a podľa toho pridá/odoberie pulzovanie +
   číslo na tlačidlo, aby si návštevník hneď všimol, že
   čakajú nejaké výzvy.
============================================================ */
export function watchDuelBankBadge() {
  const db = getDb();
  if (!db) return;

  const btn = document.getElementById('toggleDuelBankBtn');
  if (!btn) {
    console.warn('⚠️ toggleDuelBankBtn sa nenašiel – pulzujúci odznak sa nedá pripojiť.');
    return;
  }

  if (getComputedStyle(btn).position === 'static') {
    btn.style.position = 'relative';
  }

  let badge = btn.querySelector('.duel-bank-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'duel-bank-badge';
    btn.appendChild(badge);
  }

  const duelsRef = ref(db, 'duels');
  onValue(duelsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const now = Date.now();

    const pendingCount = Object.values(data).filter(d =>
      d && d.status === 'pending' &&
      d.created && d.expiresIn &&
      (now - d.created) / 1000 < d.expiresIn
    ).length;

    if (pendingCount > 0) {
      badge.textContent = pendingCount > 9 ? '9+' : String(pendingCount);
      badge.style.display = 'flex';
      btn.classList.add('has-pending-duels');
    } else {
      badge.style.display = 'none';
      btn.classList.remove('has-pending-duels');
    }
  });
}

/* ============================================================
   COMPLETE DUEL
============================================================ */
window.completeDuel = function(opponentQuestions){
  const duel = window.currentDuelMeta || window.currentDuel || null;

  const opponentNick = localStorage.getItem('playerNick') || "Unknown";
  window.currentUser = opponentNick;

  if (!duel || !Array.isArray(opponentQuestions)) {
    console.error("❌ completeDuel() – chýba duel alebo otázky sú neplatné.");
    return;
  }

  finalizeDuel(duel, opponentNick, opponentQuestions);

  // 🔥 Odmena za prijatie výzvy cez zdieľateľný link (?duel=ID)
  const pending = window.__pendingChallengeReward;
  if (pending && pending.nick === opponentNick) {
    awardChallengeLinkReward(pending);
    window.__pendingChallengeReward = null;
  }
};

/* ============================================================
   ODMENA ZA PRIJATIE VÝZVY CEZ LINK
   +7§ nový hráč (nick ešte neexistoval v users/) / +1§ existujúci hráč.
   Ochrana proti opakovanému čerpaniu: duels/{id}/challengeClaimed/{nick}.
============================================================ */
async function awardChallengeLinkReward({ duelId, nick, isNewPlayer }) {
  const db = getDb();
  if (!db || !duelId || !nick) return;

  const claimedRef = ref(db, `duels/${duelId}/challengeClaimed/${nick}`);
  const already = await get(claimedRef);
  if (already.exists()) return;

  await set(claimedRef, true);
  const amount = isNewPlayer ? ECONOMY_CONFIG.REWARDS.CHALLENGE_NEW : ECONOMY_CONFIG.REWARDS.CHALLENGE_EXISTING;
  await econAward(nick, amount, isNewPlayer ? 'za prvý duel z výzvy 🎉' : 'za prijatie výzvy cez link');
}

/* ============================================================
   EXPORTY
============================================================ */
window.saveDuel = saveDuel;
window.renderDuelBank = renderDuelBank;
window.startDuel = startDuel;
window.watchDuelBankBadge = watchDuelBankBadge;
