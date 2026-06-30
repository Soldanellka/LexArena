<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="utf-8" />
  <title>LexArena – Právna akadémia</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <!-- FONTY -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

  <!-- HLAVNÝ ŠTÝL -->
  <link rel="stylesheet" href="styles.css">

  <!-- drobné pomocné štýly pre in-tile duel (nezasahujú do pôvodného dizajnu) -->
  <style>
    /* len minimum, aby in-tile panel vyzeral korektne bez ďalších zmien */
    #incomingChallengeCard .challenge-item { padding:8px; border-radius:6px; background:var(--card-bg,#fff); margin-bottom:8px; }
    #incomingQuizPanel .btn { min-width:90px; }
    .challenge-loader { font-size:13px; color:var(--muted,#666); margin-top:6px; }
    .correct { background: rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.12); }
    .wrong { background: rgba(239,68,68,0.04); border:1px solid rgba(239,68,68,0.08); }
    #confettiCanvasWrap { position:relative; height:120px; overflow:hidden; pointer-events:none; }
  </style>
</head>

<body>
<header class="header">
  <div class="brand">
    <span class="logo-dot" aria-hidden="true"></span>
    <span>LexArena</span>

    <div id="avatarWrap" class="avatar-wrap" title="Klikni pre výber avatara" role="button" tabindex="0">
      <img id="userAvatar" src="assets/avatars/young-lawyer.svg" alt="Avatar používateľa" />
    </div>

    <div class="nick-box">
      <label for="nickname">Tvoj nick</label>
      <div class="nick-row">
        <input id="nickname" type="text" placeholder="Zadaj nick">
        <button id="saveNick">Uložiť</button>
      </div>
    </div>

    <div id="playerNickDisplay" class="player-nick-display"></div>
  </div>

    <div class="header-right">
      <div class="pill">Paragrafy: <strong id="paragrafValue">0</strong></div>

      <div class="pill small" id="premiumBadge">FREE</div>

      <button class="btn" id="themeToggleBtn" title="Prepni tému">
        <img id="themeIcon" src="assets/icons/moon.svg" alt="Prepínač témy" width="18" height="18">
      </button>

      <button class="btn" id="toggleRoleBtn">Role: student</button>
      <button class="btn" id="togglePremiumBtn">Toggle PREMIUM</button>
      
      <!-- ⭐ PIN LOGIN -->
<button class="btn" id="transferAccountBtn">Preniesť účet</button>
<button class="btn" id="loginPinBtn">Prihlásiť PINom</button>

    </div>
  </header>

  <main class="container">
 
<div id="incoming-challenge" style="display:none; padding:16px; background:#102030; color:white; margin-bottom:16px; border-radius:8px;">
    <div style="font-size:18px; font-weight:600; margin-bottom:8px;">
      Bol si vyzvaný na duel!
    </div>
    <button id="accept-challenge" class="btn btn-primary">Prijať výzvu</button>
    <button id="ignore-challenge" class="btn btn-ghost" style="margin-left:8px;">Neskôr</button>
  </div>

  <div class="left">

<!-- ⭐ ŠTUDIJNÉ MODULY -->
<div class="card section-card">
  <div style="display:flex;justify-content:space-between;align-items:center">

    <div>
      <h3 style="margin:0">Študijné moduly</h3>
      <div class="small">Samostatné moduly pre detailné štúdium</div>
    </div>

  </div>

  <div id="modulesList" class="list" style="margin-top:10px"></div>
</div>

  <!-- ⭐ REBRÍČEK DUELOV -->
  <div class="card section-card">
    <h3 style="margin:0">Rebríček duelov</h3>
    <div class="small">Najlepší hráči duelových kvízov</div>

    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="chip" onclick="updateLeaderboard('week')">Týždeň</button>
      <button class="chip" onclick="updateLeaderboard('month')">Mesiac</button>
      <button class="chip" onclick="updateLeaderboard('all')">Všetko</button>
    </div>

    <div id="duelLeaderboard" class="list" style="margin-top:10px">
      <div class="small muted">Načítavam rebríček…</div>
    </div>
  </div>

  <!-- ⭐ NAHLÁSIŤ PRÁVNU NEZROVNALOSŤ -->
  <div class="card section-card">
    <h3 style="margin:0">Nahlásiť právnu nezrovnalosť</h3>
    <div class="small">Pomôž zlepšiť právne otázky</div>
    <button class="btn btn-primary" id="reportIssueBtn" style="margin-top:10px">Otvoriť formulár</button>
  </div>

  <!-- ⭐ OBCHOD -->
  <div class="card section-card">
    <h3 style="margin:0">Obchod</h3>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn btn-primary" id="buy20">Kúpiť +20 paragrafov</button>
      <button class="btn" id="buyPremium">Kúpiť PREMIUM</button>
      <button class="btn" id="openShop" title="Otvoriť obchod" type="button">
        <img src="assets/icons/shop.svg" width="18" height="18" alt="">
      </button>
    </div>
  </div>

  <!-- ⭐ ADMIN PANEL -->
  <div class="card section-card">
    <h3 style="margin:0">Admin a garant panel</h3>
    <div id="adminPanel" class="small">Pre zobrazenie prepni rolu na garant.</div>
  </div>

</div>

<div class="right">

  <!-- ⭐ OBLASTI -->
  <div class="card section-card highlight-area">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h3 style="margin:0">Oblasti</h3>
        <div class="small">Vyber oblasť pre duelový kvíz</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <img src="assets/icons/book.svg" width="28" height="28" alt="">
        <img src="assets/icons/gavel.svg" width="28" height="28" alt="">
      </div>
    </div>

    <div id="areasList" class="list" style="margin-top:10px"></div>
  </div>

  <!-- ⭐ DUELOVÝ KVÍZ -->
  <div class="card highlight-duelquiz" id="quizCard">
    <div id="quizIntro">
      <div class="small">Duelový kvíz</div>
      <h2 id="quizTitle">Vyber oblasť do duelu</h2>
      <div class="small">Vyber oblasť a spusti kvíz. Po odohraní sa tvoja 10‑otázková výzva uloží do banky duelov.</div>

      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn btn-primary" id="startQuizBtn" disabled>Spustiť kvíz</button>
        <button class="btn btn-ghost" id="resetBtn">Zrušiť</button>
        <button class="btn" id="helpBtn" type="button">
          <img src="assets/icons/info.svg" width="18" height="18" alt="">
        </button>
      </div>
    </div>

    <div id="quizArea" style="display:none">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div class="small">Oblasť</div>
          <h3 id="areaTitle" style="margin:6px 0 0 0"></h3>
        </div>
        <div style="text-align:right">
          <div class="small">Otázka</div>
          <div id="qIndex" style="font-weight:700">1 / 10</div>
        </div>
      </div>

      <div class="question-box">
        <div class="q-text" id="qText">Text otázky</div>
        <div class="options" id="options"></div>

        <div class="footer-row">
          <div class="meta">Správne: <span id="correctCount">0</span> • Nesprávne: <span id="wrongCount">0</span></div>
          <div>
            <button class="btn btn-ghost" id="prevBtn">Predchádzajúca</button>
            <button class="btn btn-primary" id="nextBtn">Ďalšia</button>
          </div>
        </div>

        <div style="margin-top:10px">
          <div class="small">Progres</div>
          <div class="progress"><i id="progBar"></i></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ⭐ HRY A PRÍPADY -->
  <div class="card highlight-games">
    <h3 style="margin:0">Hry a prípady</h3>
    <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
      <button class="btn btn-primary" id="openMemoryBtn">Kartičky (Memory)</button>
      <button class="btn" id="openCasesBtn">Prípady z praxe</button>
    </div>
    <div class="small" style="margin-top:10px;color:var(--muted)">
      Kartičky sú krátka pamäťová hra; prípady sú interaktívne scenáre s okamžitou spätnou väzbou.
    </div>
  </div>

  <!-- ⭐ DUELOVÁ BANKA -->
  <div class="card highlight-bank">
    <h3 style="margin:0">Banka duelov</h3>
    <div class="small">Balíky otázok uložené zo študijných appiek</div>
    <div id="duelPackagesList" class="list" style="margin-top:10px"></div>
  </div>

</div>

</main>

  <!-- Memory modal -->
  <div id="memoryModal" class="avatar-modal" aria-hidden="true" style="display:none;">
    <div class="avatar-panel">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3 id="memoryTitle">Kartičky – matching</h3>
        <button class="btn" id="closeMemory">Zavrieť</button>
      </div>
      <div id="memoryBoard" style="margin-top:12px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px"></div>
      <div style="margin-top:12px"><button class="btn btn-primary" id="restartMemory">Reštartovať</button></div>
    </div>
  </div>

  <!-- Cases modal -->
  <div id="casesModal" class="avatar-modal" aria-hidden="true" style="display:none;">
    <div class="avatar-panel">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3 id="casesTitle">Prípady z praxe</h3>
        <button class="btn" id="closeCases">Zavrieť</button>
      </div>
      <div id="caseContainer" style="margin-top:12px"></div>
    </div>
  </div>

<!-- JS moduly -->
  <script src="data.js"></script>

  <!-- LexArena UI inicializácia -->

<script type="module" src="lexarena/challenges.js"></script>

  <!-- Ostatné moduly -->
  <script type="module" src="core.js"></script>
  <script type="module" src="state.js"></script>
  <script type="module" src="ui.js"></script>
  <script type="module" src="theme.js"></script>
  <script type="module" src="audio.js"></script>
  <script type="module" src="avatars.js"></script>
  <script type="module" src="areas.js"></script>
  <script type="module" src="quiz.js"></script>
  <script type="module" src="admin.js"></script>
  <script type="module" src="reports.js"></script>
  <script type="module" src="memory.js"></script>
  <script type="module" src="cases.js"></script>
  <script type="module" src="app.js"></script>
  <script type="module" src="init.js"></script>

<!-- Incoming-challenge in-tile quiz logic (NO NAVIGATION, SAFE) -->
<script>
/* --- START: Incoming challenge quiz in-tile (NO NAVIGATION) --- */
(function(){
  const listEl = document.getElementById('incomingChallengeList');
  const acceptAnyBtn = document.getElementById('acceptAnyChallenge');
  const ignoreAllBtn = document.getElementById('ignoreAllChallenges');
  const quizPanel = document.getElementById('incomingQuizPanel');
  const quizQuestionEl = document.getElementById('quizQuestion');
  const quizAnswersEl = document.getElementById('quizAnswers');
  const quizProgressEl = document.getElementById('quizProgress');
  const scoreYouEl = document.getElementById('scoreYou');
  const scoreOppEl = document.getElementById('scoreOpp');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizCloseBtn = document.getElementById('quizCloseBtn');
  const quizResultEl = document.getElementById('quizResult');
  const quizResultTitle = document.getElementById('quizResultTitle');
  const quizFinishBtn = document.getElementById('quizFinishBtn');
  const confettiWrap = document.getElementById('confettiCanvasWrap');

  let currentChallengeItem = null;
  let questions = [];
  let qIndex = 0;
  let scoreYou = 0;
  let scoreOpp = 0;

  async function fetchQuestionsForChallenge(item) {
    const url = item?.dataset?.challengeUrl;
    if (url) {
      try {
        const res = await fetch(url, {cache:'no-store'});
        if (res.ok) {
          const data = await res.json();
          return (data.questions && data.questions.slice(0,5)) || [];
        }
      } catch(e) {
        console.warn('Fetch challenge failed', e);
      }
    }
    return [];
  }

  // fallback demo questions
    return [
      { text: 'Ktoré tvrdenie je správne?', answers:['A','B','C','D'], correctIndex:0 },
      { text: 'Čo upravuje pracovné právo?', answers:['Zmluvy','Tresty','Dane','Šport'], correctIndex:0 },
      { text: 'Ktorý inštitút patrí do občianskeho práva?', answers:['Zmluva','Trest','Súd','Parlament'], correctIndex:0 },
      { text: 'Kedy vzniká zmluva?', answers:['Podpísaním','Narodením','Smrťou','Registráciou'], correctIndex:0 },
      { text: 'Čo je právna norma?', answers:['Pravidlo správania','Osoba','Budova','Doklad'], correctIndex:0 }
    ];
  }

  function renderQuestion() {
    const q = questions[qIndex];
    if (!q) return;
    if (quizQuestionEl) quizQuestionEl.textContent = q.text;
    if (!quizAnswersEl) return;
    quizAnswersEl.innerHTML = '';
    q.answers.forEach((a, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.type = 'button';
      btn.textContent = a;
      btn.dataset.index = i;
      btn.style = 'text-align:left;padding:10px';
      btn.addEventListener('click', () => onAnswerClick(i, btn));
      quizAnswersEl.appendChild(btn);
    });
    if (quizProgressEl) quizProgressEl.textContent = `Otázka ${qIndex+1}/${questions.length}`;
    if (quizNextBtn) quizNextBtn.style.display = 'none';
  }

  function onAnswerClick(selectedIndex, btn) {
    if (!quizAnswersEl) return;
    Array.from(quizAnswersEl.children).forEach(b => b.disabled = true);
    const q = questions[qIndex];
    const correct = q.correctIndex === selectedIndex;
    const opponentCorrect = typeof q.opponentCorrect !== 'undefined' ? !!q.opponentCorrect : (Math.random() < 0.5);
    if (correct) scoreYou++;
    if (opponentCorrect) scoreOpp++;
    if (correct) btn.classList.add('correct'); else btn.classList.add('wrong');
    const oppNote = document.createElement('div');
    oppNote.style = 'margin-top:8px;font-size:13px;color:var(--muted,#666)';
    oppNote.textContent = opponentCorrect ? 'Súper získal bod' : 'Súper nezískal bod';
    quizAnswersEl.appendChild(oppNote);
    if (scoreYouEl) scoreYouEl.textContent = scoreYou;
    if (scoreOppEl) scoreOppEl.textContent = scoreOpp;
    if (qIndex < questions.length - 1) {
      if (quizNextBtn) quizNextBtn.style.display = 'inline-block';
    } else {
      setTimeout(showResult, 600);
    }
  }

  function showResult() {
    const body = document.getElementById('quizBody');
    if (body) body.style.display = 'none';
    if (quizResultEl) quizResultEl.style.display = 'block';
    if (scoreYou > scoreOpp) {
      if (quizResultTitle) quizResultTitle.textContent = `Vyhrala si! ${scoreYou} : ${scoreOpp}`;
      launchConfetti();
    } else if (scoreYou < scoreOpp) {
      if (quizResultTitle) quizResultTitle.textContent = `Prehrala si ${scoreYou} : ${scoreOpp}`;
    } else {
      if (quizResultTitle) quizResultTitle.textContent = `Remíza ${scoreYou} : ${scoreOpp}`;
    }
  }

  function launchConfetti() {
    if (!confettiWrap) return;
    confettiWrap.innerHTML = '';
    const colors = ['#ff4d4f','#ffd666','#73d13d','#40a9ff','#9254de'];
    for (let i=0;i<40;i++){
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = (Math.random()*100) + '%';
      el.style.top = '-10px';
      el.style.width = (6 + Math.random()*8) + 'px';
      el.style.height = (8 + Math.random()*10) + 'px';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.opacity = 0.95;
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      el.style.borderRadius = '2px';
      el.style.transition = `transform 2s linear, top 2s linear, opacity 2s linear`;
      confettiWrap.appendChild(el);
      setTimeout(()=> {
        el.style.top = (80 + Math.random()*40) + 'px';
        el.style.transform = `translateY(0) rotate(${Math.random()*720}deg)`;
        el.style.opacity = 0.9;
      }, 20 + i*10);
      setTimeout(()=> el.remove(), 2600);
    }
  }

  async function startQuizForItem(item) {
    if (!item) return;
    currentChallengeItem = item;
    // show loader
    const loader = document.createElement('div');
    loader.className = 'challenge-loader';
    loader.textContent = ' Načítavam otázky…';
    item.appendChild(loader);

    questions = await fetchQuestionsForChallenge(item);

    loader.remove();

    if (!questions || questions.length === 0) {
      const err = document.createElement('div');
      err.style = 'margin-top:8px;color:#b91c1c;font-size:13px';
      err.textContent = 'Nepodarilo sa načítať otázky. Skús neskôr.';
      item.appendChild(err);
      setTimeout(()=> err.remove(), 4000);
      return;
    }

    qIndex = 0; scoreYou = 0; scoreOpp = 0;
    if (scoreYouEl) scoreYouEl.textContent = '0';
    if (scoreOppEl) scoreOppEl.textContent = '0';
    if (quizResultEl) quizResultEl.style.display = 'none';
    const body = document.getElementById('quizBody');
    if (body) body.style.display = 'block';
    if (quizPanel) quizPanel.style.display = 'block';
    renderQuestion();
  }

  // Delegated click handler: prevent navigation/new tab and handle accept/ignore
  document.addEventListener('click', (e) => {
    const acceptBtn = e.target.closest && e.target.closest('.accept-challenge');
    if (acceptBtn) {
      e.preventDefault(); e.stopPropagation();
      const item = acceptBtn.closest('.challenge-item');
      if (item) startQuizForItem(item);
      return;
    }

    const ignoreBtn = e.target.closest && e.target.closest('.ignore-challenge');
    if (ignoreBtn) {
      e.preventDefault(); e.stopPropagation();
      const item = ignoreBtn.closest('.challenge-item');
      if (item) item.remove();
      return;
    }

    // Prevent anchor navigation inside the challenge card
    const anchor = e.target.closest && e.target.closest('a');
    if (anchor && anchor.closest && anchor.closest('#incomingChallengeCard')) {
      e.preventDefault(); e.stopPropagation();
    }
  });

  if (acceptAnyBtn) acceptAnyBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const first = listEl && listEl.querySelector('.challenge-item .accept-challenge');
    if (first) first.click();
  });
  if (ignoreAllBtn) ignoreAllBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (listEl) listEl.innerHTML = '';
  });

  if (quizNextBtn) quizNextBtn.addEventListener('click', () => {
    qIndex++;
    renderQuestion();
  });
  if (quizCloseBtn) quizCloseBtn.addEventListener('click', () => {
    if (quizPanel) quizPanel.style.display = 'none';
  });
  if (quizFinishBtn) quizFinishBtn.addEventListener('click', () => {
    if (currentChallengeItem) currentChallengeItem.remove();
    if (quizPanel) quizPanel.style.display = 'none';
  });

  // helper to add demo challenge items (for testing)
  window.__addDemoChallenge = function(text, url) {
    if (!listEl) return;
    const wrap = document.createElement('div');
    wrap.className = 'challenge-item';
    if (url) wrap.dataset.challengeUrl = url;
    wrap.style = 'padding:8px;border-radius:6px;background:var(--card-bg,#fff);margin-bottom:8px';
    const txt = document.createElement('div');
    txt.className = 'challenge-text';
    txt.textContent = text || 'Demo výzva';
    wrap.appendChild(txt);
    const actions = document.createElement('div');
    actions.style = 'display:flex;gap:8px;margin-top:8px';
    const accept = document.createElement('button');
    accept.className = 'btn btn-primary accept-challenge';
    accept.type = 'button';
    accept.textContent = 'Prijať';
    const ignore = document.createElement('button');
    ignore.className = 'btn btn-ghost ignore-challenge';
    ignore.type = 'button';
    ignore.textContent = 'Ignorovať';
    actions.appendChild(accept);
    actions.appendChild(ignore);
    wrap.appendChild(actions);
    listEl.appendChild(wrap);
  };

  // auto-insert demo challenge if none
  document.addEventListener('DOMContentLoaded', () => {
    if (listEl && listEl.children.length === 0) {
      window.__addDemoChallenge('Jana ťa vyzvala na duel – Pracovné právo');
    }
  });

  // Ensure startDuelFromExternal triggers in-tile behavior (no new tab)
  if (window.startDuelFromExternal && typeof window.startDuelFromExternal === 'function') {
    const original = window.startDuelFromExternal;
    window.startDuelFromExternal = function() {
      const firstAccept = listEl && listEl.querySelector('.challenge-item .accept-challenge');
      if (firstAccept) {
        firstAccept.click();
        return;
      }
      try { original(); } catch(e){ console.warn('original startDuelFromExternal failed', e); }
    };
  } else {
    window.startDuelFromExternal = function() {
      const firstAccept = listEl && listEl.querySelector('.challenge-item .accept-challenge');
      if (firstAccept) firstAccept.click();
    };
  }

})();
</script>

<!-- --- END --- -->

<!-- PRESUNUTÝ A OPRAVENÝ MODULOVÝ SKRIPT -->
<script type="module">
  import { transferAccount, loginWithPin } from "./core.js";

  document.getElementById("transferAccountBtn").onclick = () => {
    transferAccount();
  };

  document.getElementById("loginPinBtn").onclick = () => {
    const pin = prompt("Zadaj PIN:");
    if (pin) loginWithPin(pin);
  };
</script>

</body>
</html>
