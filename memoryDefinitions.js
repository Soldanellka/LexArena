'use strict';

/* ============================================================
   memoryDefinitions.js
   Zdroj dát pre Bifľovačku (Memory Trainer).

   Jediný zoznam oblastí (MEMORY_AREAS) + generátor balíčkov
   z existujúcich JSON súborov externých appiek. Každá otázka
   z quiz[] poľa sa stáva jedným bifľovacím balíčkom.
============================================================ */

export const MEMORY_AREAS = [
  {
    name: "Pracovné právo",
    slug: "pracovne",
    path: "LuluLaw duel Pracovné právo/data/",
    count: 50
  },
  {
    name: "Trestné právo hmotné",
    slug: "tph",
    path: "Trestné právo hmotné/data/",
    count: 30
  },
  {
    name: "Trestné právo procesné",
    slug: "tpp",
    path: "Trestné právo procesné/data/",
    count: 30
  },
  {
    name: "Občianske právo hmotné",
    slug: "ob_hmotne",
    path: "ob-pravo-app/data/hmotne/",
    count: 40
  },
  {
    name: "Občianske právo procesné",
    slug: "ob_procesne",
    path: "ob-pravo-app/data/procesne/",
    count: 45
  }
];

export function getAreaBySlug(slug) {
  return MEMORY_AREAS.find(a => a.slug === slug) || null;
}

/* ============================================================
   Cache – aby sa pri opakovanej návšteve balíčky nefetchovali znova
============================================================ */
const packageCache = new Map();

/* ============================================================
   Priradenie definície k správnej odpovedi
   Otázky majú v `options[]` často len krátky pojem (napr.
   "Odborová organizácia"), nie celú definíciu. Skutočnú definíciu
   nájdeme v `tiles[]` daného súboru (term ↔ definition).
============================================================ */
function normalizeForMatch(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[.,;:!?()"'§]/g, '')
    .replace(/\s+/g, ' ');
}

function findMatchingTile(tiles, correctAnswer, question) {
  if (!Array.isArray(tiles) || !tiles.length) return null;
  const normAnswer = normalizeForMatch(correctAnswer);

  // 1. presná zhoda term ↔ correctAnswer
  let match = tiles.find(t => normalizeForMatch(t.term) === normAnswer);
  if (match) return match;

  // 2. term je súčasťou odpovede alebo naopak (len pri dostatočne dlhých pojmoch)
  match = tiles.find(t => {
    const normTerm = normalizeForMatch(t.term);
    if (normTerm.length < 4) return false;
    return normAnswer.includes(normTerm) || normTerm.includes(normAnswer);
  });
  if (match) return match;

  // 3. term sa nachádza priamo v znení otázky
  const normQuestion = normalizeForMatch(question);
  match = tiles.find(t => {
    const normTerm = normalizeForMatch(t.term);
    return normTerm.length >= 4 && normQuestion.includes(normTerm);
  });
  return match || null;
}

/* ============================================================
   generateMemoryPackages(slug)
   Načíta A1..A{count}.json danej oblasti a z ich `quiz` poľa
   vytvorí bifľovacie balíčky:
   { id, area, source, question, correctAnswer,
     definition, summary, legalSentence }

   Zobrazovacia priorita (v memoryTrainer.js / memory-trainer.html)
   je definition || summary || legalSentence – nikdy title.
   Balíčky zámerne neobsahujú `explanation` (text spätnej väzby
   z kvízu, napr. "Správne. ..."), aby sa v Bifľovačke nezobrazoval.
============================================================ */
export async function generateMemoryPackages(slug) {
  if (packageCache.has(slug)) {
    return packageCache.get(slug);
  }

  const area = getAreaBySlug(slug);
  if (!area) return [];

  const packages = [];
  let n = 0;

  for (let i = 1; i <= area.count; i++) {
    const file = `A${i}.json`;
    try {
      const res = await fetch(area.path + file);
      if (!res.ok) continue;
      const data = await res.json();
      const summary = data.summary || '';

      (data.quiz || []).forEach(q => {
        if (!Array.isArray(q.options) || typeof q.correct !== 'number') return;
        const correctAnswer = q.options[q.correct];
        if (!correctAnswer) return;

        const matchedTile = findMatchingTile(data.tiles, correctAnswer, q.question);

        n++;
        packages.push({
          id: `${slug}_${String(n).padStart(3, '0')}`,
          area: slug,
          source: `A${i}`,
          question: q.question || '',
          correctAnswer,
          definition: matchedTile ? matchedTile.definition : '',
          summary,
          legalSentence: correctAnswer
        });
      });
    } catch (e) {
      console.warn(`⚠️ Bifľovačka: chyba pri načítaní ${area.path}${file}`, e);
    }
  }

  packageCache.set(slug, packages);
  return packages;
}
