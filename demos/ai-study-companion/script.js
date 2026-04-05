const studyInput = document.querySelector("#study-input");
const studyMode = document.querySelector("#study-mode");
const output = document.querySelector("#output");
const generateBtn = document.querySelector("#generate-btn");
const sampleBtn = document.querySelector("#sample-btn");

const samples = [
  "Machine learning is a branch of artificial intelligence that enables systems to learn patterns from data. Supervised learning uses labeled datasets to train models for prediction, while unsupervised learning finds hidden structure in unlabeled data. Evaluation metrics such as accuracy, precision, recall, and F1-score are used to assess model performance.",
  "Database normalization organizes data to reduce redundancy and improve integrity. First normal form removes repeating groups, second normal form eliminates partial dependency, and third normal form removes transitive dependency. SQL joins help combine related tables for analysis and reporting.",
  "Operating systems manage hardware resources, process scheduling, memory allocation, and file systems. Threads allow concurrent execution, while synchronization mechanisms such as locks and semaphores help prevent race conditions in shared resources."
];

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function keyTerms(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 5);

  const counts = {};
  words.forEach((word) => {
    counts[word] = (counts[word] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

function renderSummary(text) {
  const sentences = splitSentences(text).slice(0, 3);
  const keywords = keyTerms(text);
  output.innerHTML = `
    <div class="output-block">
      <h3>Summary</h3>
      <p>${sentences.join(" ")}</p>
    </div>
    <div class="output-block">
      <h3>Key Concepts</h3>
      <ul>${keywords.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function renderFlashcards(text) {
  const terms = keyTerms(text);
  output.innerHTML = `
    ${terms.map((term, index) => `
      <div class="output-block">
        <h3>Flashcard ${index + 1}</h3>
        <p><strong>Front:</strong> What is the role of ${term} in this topic?</p>
        <p><strong>Back:</strong> ${term} is one of the important concepts in the provided material and should be reviewed with examples and use cases.</p>
      </div>
    `).join("")}
  `;
}

function renderQuiz(text) {
  const sentences = splitSentences(text).slice(0, 3);
  output.innerHTML = `
    ${sentences.map((sentence, index) => `
      <div class="output-block">
        <h3>Question ${index + 1}</h3>
        <p>Based on your notes, explain this idea in your own words:</p>
        <p>${sentence}</p>
      </div>
    `).join("")}
  `;
}

function renderExplainer(text) {
  const terms = keyTerms(text);
  output.innerHTML = `
    <div class="output-block">
      <h3>Concept Guidance</h3>
      <p>This topic appears to focus on <strong>${terms.slice(0, 3).join(", ")}</strong>. A good study strategy would be to first understand the definitions, then review examples, and finally practice explaining the idea in simple language.</p>
    </div>
    <div class="output-block">
      <h3>Revision Plan</h3>
      <ul>
        <li>Read the notes once for concept familiarity.</li>
        <li>Create 3 quick examples from the material.</li>
        <li>Test yourself on the most repeated concepts.</li>
      </ul>
    </div>
  `;
}

function generateOutput() {
  const text = studyInput.value.trim();

  if (!text) {
    output.innerHTML = `<div class="output-block"><p>Please add some study content first.</p></div>`;
    return;
  }

  if (studyMode.value === "summary") renderSummary(text);
  if (studyMode.value === "flashcards") renderFlashcards(text);
  if (studyMode.value === "quiz") renderQuiz(text);
  if (studyMode.value === "explain") renderExplainer(text);
}

generateBtn.addEventListener("click", generateOutput);

sampleBtn.addEventListener("click", () => {
  const sample = samples[Math.floor(Math.random() * samples.length)];
  studyInput.value = sample;
  generateOutput();
});

generateOutput();
