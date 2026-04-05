const inputs = {
  cgpa: document.querySelector("#cgpa"),
  dsa: document.querySelector("#dsa"),
  communication: document.querySelector("#communication"),
  projects: document.querySelector("#projects"),
  internships: document.querySelector("#internships"),
  sql: document.querySelector("#sql")
};

const displays = {
  cgpa: document.querySelector("#cgpa-value"),
  dsa: document.querySelector("#dsa-value"),
  communication: document.querySelector("#communication-value"),
  projects: document.querySelector("#projects-value")
};

const scoreLabel = document.querySelector("#score-label");
const scoreRing = document.querySelector(".score-ring");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const recommendations = document.querySelector("#recommendations");
const predictBtn = document.querySelector("#predict-btn");

["cgpa", "dsa", "communication", "projects"].forEach((key) => {
  inputs[key].addEventListener("input", () => {
    displays[key].textContent = inputs[key].value;
  });
});

function buildRecommendations(values) {
  const items = [];
  if (values.dsa < 70) items.push("Increase DSA practice consistency and improve coding assessment readiness.");
  if (values.communication < 70) items.push("Improve interview communication and explanation clarity.");
  if (values.projects < 3) items.push("Build more end-to-end projects that can be shown in interviews.");
  if (values.cgpa < 7.5) items.push("Strengthen academic consistency to support the overall profile.");
  if (items.length === 0) {
    items.push("Maintain current momentum and prepare with mock interviews and targeted applications.");
  }
  return items;
}

function predict() {
  const values = {
    cgpa: Number(inputs.cgpa.value),
    dsa: Number(inputs.dsa.value),
    communication: Number(inputs.communication.value),
    projects: Number(inputs.projects.value),
    internships: Number(inputs.internships.value),
    sql: Number(inputs.sql.value)
  };

  let score = 0;
  score += (values.cgpa / 10) * 25;
  score += (values.dsa / 100) * 25;
  score += (values.communication / 100) * 15;
  score += Math.min(values.projects * 4, 20);
  score += values.internships;
  score += values.sql;

  score = Math.min(Math.round(score), 100);
  scoreLabel.textContent = `${score}%`;
  scoreRing.style.background = `conic-gradient(#68e1fd ${score * 3.6}deg, #6288ff ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`;

  if (score >= 80) {
    resultTitle.textContent = "High Placement Potential";
    resultCopy.textContent = "This profile looks strong and balanced for internship or placement opportunities, especially with targeted preparation.";
  } else if (score >= 60) {
    resultTitle.textContent = "Moderate Placement Potential";
    resultCopy.textContent = "This profile shows promise, but a few targeted improvements could raise the overall placement readiness significantly.";
  } else {
    resultTitle.textContent = "Growth Needed Before Peak Readiness";
    resultCopy.textContent = "The profile has a base to build on, but stronger technical preparation and clearer project evidence are needed.";
  }

  recommendations.innerHTML = buildRecommendations(values)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

predictBtn.addEventListener("click", predict);
predict();
