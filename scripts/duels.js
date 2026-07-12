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

export function pickQuestions(areaName) {
  let questions = [];

  // 🔥 PRACOVNÉ PRÁVO – páry A1+A2, A3+A4, …
  // Súbory sú A1-A53, párujeme po dvoch.
  // Ak je nepárny počet (napr. A53 bez páru), posledný sa vynechá.
  if (areaName === "Pracovné právo") {
    const all = window.areas["Pracovné právo"];

    // Zoskup otázky podľa zdrojového súboru (A1, A2, A3...)
    const groups = {};
    all.forEach(q => {
      const id = q.source; // napr. "A1", "A23"
      if (!groups[id]) groups[id] = [];
      groups[id].push(q);
    });

    // Zoraď kľúče numericky (A1, A2, A3... A10, A11...)
    const keys = Object.keys(groups).filter(k => /^A\d+$/.test(k)).sort(
      (a, b) => Number(a.replace("A","")) - Number(b.replace("A",""))
    );

    // Vytvor páry (A1+A2, A3+A4...)
    const pairs = [];
    for (let i = 0; i < keys.length - 1; i += 2) {
      const k1 = keys[i];
      const k2 = keys[i + 1];
      if (groups[k1] && groups[k2]) {
        pairs.push([...groups[k1], ...groups[k2]]);
      }
    }

    if (pairs.length === 0) {
      // Fallback: vyber náhodných 10
      questions = all.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    } else {
      const chosen = pairs[Math.floor(Math.random() * pairs.length)];
      questions = chosen;
    }
  }

  // 🔥 TRESTNÉ PRÁVO – 1 náhodný A.json z TPH (5 otázok) + 1 náhodný A.json z TPP (5 otázok)
  // Každý A.json obsahuje presne 5 otázok (okruh).
  else if (areaName === "Trestné právo" || areaName === "Trestné právo hmotné" || areaName === "Trestné právo procesné") {

    function pickOneFile(areaQuestions) {
      // Zoskup podľa source (A1, A2... A30)
      const groups = {};
      areaQuestions.forEach(q => {
        const id = q.source;
        if (!groups[id]) groups[id] = [];
        groups[id].push(q);
      });

      // Zoraď numericky a vyber náhodný okruh
      const keys = Object.keys(groups)
        .filter(k => /^A\d+$/.test(k))
        .sort((a, b) => Number(a.replace("A","")) - Number(b.replace("A","")));

      if (keys.length === 0) return [];
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return groups[randomKey] || [];
    }

    const tph = window.areas["Trestné právo hmotné"] || [];
    const tpp = window.areas["Trestné právo procesné"] || [];

    const fromTPH = pickOneFile(tph); // 1 náhodný okruh z TPH (5 otázok)
    const fromTPP = pickOneFile(tpp); // 1 náhodný okruh z TPP (5 otázok)

    console.log(`🔥 Trestné: TPH okruh ${fromTPH[0]?.source}, TPP okruh ${fromTPP[0]?.source}`);
    questions = [...fromTPH, ...fromTPP];
  }

  // 🔥 OBČIANSKE PRÁVO – 1 náhodný A.json z hmotného (5 otázok) + 1 z procesného (5 otázok)
  else if (areaName === "Občianske právo" || areaName === "Občianske právo hmotné" || areaName === "Občianske právo procesné") {

    function pickOneFileOP(areaQuestions) {
      const groups = {};
      areaQuestions.forEach(q => {
        const id = q.source;
        if (!groups[id]) groups[id] = [];
        groups[id].push(q);
      });
      const keys = Object.keys(groups)
        .filter(k => /^A\d+$/.test(k))
        .sort((a, b) => Number(a.replace("A","")) - Number(b.replace("A","")));
      if (keys.length === 0) return [];
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      // Max 5 otázok z okruhu (JSON môže mať aj viac)
      return (groups[randomKey] || []).slice(0, 5);
    }

    const oph = window.areas["Občianske právo hmotné"] || [];
    const opp = window.areas["Občianske právo procesné"] || [];

    const fromOPH = pickOneFileOP(oph);
    const fromOPP = pickOneFileOP(opp);

    console.log(`⚖️ Občianske: hmotné okruh ${fromOPH[0]?.source}, procesné okruh ${fromOPP[0]?.source}`);
    questions = [...fromOPH, ...fromOPP];
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
        window.areas[a] && window.areas[a].length > 0
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

export async function startDuel(areaName) {
  console.log("🔥 startDuel() – štartujem duel pre oblasť:", areaName);

  const canPlay = await econCanPlay('duel');
  if (!canPlay) return;

  // 🔥 Počkaj kým sú otázky načítané (TPH a TPP prídu asynchrónne)
  await waitForQuestions(areaName);

  if (!areaName) {
    console.warn("⚠️ Oblasť neexistuje.");
    return;
  }

  const selected = pickQuestions(areaName);

  console.log("🔥 Vybrané otázky:", selected);

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
