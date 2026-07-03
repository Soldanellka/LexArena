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
   generateMemoryPackages(slug)
   Načíta A1..A{count}.json danej oblasti a z ich `quiz` poľa
   vytvorí bifľovacie balíčky:
   { id, area, source, question, correctAnswer, legalSentence,
     definition, explanation }
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

      (data.quiz || []).forEach(q => {
        if (!Array.isArray(q.options) || typeof q.correct !== 'number') return;
        const correctAnswer = q.options[q.correct];
        if (!correctAnswer) return;

        n++;
        packages.push({
          id: `${slug}_${String(n).padStart(3, '0')}`,
          area: slug,
          source: `A${i}`,
          question: q.question || '',
          correctAnswer,
          legalSentence: (q.explanation && q.explanation.correct) || correctAnswer,
          definition: correctAnswer,
          explanation: (q.explanation && q.explanation.correct) || ''
        });
      });
    } catch (e) {
      console.warn(`⚠️ Bifľovačka: chyba pri načítaní ${area.path}${file}`, e);
    }
  }

  packageCache.set(slug, packages);
  return packages;
}
