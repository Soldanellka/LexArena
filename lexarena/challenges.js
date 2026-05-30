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
    status: "pending", // pending | accepted | finished
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

// Načítanie prijatých výziev
export function getReceivedChallenges() {
  const nick = localStorage.getItem("playerNick");
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  return all.filter(ch => ch.toNick === nick && ch.status === "pending");
}

// Načítanie odoslaných výziev
export function getSentChallenges() {
  const nick = localStorage.getItem("playerNick");
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  return all.filter(ch => ch.fromNick === nick);
}

// Prijatie výzvy → otvorenie duelu
export function acceptChallenge(id) {
  const all = JSON.parse(localStorage.getItem("challenges") || "[]");
  const ch = all.find(c => c.id === id);
  if (!ch) return;

  ch.status = "accepted";
  localStorage.setItem("challenges", JSON.stringify(all));

  // uložíme ID aktívnej výzvy pre duel
  sessionStorage.setItem("activeChallengeId", id);

  // presmerovanie do duelu
  window.location.href = "duel.html";
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
