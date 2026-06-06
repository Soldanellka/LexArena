// ===============================
// IMPORT KVÍZU
// ===============================
import { QUIZ_QUESTIONS } from "./quiz.js";

let currentQuizIndex = 0;
let quizScore = 0;

// ===============================
// ELEMENTY
// ===============================
const questionsList = document.getElementById("questionsList");
const questionDetail = document.getElementById("questionDetail");

// ===============================
// PREPÍNANIE SEKCIÍ (A/B/C/TRAINING)
// ===============================
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    const section = tile.dataset.section;

    if (section === "QUIZ") {
      startQuiz();
      return;
    }

    loadSection(section);
  });
});

// ===============================
// NAČÍTANIE SEKCIE (A/B/C/TRAINING)
// ===============================
function loadSection(section) {
  questionsList.innerHTML = "";
  questionDetail.innerHTML = `<p class="empty-state">Vyber si otázku…</p>`;

  let data;

  if (section === "A") data = TRESTNE_A;
  if (section === "B") data = TRESTNE_B;
  if (section === "C") data = TRESTNE_C;
  if (section === "TRAINING") data = TRAINING_CASES;

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.nazov || item.otazka}`;
    li.addEventListener("click", () => renderDetail(item));
    questionsList.appendChild(li);
  });
}

// ===============================
// DETAIL OTÁZKY / PRÍPADU
// ===============================
function renderDetail(item) {
  questionDetail.innerHTML = `
    <h2>${item.nazov || item.otazka}</h2>
    <div class="detail-block">
      ${item.text || item.M || ""}
    </div>
  `;
}

// ===============================
// ===============================
// KVÍZ – LOGIKA
// ===============================
// ===============================

// Spustenie kvízu
export function startQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

// Zobrazenie otázky
function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[currentQuizIndex];

  questionDetail.innerHTML = `
    <div class="quiz-block">
      <h2>Otázka ${q.id}/200</h2>
      <p class="quiz-question">${q.otazka}</p>

      <div class="quiz-options">
        <button onclick="checkQuizAnswer('A')">A) ${q.A}</button>
        <button onclick="checkQuizAnswer('B')">B) ${q.B}</button>
        <button onclick="checkQuizAnswer('C')">C) ${q.C}</button>
      </div>
    </div>
  `;

  questionsList.innerHTML = ""; // Sidebar sa pri kvíze nepoužíva
}

// Kontrola odpovede
window.checkQuizAnswer = function(answer) {
  const q = QUIZ_QUESTIONS[currentQuizIndex];
  const correct = answer === q.spravna;

  if (correct) quizScore++;

  questionDetail.innerHTML = `
    <div class="quiz-result ${correct ? "ok" : "bad"}">
      <h2>${correct ? "Správne!" : "Nesprávne!"}</h2>
      <p>Správna odpoveď: <strong>${q.spravna}</strong></p>

      <button onclick="nextQuizQuestion()">Ďalšia otázka</button>
    </div>
  `;
};

// Ďalšia otázka
window.nextQuizQuestion = function() {
  currentQuizIndex++;

  if (currentQuizIndex >= QUIZ_QUESTIONS.length) {
    endQuiz();
  } else {
    renderQuizQuestion();
  }
};

// Koniec kvízu
function endQuiz() {
  questionDetail.innerHTML = `
    <div class="quiz-end">
      <h2>Kvíz dokončený!</h2>
      <p>Skóre: ${quizScore} / ${QUIZ_QUESTIONS.length}</p>

      <button onclick="startQuiz()">Spustiť znova</button>
    </div>
  `;
}
