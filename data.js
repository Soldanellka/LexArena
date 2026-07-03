'use strict';

console.log("DATAJS NAČÍTANÝ");

/* =====================================================
   AUTO-DETEKCIA PROSTREDIA
===================================================== */

const LIVE = "https://www.lexarena.sk/";

/* =====================================================
   GLOBÁLNE OBJEKTY PRE DUELOVÝ ENGINE
===================================================== */

window.areas = {
  "Pracovné právo": [],
  "Trestné právo hmotné": [],
  "Trestné právo procesné": [],
  "Občianske právo hmotné": [],
  "Občianske právo procesné": []
};

/* =====================================================
   ŠTUDIJNÉ MODULY – VRÁTENÉ VŠETKY
===================================================== */

window.catalog = {
  "LuluLaw duel Pracovné právo": {
    id: "pracovne",
    openExternal: LIVE + "LuluLaw duel Pracovné právo/",
    externalPath: LIVE + "LuluLaw duel Pracovné právo/data/",
    desc: "Kompletná appka pracovného práva."
  },

  "Občan - teória a veľký kvíz": {
    id: "obcan",
    openExternal: LIVE + "Občan - teória a veľký kvíz/",
    externalPath: LIVE + "Občan - teória a veľký kvíz/data/",
    desc: "Veľký občiansky kvíz."
  },

  "TREST Veľký KVÍZ": {
    id: "trestvelky",
    openExternal: LIVE + "TREST Veľký KVÍZ/",
    externalPath: LIVE + "TREST Veľký KVÍZ/data/",
    desc: "Kompletný trestný kvíz."
  },

  "Trestné právo - spájačka": {
    id: "spajacka",
    openExternal: LIVE + "Trestné právo - spájačka/",
    externalPath: LIVE + "Trestné právo - spájačka/data/",
    desc: "Interaktívna spájačka."
  },

  "Trestné právo - teória a prípady": {
    id: "tppripady",
    openExternal: LIVE + "Trestné právo - teória a prípady/",
    externalPath: LIVE + "Trestné právo - teória a prípady/data/",
    desc: "Teória + prípady."
  },

  "Trestné právo hmotné": {
    id: "tph",
    openExternal: LIVE + "Trestné právo hmotné/",
    externalPath: LIVE + "Trestné právo hmotné/data/",
    desc: "Kompletná TPH appka."
  },

  "Trestné právo procesné": {
    id: "tpp",
    openExternal: LIVE + "Trestné právo procesné/",
    externalPath: LIVE + "Trestné právo procesné/data/",
    desc: "Kompletná TPP appka."
  }
};

/* =====================================================
   AUTO-LOADER JSON OTÁZOK
===================================================== */

async function loadJsonQuestions(areaTitle, folderUrl, maxFiles) {
  console.log("📥 Načítavam JSON otázky pre:", areaTitle);

  const files = Array.from({ length: maxFiles }, (_, i) => `A${i + 1}.json`);
  const questions = [];
  const tiles = [];
  const cases = [];

  for (const file of files) {
    try {
      const res = await fetch(folderUrl + file);
      if (!res.ok) continue;

      const json = await res.json();

      /* 🃏 Dlaždice pre memory (pojem ↔ definícia) */
      if (Array.isArray(json.tiles)) {
        json.tiles.forEach(t => {
          if (t && t.term && t.definition) {
            tiles.push({ term: t.term, definition: t.definition, source: file.replace('.json','') });
          }
        });
      }

      /* 📋 Prípady z praxe (jeden prípad = viac krokov) */
      if (Array.isArray(json.cases)) {
        json.cases.forEach(c => {
          if (c && Array.isArray(c.steps)) {
            cases.push({
              title: c.title || 'Prípad',
              difficulty: c.difficulty || '',
              steps: c.steps,
              source: file.replace('.json','')
            });
          }
        });
      }

      if (json.quiz) {
        json.quiz.forEach(q => {
          questions.push({
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation || null,
            /* =========================
               🔥 OPRAVA: source sa nastavuje podľa
               skutočného súboru (napr. "A23"), nie podľa
               interného json.id, ktoré môže byť v rôznych
               JSON súboroch zhodné/duplicitné a spôsobovať
               nesprávne zoskupovanie otázok do párov
               (napr. 12 otázok namiesto 10 v duely.js).
               ========================= */
            source: file.replace('.json', '')
          });
        });
      }
    } catch (e) {
      console.warn("⚠️ Chyba pri načítaní:", file);
    }
  }

  window.areas[areaTitle] = questions;
  window.areaTiles = window.areaTiles || {};
  window.areaCases = window.areaCases || {};
  window.areaTiles[areaTitle] = tiles;
  window.areaCases[areaTitle] = cases;
  console.log(`✅ ${areaTitle}: ${questions.length} otázok, ${tiles.length} dlaždíc, ${cases.length} prípadov`);
}

/* =====================================================
   NAČÍTANIE OBLASTÍ PRE DUEL
===================================================== */

// Pracovné právo → 50 JSON (A1-A50)
loadJsonQuestions(
  "Pracovné právo",
  LIVE + "LuluLaw duel Pracovné právo/data/",
  50
);

// Trestné právo hmotné → 30 JSON
loadJsonQuestions(
  "Trestné právo hmotné",
  LIVE + "Trestné právo hmotné/data/",
  30
);

// Trestné právo procesné → 30 JSON
loadJsonQuestions(
  "Trestné právo procesné",
  LIVE + "Trestné právo procesné/data/",
  30
);

// Občianske právo hmotné → 40 JSON
loadJsonQuestions(
  "Občianske právo hmotné",
  LIVE + "ob-pravo-app/data/hmotne/",
  40
);

// Občianske právo procesné → 45 JSON
loadJsonQuestions(
  "Občianske právo procesné",
  LIVE + "ob-pravo-app/data/procesne/",
  45
);

/* =====================================================
   OTVORENIE EXTERNEJ APPKY
===================================================== */

window.catalog.openExternal = function (slug) {
  console.log("Otváram externú appku:", slug);

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

  setTimeout(() => {
    window.location.href = slug;
  }, 200);
};
