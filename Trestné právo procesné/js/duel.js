// duel.js
// Local duel demo helpers

function resolveDuelAsGuest(token, topicId, guestScore) {
  const challenges = JSON.parse(localStorage.getItem(LS_CHALLENGES) || "[]");
  const found = challenges.find(c => c.token === token && c.topicId === topicId);
  if (!found) {
    const pending = JSON.parse(localStorage.getItem(LS_PENDING) || "[]");
    pending.push({ token, topicId, guestScore, at: Date.now() });
    localStorage.setItem(LS_PENDING, JSON.stringify(pending));
    alert("Výzva prijatá. Výsledok uložený lokálne. Hostiteľ musí byť na tom istom zariadení, aby sa duel vyhodnotil (lokálne demo).");
    return;
  }
  if (typeof found.hostScore === "number") {
    finalizeDuel(token, topicId, found.hostScore, guestScore);
  } else {
    const pending = JSON.parse(localStorage.getItem(LS_PENDING) || "[]");
    pending.push({ token, topicId, guestScore, at: Date.now() });
    localStorage.setItem(LS_PENDING, JSON.stringify(pending));
    alert("Výsledok uložený. Hostiteľ musí dokončiť duel na svojom zariadení, aby sa duel vyhodnotil (lokálne demo).");
  }
}

function finalizeDuel(token, topicId, hostScore, guestScore) {
  let winner = null;
  if (hostScore > guestScore) winner = "host";
  else if (guestScore > hostScore) winner = "guest";
  else winner = "draw";

  if (winner === "host") {
    addCoins(10);
    alert(`Hostiteľ vyhral duel a získal 10 §. Máš teraz ${getCoins()} §.`);
  } else if (winner === "guest") {
    addCoins(10);
    alert(`Gratulujem — vyhral si duel a získal si 10 §. Máš teraz ${getCoins()} §.`);
  } else {
    alert("Duel skončil remízou. Žiadne § nepridelené.");
  }

  const results = JSON.parse(localStorage.getItem(LS_RESULTS) || "[]");
  results.push({ token, topicId, hostScore, guestScore, winner, at: Date.now() });
  localStorage.setItem(LS_RESULTS, JSON.stringify(results));
}
