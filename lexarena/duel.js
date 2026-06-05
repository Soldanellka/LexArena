// ===============================================
// LexArena — DUEL ENGINE (prijíma balíky z externých apk)
// ===============================================

// 1) Načítanie nicku hráča z LexAreny
function getPlayerNick() {
  try {
    const u = JSON.parse(localStorage.getItem("lexarena_user"));
    return u?.nick || "Hráč";
  } catch {
    return "Hráč";
  }
}

// 2) Uloženie výsledku duelu do LexAreny
function saveDuelHistory(result) {
  const key = "lexarena_duel_history";
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push(result);
  localStorage.setItem(key, JSON.stringify(arr));
}

// 3) Spustenie duelu po prijatí balíka
function startDuelFromExternalApp(pkg) {
  console.log("LexArena prijala balík:", pkg);

  const playerNick = getPlayerNick();

  // UI — zobrazíme modal výzvy
  const modal = document.getElementById("externalChallengeModal");
  const modalTitle = document.getElementById("externalChallengeTitle");
  const modalBtn = document.getElementById("externalChallengeStart");

  if (!modal) {
    console.error("Chýba modal pre výzvy v LexArene.");
    return;
  }

  modalTitle.textContent = `Výzva z externého modulu: ${pkg.topicName || "Neznámy okruh"}`;
  modal.classList.remove("hidden");

  modalBtn.onclick = () => {
    modal.classList.add("hidden");
    launchDuel(pkg, playerNick);
  };
}

// 4) Spustenie duelu (hlavná logika)
function launchDuel(pkg, playerNick) {
  console.log("Spúšťam duel v LexArene…");

  const questions = pkg.quiz || [];
  const tiles = pkg.tiles || [];
  const cases = pkg.cases || [];

  let index = 0;
  let scorePlayer = 0;
  let scoreOpponent = 0;

  const duelUI = document.getElementById("lexarenaDuelUI");
  const qText = document.getElementById("lexarenaDuelQuestion");
  const answers = document.querySelectorAll(".lexarenaDuelAnswer");
  const progress = document.getElementById("lexarenaDuelProgress");

  duelUI.classList.remove("hidden");

  function showQuestion() {
    const q = questions[index];
    qText.textContent = q.question;
    progress.textContent = `Otázka ${index + 1}/${questions.length}`;

    answers.forEach((btn, i) => {
      btn.textContent = q.answers[i];
      btn.onclick = () => handleAnswer(i);
    });
  }

  function handleAnswer(i) {
    const q = questions[index];

    if (i === q.correct) scorePlayer++;
    else scoreOpponent++;

    index++;

    if (index < questions.length) showQuestion();
    else finishDuel();
  }

  function finishDuel() {
    duelUI.classList.add("hidden");

    const resultUI = document.getElementById("lexarenaDuelResult");
    const title = document.getElementById("lexarenaDuelResultTitle");
    const scoreA = document.getElementById("lexarenaDuelScoreA");
    const scoreB = document.getElementById("lexarenaDuelScoreB");

    scoreA.textContent = `${playerNick}: ${scorePlayer}`;
    scoreB.textContent = `Súper: ${scoreOpponent}`;

    if (scorePlayer > scoreOpponent) {
      title.textContent = "Vyhral si!";
      addCoins(10); // odmena v LexArene
    } else {
      title.textContent = "Prehral si";
    }

    resultUI.classList.remove("hidden");

    // uloženie výsledku
    saveDuelHistory({
      player: playerNick,
      topic: pkg.topicName,
      scorePlayer,
      scoreOpponent,
      timestamp: Date.now()
    });
  }

  showQuestion();
}

// 5) Počúvanie na balík z externých apk
window.addEventListener("balik-prisiel", () => {
  const raw = localStorage.getItem("prijatyBalik");
  if (!raw) return;

  try {
    const pkg = JSON.parse(raw);
    startDuelFromExternalApp(pkg);
  } catch (e) {
    console.error("Chyba pri spracovaní balíka:", e);
  }
});
