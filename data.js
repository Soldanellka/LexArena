// data.js – katalóg pre LexArenu (externé moduly)

console.log("DATAJS KOREŇ SA NAČÍTAL"); // diagnostika

/* ============================
   HLAVNÉ OBLASTI (dlaždice)
   ============================ */

const catalog = {

  "Trestné právo hmotné": {
    openExternal: "/tphmota/",
    desc: "Kompletná TPH appka (otázky, dlaždice, memory, prípady)."
  },

  "Trestné právo procesné": {
    openExternal: "/tpproces/",
    desc: "Kompletná TPP appka (zásady, otázky, prípady)."
  },

  "Trestné právo – spájačka": {
    openExternal: "/tpdlazdice/",
    desc: "Hra na spájanie troch prvkov. Ideálne na učenie pojmov."
  },

  "Trestné právo – teória a prípady": {
    openExternal: "/tppripady/",
    desc: "Teoretické vysvetlenia, prípady a praktické riešenia."
  },

  "Občan – teória a veľký kvíz": {
    openExternal: "/obcan/",
    desc: "Teória k TPH, TPP a veľký kvíz v jednej appke."
  },

  "Pracovné právo": {
    openExternal: "/pracovne/",
    desc: "Kompletná appka pracovného práva (otázky, prípady, definície)."
  },

  /* Placeholdery – zatiaľ bez externých modulov */
  "Občianske právo hmotné": {
    desc: "Základy občianskeho práva – modul vo vývoji."
  },

  "Občianske právo procesné": {
    desc: "Procesné inštitúty – modul vo vývoji."
  },

  "Rímske právo": {
    desc: "Základy rímskeho práva – modul vo vývoji."
  }
};


/* ============================
   MEMORY SETS
   ============================ */

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


/* ============================
   PRÍPADY (placeholder)
   ============================ */

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
