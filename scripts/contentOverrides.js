'use strict';

/* ============================================================
   scripts/contentOverrides.js

   Firebase vrstva NAD pôvodným (read-only, statickým) data/*.json
   obsahom – rovnaký vzor ako memoryDefinitions.js biflovackaOverrides
   (Firebase prekryje zodpovedajúcu časť pri každom načítaní okruhu).

   Firebase: contentOverrides/{app}/{okruh}/{cast} = {
     app, okruh, cast, novyObsah, autor, rola, pecat, timestamp
   }
   - app: slug oblasti (AREA_SLUGS nižšie)
   - okruh: názov súboru bez prípony, napr. "A23"
   - cast: 'summary' | `quiz_${i}` | `case_${ci}_step_${si}` (i/ci/si sú
     indexy do KANONICKÉHO, nezamiešaného poľa quiz[]/cases[].steps[]
     tak, ako ho vracia normalizeOkruh() – nikdy zo zamiešaného
     zobrazenia po shuffleOptions()).
   - novyObsah: pre 'summary' { summary }, pre otázku/krok
     { question, options, correct, explanation, zdroj }.
   - rola: skutočná Firebase rola autora (users/{nick}/role), nikdy
     lokálny "view" prepínač – inak by si hocikto mohol lokálne
     nastaviť pečať 🎓.
   - pecat: true ak rola === 'garant' (garantova zmena nesie pečať,
     viditeľnú všetkým hráčom).

   Task 3 (Firebase → GitHub sync) číta z tej istej kolekcie – nič sa
   tu NEZAPISUJE do súborov v repe, to je samostatná, oddelená akcia.
============================================================ */

export const AREA_SLUGS = {
  'Pracovné právo': 'pracovne',
  'Trestné právo hmotné': 'tph',
  'Trestné právo procesné': 'tpp',
  'Občianske právo hmotné': 'ob_hmotne',
  'Občianske právo procesné': 'ob_procesne',
  'Európske právo': 'eu'
};

let fbApiPromise = null;
function fbApi() {
  if (!fbApiPromise) {
    fbApiPromise = import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");
  }
  return fbApiPromise;
}

/* Načíta všetky overridy pre daný okruh (jedno čítanie, nie N-krát
   per cast). Chýbajúca Firebase alebo chýbajúci override → {} –
   volajúci potom jednoducho zobrazí pôvodný JSON bez zmeny. */
export async function loadContentOverrides(app, okruh) {
  try {
    const db = window.db;
    if (!db || !app || !okruh) return {};
    const { ref, get } = await fbApi();
    const snap = await get(ref(db, `contentOverrides/${app}/${okruh}`));
    return snap.exists() ? snap.val() : {};
  } catch (e) {
    console.warn(`⚠️ contentOverrides: čítanie zlyhalo pre ${app}/${okruh}`, e);
    return {};
  }
}

function sealMeta(ov) {
  if (!ov || !ov.pecat) return null;
  return { type: 'garant', autor: ov.autor || '', timestamp: ov.timestamp || null };
}

/* Navrství overrides na už normalizovaný okruh (normalizeOkruh()).
   Nemutuje vstup – vracia nový objekt. Chýbajúci override pre danú
   časť necháva pôvodnú hodnotu bez zmeny (žiadny fiktívny stav). */
export function applyContentOverrides(json, overrides) {
  if (!json || !overrides || !Object.keys(overrides).length) return json;

  const result = { ...json };

  const summaryOv = overrides.summary;
  if (summaryOv && summaryOv.novyObsah && typeof summaryOv.novyObsah.summary === 'string') {
    result.summary = summaryOv.novyObsah.summary;
    result._summarySeal = sealMeta(summaryOv);
  }

  if (Array.isArray(json.quiz)) {
    result.quiz = json.quiz.map((q, i) => {
      const ov = overrides[`quiz_${i}`];
      if (!ov || !ov.novyObsah) return q;
      return { ...q, ...ov.novyObsah, _seal: sealMeta(ov) };
    });
  }

  if (Array.isArray(json.cases)) {
    result.cases = json.cases.map((c, ci) => {
      if (!Array.isArray(c.steps)) return c;
      const steps = c.steps.map((s, si) => {
        const ov = overrides[`case_${ci}_step_${si}`];
        if (!ov || !ov.novyObsah) return s;
        return { ...s, ...ov.novyObsah, _seal: sealMeta(ov) };
      });
      return { ...c, steps };
    });
  }

  return result;
}

/* Pomocník pre loadery: normalizeOkruh(raw) → navrstviť overridy.
   app = AREA_SLUGS[areaTitle], okruh = napr. "A23". */
export async function applyOverridesForOkruh(json, areaTitle, okruh) {
  const app = AREA_SLUGS[areaTitle];
  if (!app || !okruh) return json;
  const overrides = await loadContentOverrides(app, okruh);
  return applyContentOverrides(json, overrides);
}

/* Uloží/aktualizuje jeden override (admin alebo garant). `rola` musí
   byť SKUTOČNÁ Firebase rola volajúceho (users/{nick}/role) – volajúci
   kód ju musí sám overiť pred zavolaním tejto funkcie. */
export async function saveContentOverride({ app, okruh, cast, novyObsah, autor, rola }) {
  const db = window.db;
  if (!db) throw new Error('Firebase nie je dostupná – zmena sa neuložila.');
  if (!app || !okruh || !cast) throw new Error('Chýba app/okruh/cast pre uloženie zmeny.');

  const { ref, update } = await fbApi();
  const payload = {
    app, okruh, cast, novyObsah,
    autor: autor || 'Anonymous',
    rola: rola === 'garant' ? 'garant' : 'admin',
    pecat: rola === 'garant',
    timestamp: Date.now()
  };
  await update(ref(db, `contentOverrides/${app}/${okruh}/${cast}`), payload);
  return payload;
}
