// js/app.js
// Initialization, theme toggles, wallet, main orchestration
// Must be loaded after other modules

(function () {

  /* ---------------------------------------------------------
     1) Zachytávanie balíka z externej apky (LexArena ingest)
  --------------------------------------------------------- */
  const params = new URLSearchParams(window.location.search);
  const balik = params.get("balik");

  if (balik) {
    localStorage.setItem("prijatyBalik", balik);
    window.history.replaceState({}, document.title, "/");
    window.dispatchEvent(new Event("balik-prisiel"));
  }

  /* ---------------------------------------------------------
     2) Lokálne premenné (aby sa predišlo "already declared")
  --------------------------------------------------------- */
  let themeToggleBtn = null;
  let modernToggleBtn = null;
  let topicsGridEl = null;
  let coinCountEl = null;
  let playAgainBtn = null;
  let duelResultEl = null;

  const LS_COINS = "duel_coins_v1";

  /* ---------------------------------------------------------
     3) Globálne štýly
  --------------------------------------------------------- */
  function injectGlobalStyles() {
    const id = "app-global-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      :root { --primary:#7b3f5a; --on-primary:#fff; --card:#fff; --text:#241B1D; --accent:#d9a5b3; --border-subtle:#eee; }
      body.dark { background:#0f0f10; color:#fff; }
      .app-main { padding:20px; max-width:1100px; margin:0 auto; }
      .topics-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:12px; }
      .hidden { display:none !important; }
    `;
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------------
     4) Theme toggle
  --------------------------------------------------------- */
  function bindThemeToggle() {
    if (!themeToggleBtn) return;
    function setThemeIcon() {
      themeToggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    }
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      setThemeIcon();
    });
    setThemeIcon();
  }

  /* ---------------------------------------------------------
     5) Modern UI toggle
  --------------------------------------------------------- */
  function bindModernToggle() {
    if (!modernToggleBtn) return;
    function setModernState() {
      modernToggleBtn.style.opacity = document.body.classList.contains("modern-ui") ? "1" : "0.7";
    }
    modernToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("modern-ui");
      setModernState();
    });
    setModernState();
  }

  /* ---------------------------------------------------------
     6) Coins
  --------------------------------------------------------- */
  function getCoins() { return Number(localStorage.getItem(LS_COINS) || 0); }
  function addCoins(n) { const v = getCoins() + n; localStorage.setItem(LS_COINS, v); updateCoinUI(); return v; }
  function updateCoinUI() { if (coinCountEl) coinCountEl.textContent = getCoins(); }

  /* ---------------------------------------------------------
     7) Konfety
  --------------------------------------------------------- */
  function fireConfetti() {
    if (typeof confetti !== "function") return;
    const duration = 1500;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#F4DDE1","#D9A5B3","#FFFFFF","#E8C7CC"] });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#F4DDE1","#D9A5B3","#FFFFFF","#E8C7CC"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  /* ---------------------------------------------------------
     8) Debug: double-click na kartu → duel result
  --------------------------------------------------------- */
  function bindPlayAgainAndGrid() {
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        if (duelResultEl) duelResultEl.classList.add("hidden");
      });
    }

    if (!topicsGridEl) return;
    topicsGridEl.addEventListener("dblclick", (e) => {
      const card = e.target.closest(".topic-card");
      if (!card) return;
      if (duelResultEl) duelResultEl.classList.remove("hidden");
      fireConfetti();
    });
  }

  /* ---------------------------------------------------------
     9) Bezpečné načítanie tém
  --------------------------------------------------------- */
  function safeLoadTopics() {
    if (typeof loadTopics === "function") {
      try {
        loadTopics();
        return;
      } catch (err) {
        console.warn("loadTopics threw:", err);
      }
    }

    fetch("data/A1.json")
      .then(r => {
        if (!r.ok) throw new Error("A1.json not found");
        return r.json();
      })
      .then(j => {
        if (typeof renderTopics === "function") {
          renderTopics([j]);
        } else {
          console.warn("renderTopics not available to render fallback topic");
        }
      })
      .catch(() => {
        console.warn("No loadTopics and fallback A1.json failed");
      });
  }

  /* ---------------------------------------------------------
     10) UI pre externé balíky (výzvy)
  --------------------------------------------------------- */
  function showExternalChallenge(data) {
    // Toto si môžeš neskôr nahradiť vlastným modalom
    alert("Prišla výzva z externej apky:\n" + JSON.stringify(data, null, 2));
  }

  /* ---------------------------------------------------------
     11) INIT
  --------------------------------------------------------- */
  function init() {
    injectGlobalStyles();

    themeToggleBtn = document.getElementById("themeToggleBtn") || document.getElementById("themeToggle");
    modernToggleBtn = document.getElementById("modernToggleBtn") || document.getElementById("modernToggle");
    topicsGridEl = document.getElementById("topicsGrid") || document.querySelector(".topics-grid") || document.querySelector(".topics");
    coinCountEl = document.getElementById("coinCount");
    playAgainBtn = document.getElementById("playAgainBtn") || document.getElementById("playAgain");
    duelResultEl = document.getElementById("duelResult");

    if (themeToggleBtn) bindThemeToggle();
    if (modernToggleBtn) bindModernToggle();
    bindPlayAgainAndGrid();
    updateCoinUI();

    safeLoadTopics();

    /* ---------------------------------------------------------
       12) Listener na externý balík
    --------------------------------------------------------- */
    window.addEventListener("balik-prisiel", () => {
      const raw = localStorage.getItem("prijatyBalik");
      if (!raw) return;

      try {
        const data = JSON.parse(raw);
        showExternalChallenge(data);
      } catch (e) {
        console.error("Neviem spracovať balík:", e);
      }
    });
  }

  // Expose init globally so index.html can call it
  window.appInit = init;
})();
