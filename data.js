console.log("DATAJS NAČÍTANÝ");

/* =====================================================
   AUTO-DETEKCIA PROSTREDIA
   ===================================================== */

const IS_TEST =
  window.location.hostname.includes("vercel.app") ||
  window.location.pathname.includes("/test");

const LIVE_ROOT = "https://www.lexarena.sk/";
const BASE = IS_TEST ? LIVE_ROOT : "/";


/* =====================================================
   OBLASTI
   ===================================================== */

const areas = {
  "Trestné právo": {},
  "Občianske právo": {},
  "Pracovné právo": {},
  "Rímske právo": {},
  "Dejiny práva": {}
};


/* =====================================================
   ŠTUDIJNÉ MODULY
   ===================================================== */

const catalog = {

  "Trestné právo hmotné": {
    openExternal: BASE + "Trestné právo hmotné/",
    desc: "Kompletná TPH appka.",
    duelCount: 5
  },

  "Trestné právo procesné": {
    openExternal: BASE + "Trestné právo procesné/",
    desc: "Kompletná TPP appka.",
    duelCount: 5
  },

  "Trestné právo – spájačka": {
    openExternal: BASE + "Trestné právo - spájačka/",
    desc: "Hra na spájanie troch prvkov."
  },

  "Trestné právo – teória a prípady": {
    openExternal: BASE + "Trestné právo - teória a prípady/",
    desc: "Teória + prípady."
  },

  "Trestné právo – Veľký kvíz": {
    openExternal: BASE + "TREST Veľký KVÍZ/",
    desc: "Veľký kvíz."
  },

  "Občan – teória a veľký kvíz": {
    openExternal: BASE + "Občan - teória a veľký kvíz/",
    desc: "Teória + veľký kvíz."
  },

  "Pracovné právo": {
    openExternal: BASE + "LuluLaw duel Pracovné právo/",
    desc: "Kompletná appka pracovného práva.",
    duelCount: 5
  },

  "Občianske právo hmotné": { desc: "Modul vo vývoji." },
  "Občianske právo procesné": { desc: "Modul vo vývoji." },
  "Rímske právo": { desc: "Modul vo vývoji." }
};


/* =====================================================
   MEMORY SETS
   ===================================================== */

const memorySets = {
  "TPH-A1": [
    { id: "m1", left: "Nullum crimen sine lege", right: "Žiadny trest bez zákona" },
    { id: "m2", left: "Lex mitior", right: "Použitie miernejšieho zákona" },
    { id: "m3", left: "Subsidiarita", right: "TP len ak iné prostriedky zlyhajú" },
    { id: "m4", left: "Proporcionalita", right: "Trest primeraný závažnosti" },
    { id: "m5", left: "Preventívna funkcia", right: "Odradenie od páchateľov" },
    { id: "m6", left: "Represívna funkcia", right: "Trestanie páchateľov" },
    { id: "m7", left: "Ochranná funkcia", right: "Ochrana spoločnosti" },
    { id: "m8", left: "Časová pôsobnosť", right: "Ktorý zákon sa použije v čase činu" }
  ]
};


/* =====================================================
   PRÍPADY
   ===================================================== */

const cases = {
  "TPH-A1": [
    {
      id: "case1",
      title: "Lex mitior – krádež 2024/2025",
      text: "Páchateľ spácha krádež v roku 2024...",
      options: [
        { id: "o1", text: "Použiť zákon z roku 2024", correct: false },
        { id: "o2", text: "Použiť zákon z roku 2025 (lex mitior)", correct: true },
        { id: "o3", text: "Rozhodnúť podľa praxe", correct: false }
      ],
      reward: 2
    }
  ]
};


/* =====================================================
   FUNKCIA NA OTVORENIE EXTERNEJ APPKY + FIXNUTÝ LOADER
   ===================================================== */

catalog.openExternal = function (slug) {
  console.log("Otváram externú appku:", slug);

  // odstrániť starý loader, ak existuje
  const old = document.getElementById("globalLoader");
  if (old) old.remove();

  // vytvoriť nový loader
  const loader = document.createElement("div");
  loader.id = "globalLoader";
  loader.style = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    color: white;
    font-size: 22px;
    font-weight: 600;
  `;
  loader.textContent = "Načítavam externú aplikáciu…";
  document.body.appendChild(loader);

  // ⭐ TRIK: vynútiť reflow, aby loader vždy naskočil
  void loader.offsetHeight;

  // malé oneskorenie pre vizuálny efekt
  setTimeout(() => {
    window.location.href = slug;
  }, 200);
};
