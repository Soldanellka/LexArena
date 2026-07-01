/* ============================================================
   FIREBASE IMPORTY
============================================================ */
import {
  ref,
  push,
  set,
  update,
  remove,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

function pickQuestions(areaName) {
  let questions = [];

  // 🔥 PRACOVNÉ PRÁVO – páry A1+A2, A3+A4, … A49+A50
  if (areaName === "Pracovné právo") {
    const all = window.areas["Pracovné právo"];

    const groups = {};
    all.forEach(q => {
      const id = q.source.replace(".json", "");
      if (!groups[id]) groups[id] = [];
      groups[id].push(q);
    });

    const pairs = [];
    const keys = Object.keys(groups).sort(
      (a,b)=>Number(a.replace("A",""))-Number(b.replace("A",""))
    );

    for (let i = 0; i < keys.length; i += 2) {
      const k1 = keys[i];
      const k2 = keys[i+1];
      if (groups[k1] && groups[k2]) {
        pairs.push([...groups[k1], ...groups[k2]]);
      }
    }

    const chosen = pairs[Math.floor(Math.random() * pairs.length)];
    questions = chosen || [];
  }

  // 🔥 TRESTNÉ PRÁVO – 1×TPH + 1×TPP
  else if (areaName === "Trestné právo hmotné" || areaName === "Trestné právo procesné") {
    const tph = window.areas["Trestné právo hmotné"];
    const tpp = window.areas["Trestné právo procesné"];
    const pick5 = arr => arr.slice().sort(()=>Math.random()-0.5).slice(0,5);
    questions = [...pick5(tph), ...pick5(tpp)];
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
export function startDuel(areaName) {
  console.log("🔥 startDuel() – štartujem duel pre oblasť:", areaName);

  if (!areaName || !window.areas[areaName]) {
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

function awardParagrafy(nick, gain) {
  const db = getDb();
  if (!db || !nick || !gain) return;

  const userRef = ref(db, `users/${nick}`);

  onValue(userRef, (snap) => {
    const data = snap.val() || {};
    const current = data.paragrafy || 0;

    update(userRef, {
      paragrafy: current + gain,
      lastParUpdate: Date.now()
    });
  }, { onlyOnce: true });
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

  // 🔥 § EKONOMIKA
  // Výhra:  8§ (7§ výhra + 1§ odohranie)
  // Prehra: 2§ tvorca / 3§ prijímateľ (1§ prehra + 1§ odohranie [+ 1§ prijatie])
  // Remíza: 4§ tvorca / 5§ prijímateľ (3§ remíza + 1§ odohranie [+ 1§ prijatie])
  if (winner === firstNick) {
    awardParagrafy(firstNick, 8);
    awardParagrafy(opponentNick, 3);
  } else if (winner === opponentNick) {
    awardParagrafy(opponentNick, 9);
    awardParagrafy(firstNick, 2);
  } else {
    awardParagrafy(firstNick, 4);
    awardParagrafy(opponentNick, 5);
  }
  // Energia avatara -10 za odohraný duel
  if (typeof window.deductEnergy === 'function') {
    window.deductEnergy(10);
  }

  // 🔥 Rebríček
  updateLeaderboardWithResult(firstNick, scoreA, winner === firstNick);
  updateLeaderboardWithResult(opponentNick, scoreB, winner === opponentNick);

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

  loadDuelBank((stored) => {
    box.innerHTML = "";

    if (!stored.length) {
      box.innerHTML = "<p class='small muted'>Žiadne uložené duely.</p>";
      return;
    }

    const now = Date.now();

    stored.forEach((duel) => {
      const div = document.createElement("div");
      div.className = "duel-item";

      div.innerHTML = `
        <div class="duel-banner">
          ⚔️ <strong>${duel.from}</strong> vyzýva do duelu<br>
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
          <button class="duel-accept">Prijať</button>
          <button class="duel-reject">Odmietnuť</button>
        </div>
      `;

      div.querySelector(".duel-accept").onclick = () => {

        // 🔥 OPRAVA: správny nick hráča
        const currentUser = localStorage.getItem('playerNick') || "Unknown";
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

        // 🔥 +1§ za prijatie výzvy (pred hrou)
        if (typeof window.awardParagrafy === 'function') {
          window.awardParagrafy(1, 'za prijatie výzvy');
        }
        // 🔥 Energia -10 za prijatie duelu
        if (typeof window.deductEnergy === 'function') {
          window.deductEnergy(10);
        }

        const db = getDb();
        if (db) {
          update(ref(db, `duels/${duel.id}`), { status: "accepted", acceptedBy: currentUser });
        }
      };

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
};

/* ============================================================
   EXPORTY
============================================================ */
window.saveDuel = saveDuel;
window.renderDuelBank = renderDuelBank;
window.startDuel = startDuel;
window.watchDuelBankBadge = watchDuelBankBadge;
