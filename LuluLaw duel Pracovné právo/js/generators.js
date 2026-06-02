// generators.js
// ensureFiveQuestions, ensureTwoCases, REAL_CASES, makeStep helpers
// Depends on: shuffleArray, shortenText

const REAL_CASES = {
  "A2": [
    {
      title: "Prípad 1 – Krádež v supermarkete",
      steps: [
        { question: "Zadanie prípadu: Obvinený si v supermarkete vložil do tašky tovar v hodnote 85 € a prešiel pokladničnou zónou bez zaplatenia. Bol zadržaný SBS pracovníkom.", options: [], correct: 0 },
        { question: "Krok 1: Aký právny problém riešime?", options: ["Krádež podľa § 212 TZ", "Priestupok proti majetku", "Podvod podľa § 221 TZ"], correct: 0 },
        { question: "Krok 2: Ktoré ustanovenie sa použije?", options: ["§ 212 TZ – Krádež", "§ 213 TZ – Sprenevera", "§ 221 TZ – Podvod"], correct: 0 },
        { question: "Krok 3: Ako sa norma aplikuje na skutok?", options: ["Chýba úmysel", "Chýba objekt trestného činu", "Prisvojenie veci zmocnením je naplnené"], correct: 2 }
      ]
    },

    {
      title: "Prípad 2 – Doplnkový prípad (sprievodný)",
      steps: [
        { question: "Zadanie prípadu: Osoba opakovane kradne v malom obchode; predchádzajúce konania sú zaznamenané.", options: [], correct: 0 },
        { question: "Krok 1: Aký právny problém riešime?", options: ["Opakovaná krádež (recidíva)", "Priestupok", "Násilný trestný čin"], correct: 0 },
        { question: "Krok 2: Ktoré ustanovenie sa použije?", options: ["§ 212 TZ – Krádež", "§ 221 TZ – Podvod", "Správne ustanovenie podľa okolností"], correct: 0 },
        { question: "Krok 3: Ako sa norma aplikuje na skutok?", options: ["Skutok nie je trestný", "Skutok je trestný a ide o recidívu", "Iba priestupok"], correct: 1 }
      ]
    }
  ]
};

function ensureFiveQuestions(topic) {
  const current = Array.isArray(topic.quiz) ? topic.quiz.length : 0;
  const needed = Math.max(0, 5 - current);
  if (needed === 0) return;

  const tileTerms = (topic.tiles || []).map(t => t.term).filter(Boolean);
  const theoryPhrases = (topic.theory || []).map(t => t.heading || t.text).filter(Boolean);
  const pool = [...new Set([...tileTerms, ...theoryPhrases])].filter(Boolean);

  function sampleDistractors(excludeText, count) {
    const candidates = pool.filter(x => x && x !== excludeText);
    shuffleArray(candidates);
    return candidates.slice(0, count);
  }

  topic.quiz = topic.quiz || [];

  for (let i = 0; i < needed; i++) {
    let q = null;
    if (tileTerms.length > 0) {
      const term = tileTerms[(current + i) % tileTerms.length];
      const tileObj = (topic.tiles || []).find(t => t.term === term) || {};
      const correctDef = tileObj.definition || "Definícia nie je dostupná.";
      const distractors = sampleDistractors(term, 2);
      const options = [correctDef, ...distractors];
      while (options.length < 3) options.push("Iná definícia");
      const shuffled = shuffleArray([...options]);
      const correctIndex = shuffled.indexOf(correctDef);
      q = {
        question: `Čo znamená pojem "${term}"?`,
        options: shuffled,
        correct: correctIndex
      };
    } else if (theoryPhrases.length > 0) {
      const phrase = theoryPhrases[(current + i) % theoryPhrases.length];
      const distractors = sampleDistractors(phrase, 2);
      const options = [phrase, ...distractors];
      while (options.length < 3) options.push("Iné tvrdenie");
      const shuffled = shuffleArray([...options]);
      const correctIndex = shuffled.indexOf(phrase);
      q = {
        question: `Ktoré tvrdenie najlepšie vystihuje: "${shortenText(phrase, 80)}"?`,
        options: shuffled,
        correct: correctIndex
      };
    } else {
      q = {
        question: `Základná otázka o okruhu ${topic.id || ""}`,
        options: ["Možnosť A", "Možnosť B", "Možnosť C"],
        correct: 0
      };
    }
    topic.quiz.push(q);
  }
}

function ensureTwoCases(topic) {
  topic.cases = Array.isArray(topic.cases) ? topic.cases : [];

  if (REAL_CASES[topic.id]) {
    const real = REAL_CASES[topic.id].map(c => ensureCaseSteps(c, topic));
    const existing = topic.cases.filter(Boolean).map((c, idx) => ensureCaseSteps(c, topic, idx + 1));
    let combined = [...real, ...existing];
    while (combined.length < 2) {
      combined.push(makeGeneratedCaseForTopic(topic, combined.length + 1));
    }
    topic.cases = combined.slice(0, 2);
    return;
  }

  const existing = topic.cases.map((c, idx) => ensureCaseSteps(c, topic, idx + 1));
  const needed = Math.max(0, 2 - existing.length);
  const generated = [];
  for (let i = 0; i < needed; i++) generated.push(makeGeneratedCaseForTopic(topic, existing.length + i + 1));
  topic.cases = [...existing, ...generated].slice(0, 2);
}

function makeGeneratedCaseForTopic(topic, index) {
  const tileTerms = (topic.tiles || []).map(t => t.term).filter(Boolean);
  const tileDefs = (topic.tiles || []).map(t => t.definition).filter(Boolean);
  const theoryPhrases = (topic.theory || []).map(t => t.heading || t.text).filter(Boolean);
  const seedTerm = tileTerms[index % Math.max(1, tileTerms.length)] || `Pojem ${index}`;
  const seedDef = (topic.tiles || []).find(t => t.term === seedTerm)?.definition || tileDefs[index % Math.max(1, tileDefs.length)] || "Krátky popis situácie.";
  const title = `Prípad ${index} – ${shortenText(seedTerm, 40)}`;

  const steps = [
    { question: `Zadanie prípadu: ${seedDef}`, options: [], correct: 0 },
    makeStep(`Krok 1: Aký právny problém riešime?`, `Porušenie práva súvisiace s ${seedTerm}`, ["Procesný problém", "Administratívna záležitosť"], [...tileTerms, ...theoryPhrases]),
    makeStepForKrok2(topic, theoryPhrases, tileTerms),
    makeStep(`Krok 3: Ako sa norma aplikuje na skutok?`, `Aplikovať normu na skutkové okolnosti`, ["Neaplikovať normu", "Aplikovať inú normu"], tileDefs)
  ];
  return { title, steps };
}

function makeStepForKrok2(topic, theoryPhrases = [], tileTerms = []) {
  const poolText = [...(theoryPhrases || []), ...(tileTerms || [])].join(" ").toLowerCase();
  if (topic.id === "A2" || poolText.includes("krádež") || poolText.includes("krad") || poolText.includes("kradež")) {
    return {
      question: "Krok 2: Ktoré ustanovenie sa použije?",
      options: ["§ 212 TZ – Krádež", "§ 213 TZ – Sprenevera", "§ 221 TZ – Podvod"],
      correct: 0
    };
  }
  const theory = (theoryPhrases && theoryPhrases[0]) ? theoryPhrases[0] : "§ X Trestného zákona";
  return makeStep("Krok 2: Ktoré ustanovenie sa použije?", `Ustanovenie: ${shortenText(theory, 40)}`, ["Iné ustanovenie", "Neexistujúce ustanovenie"], theoryPhrases);
}

function makeStep(question, correctText, distractors, sourcePool = []) {
  const pool = Array.isArray(sourcePool) ? sourcePool.filter(Boolean) : [];
  const chosenDistractors = [];
  shuffleArray(pool);
  for (let p of pool) {
    if (chosenDistractors.length >= 2) break;
    if (p === correctText) continue;
    if (!chosenDistractors.includes(p)) chosenDistractors.push(p);
  }
  if (Array.isArray(distractors)) {
    for (let d of distractors) {
      if (chosenDistractors.length >= 2) break;
      if (!chosenDistractors.includes(d) && d !== correctText) chosenDistractors.push(d);
    }
  }
  const generic = ["Iná možnosť", "Neplatí", "Nesprávna voľba"];
  let gi = 0;
  while (chosenDistractors.length < 2) {
    const g = generic[gi % generic.length];
    if (!chosenDistractors.includes(g) && g !== correctText) chosenDistractors.push(g);
    gi++;
  }
  const options = [correctText, chosenDistractors[0], chosenDistractors[1]];
  const shuffled = shuffleArray([...options]);
  const correctIndex = shuffled.indexOf(correctText);
  return {
    question,
    options: shuffled,
    correct: correctIndex
  };
}

function ensureCaseSteps(caseObj, topic, index = 1) {
  const steps = Array.isArray(caseObj.steps) ? caseObj.steps.slice() : [];

  if (steps.length === 0 || (steps[0].options && steps[0].options.length > 0)) {
    const seed = (topic.tiles && topic.tiles[0]) ? topic.tiles[0].definition
               : (topic.theory && topic.theory[0] ? topic.theory[0].text : `Zadanie prípadu ${index}`);
    steps.unshift({ question: `Zadanie prípadu: ${shortenText(seed, 220)}`, options: [], correct: 0 });
  }

  const requiredLabels = [
    "Krok 1: Aký právny problém riešime?",
    "Krok 2: Ktoré ustanovenie sa použije?",
    "Krok 3: Ako sa norma aplikuje na skutok?"
  ];

  const tileTerms = (topic.tiles || []).map(t => t.term).filter(Boolean);
  const tileDefs = (topic.tiles || []).map(t => t.definition).filter(Boolean);
  const theoryPhrases = (topic.theory || []).map(t => t.heading || t.text).filter(Boolean);
  const sourcePool = [...new Set([...tileTerms, ...tileDefs, ...theoryPhrases])];

  for (let k = 0; k < requiredLabels.length; k++) {
    const stepIndex = 1 + k;
    if (!steps[stepIndex]) {
      if (k === 1) {
        steps[stepIndex] = makeStepForKrok2(topic, theoryPhrases, tileTerms);
        continue;
      }

      let correctText;
      let distractors = [];

      if (k === 0) {
        correctText = tileTerms[0] ? `Porušenie práva súvisiace s ${tileTerms[0]}` : "Porušenie práva";
        distractors = ["Procesný problém", "Administratívna záležitosť"];
      } else if (k === 2) {
        correctText = tileDefs[0] ? `Aplikovať normu na skutkové okolnosti: ${shortenText(tileDefs[0], 60)}` : "Aplikovať normu na skutkové okolnosti";
        distractors = ["Neaplikovať normu", "Aplikovať inú normu"];
      }

      steps[stepIndex] = makeStep(requiredLabels[k], correctText, distractors, sourcePool);
    }
  }

  return { title: caseObj.title || `Prípad ${index}`, steps: steps.slice(0, 1 + 3) };
}
