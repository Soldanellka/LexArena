'use strict';

import { normalizeOkruh } from './scripts/contentNormalize.js';
import { applyOverridesForOkruh } from './scripts/contentOverrides.js';

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
  "Občianske právo procesné": [],
  "Európske právo": []
};

/* =====================================================
   ŠTUDIJNÉ MODULY – VRÁTENÉ VŠETKY
===================================================== */

window.catalog = {
  "Pracovné právo": {
    id: "pracovne",
    openExternal: LIVE + "pracovne-pravo-app/",
    externalPath: LIVE + "LuluLaw duel Pracovné právo/data/",
    desc: "Individuálne a kolektívne pracovné právo, kvízy, kartičky a prípady."
  },

  "Trestné právo": {
    id: "trestne",
    openExternal: LIVE + "trestne-pravo-app/",
    externalPath: LIVE + "Trestné právo hmotné/data/",
    desc: "Kompletná appka trestného práva: hmotné + procesné, kvízy, kartičky a prípady."
  },

  "Občianske právo – hmotné a procesné": {
    id: "obcianske",
    openExternal: LIVE + "ob-pravo-app/",
    externalPath: LIVE + "ob-pravo-app/data/",
    desc: "Kompletná appka občianskeho práva: 40 okruhov hmotného + 45 procesného, kvízy, kartičky a prípady."
  },

  "Európske právo": {
    id: "eu",
    openExternal: LIVE + "eu-pravo-app/",
    externalPath: LIVE + "eu-pravo-app/data/",
    desc: "38 okruhov európskeho práva, kvízy, kartičky a prípady."
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

      const raw = await res.json();
      /* Normalizácia na jeden vnútorný tvar (summary/theory, question/q,
         explanation v 3 tvaroch, zdroj/source) – nech engine prijme
         všetky existujúce tvary JSON bez prepisovania súborov. */
      const normalized = normalizeOkruh(raw);
      /* Firebase override (admin/garant oprava) navrství sa nad pôvodný
         JSON – chýbajúci override alebo nedostupná Firebase necháva
         pôvodný obsah bez zmeny. */
      const json = await applyOverridesForOkruh(normalized, areaTitle, file.replace('.json', ''));

      /* 🃏 Dlaždice pre memory (pojem ↔ definícia) */
      if (Array.isArray(json.tiles)) {
        json.tiles.forEach(t => {
          if (t && t.term && t.definition) {
            tiles.push({ term: t.term, definition: t.definition, source: file.replace('.json',''), _area: areaTitle, zdroj: t.zdroj || null });
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
              steps: c.steps, // už normalizované (question/explanation/zdroj na krok)
              source: file.replace('.json',''),
              /* Pôvodná (nezlúčená) oblasť tohto prípadu – niektoré výbery
                 v cases.js zlučujú viac oblastí do jedného poľa (napr.
                 "Trestné právo" = hmotné + procesné), takže areaTitle
                 parameter v renderJsonCase() by nebol spoľahlivý na
                 identifikáciu contentOverrides app slugu. */
              area: areaTitle,
              zdroj: c.zdroj || null
            });
          }
        });
      }

      if (json.quiz) {
        json.quiz.forEach((q, qi) => {
          questions.push({
            question: q.question, // už normalizované (question || q)
            options: q.options,
            correct: q.correct,
            explanation: q.explanation, // už normalizované na {correct,wrong} | null
            zdroj: q.zdroj || null,
            _seal: q._seal || null,
            /* Kanonický index v okruh.quiz[] (pred zamiešaním) + oblasť –
               potrebné pre admin/garant inline editáciu (contentOverrides
               cast kľúč quiz_{i}), keďže toto pole je zlúčené naprieč
               všetkými súbormi danej oblasti a stráca pôvodný index. */
            _quizIndex: qi,
            _area: areaTitle,
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

  /* 🏁 Príznak "načítanie dokončené" – nezávisí od počtu otázok,
     aby waitForQuestions() vedel odlíšiť "ešte sa načítava" od
     "načítané, ale zatiaľ prázdne" (napr. oblasť s čiastočne
     doplnenými JSON súbormi) a zbytočne nečakal celých 10 sekúnd. */
  window.areasLoaded = window.areasLoaded || {};
  window.areasLoaded[areaTitle] = true;

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

// Európske právo → 38 JSON (jednoúrovňové, nie hmotné/procesné)
loadJsonQuestions(
  "Európske právo",
  LIVE + "eu-pravo-app/data/",
  38
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
