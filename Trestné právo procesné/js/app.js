// js/app.js
// Initialization, theme toggles, wallet, main orchestration
// Must be loaded after other modules

(function () {
  // Lokálne (neglobálne) premenné, aby sa predišlo "already been declared"
  let themeToggleBtn = null;
  let modernToggleBtn = null;
  let topicsGridEl = null;
  let coinCountEl = null;
  let playAgainBtn = null;
  let duelResultEl = null;

  const LS_COINS = "duel_coins_v1";

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

  function getCoins() { return Number(localStorage.getItem(LS_COINS) || 0); }
  function addCoins(n) { const v = getCoins() + n; localStorage.setItem(LS_COINS, v); updateCoinUI(); return v; }
  function updateCoinUI() { if (coinCountEl) coinCountEl.textContent = getCoins(); }

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

  function bindPlayAgainAndGrid() {
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        if (duelResultEl) duelResultEl.classList.add("hidden");
      });
    }

    if (!topicsGridEl) return;
    // dblclick to show duel result (debug)
    topicsGridEl.addEventListener("dblclick", (e) => {
      const card = e.target.closest(".topic-card");
      if (!card) return;
      if (duelResultEl) duelResultEl.classList.remove("hidden");
      fireConfetti();
    });
  }

  // Safe loader for topics: if loadTopics exists, call it; otherwise try to render topics from data files
  function safeLoadTopics() {
    if (typeof loadTopics === "function") {
      try {
        loadTopics();
        return;
      } catch (err) {
        console.warn("loadTopics threw:", err);
      }
    }

    // Fallback: try to fetch a list of topics from data folder (A1.json as minimal test)
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

  function init() {
    injectGlobalStyles();

    // support multiple possible IDs (index.html changed during debugging)
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

    // load topics and render (safe)
    safeLoadTopics();
  }

  // Expose init globally so index.html can call it
  window.appInit = init;
})();
