// =====================================
// LexArena – Challenges Module
// =====================================

// Uloženie výzvy (odoslanie výzvy)
export function sendChallenge(toNick, packageId) {
  const fromNick = localStorage.getItem("playerNick") || "Hráč";

  const challenge = {
    id: crypto.randomUUID(),
    fromNick,
    toNick,
    packageId,
    status: "pending",
    createdAt: Date.now(),
    result: {
      fromScore: null,
      toScore: null,
      winner: null
    }
  };

  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  all.push(challenge);
  localStorage.setItem("challenges", JSON.stringify(all));

  return challenge;
}

// Načítanie prijatých výziev podľa tokenu v URL
export function getReceivedChallenges() {
  const token = new URLSearchParams(location.search).get("token");
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");

  if (!token) return [];
  return all.filter(ch => ch.packageId === token && ch.status === "pending");
}

// Načítanie odoslaných výziev
export function getSentChallenges() {
  const nick = localStorage.getItem("playerNick");
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  return all.filter(ch => ch.fromNick === nick);
}

// Prijatie výzvy → otvorenie duelu s balíkom v URL
export function acceptChallenge(id) {
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  const ch = all.find(c => c.id === id);
  if (!ch) return;

  ch.status = "accepted";
  localStorage.setItem("challenges", JSON.stringify(all));

  sessionStorage.setItem("activeChallengeId", id);

  // načítame balík od odosielateľa
  const pkg = JSON.parse(localStorage.getItem("duel_package_" + ch.packageId));
  if (!pkg) {
    alert("Balík pre duel sa nenašiel.");
    return;
  }

  // zakódujeme balík do URL
  const encoded = encodeURIComponent(btoa(JSON.stringify(pkg)));

  // presmerovanie do duelu
  window.location.href = `duel.html?token=${ch.packageId}&data=${encoded}`;
}

// Uloženie výsledku duelu
export function saveDuelResult(challengeId, playerScore, opponentScore) {
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  const ch = all.find(c => c.id === challengeId);
  if (!ch) return;

  ch.result.fromScore = playerScore;
  ch.result.toScore = opponentScore;
  ch.result.winner = playerScore > opponentScore ? ch.fromNick : ch.toNick;
  ch.status = "finished";

  localStorage.setItem("challenges", JSON.stringify(all));
}

// Rebríček duelov
export function getDuelLeaderboard() {
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  const finished = all.filter(ch => ch.status === "finished");

  const stats = {};
  finished.forEach(ch => {
    const winner = ch.result.winner;
    if (!stats[winner]) stats[winner] = { wins: 0 };
    stats[winner].wins++;
  });

  return Object.entries(stats)
    .map(([nick, data]) => ({ nick, wins: data.wins }))
    .sort((a, b) => b.wins - a.wins);
}

// História duelov pre aktuálneho hráča
export function getMyDuels() {
  const nick = localStorage.getItem("playerNick");
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  return all.filter(ch => ch.fromNick === nick || ch.toNick === nick);
}

// =====================================
// UI – Zobrazenie prijatých výziev
// =====================================

window.addEventListener("load", () => {
  const banner = document.getElementById("incoming-challenge");
  const acceptBtn = document.getElementById("accept-challenge");
  const ignoreBtn = document.getElementById("ignore-challenge");
  const textSlot = document.getElementById("incoming-challenge-text");

  if (!banner) return;

  const received = getReceivedChallenges();
  if (received.length === 0) {
    banner.style.display = "none";
    return;
  }

  const challenge = received[0];
  banner.style.display = "block";

  // PERSONALIZOVANÝ TEXT
  if (textSlot) {
    const from = challenge.fromNick || "Niekto";
    textSlot.textContent = `${from} ťa vyzýva na duel v LexArene!`;
  }

  acceptBtn.onclick = () => {
    acceptChallenge(challenge.id);
  };

  ignoreBtn.onclick = () => {
    banner.style.display = "none";
  };
});
