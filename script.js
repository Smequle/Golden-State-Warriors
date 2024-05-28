const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "When were the Golden State Warriors Founded?",
    answers: [
      { text: "1969", correct: false },
      { text: "1937", correct: false },
      { text: "1947", correct: false },
      { text: "1946", correct: true },
    ],
  },
  {
    question: "How many wins did the Warriors have in the 2015-16 NBA season?",
    answers: [
      { text: "82", correct: false },
      { text: "47", correct: false },
      { text: "78", correct: false },
      { text: "73", correct: true },
    ],
  },
  {
    question: "When did the Golden State Warriors win their second NBA championship",
    answers: [
      { text: "1947", correct: false },
      { text: "2015", correct: false },
      { text: "1975", correct: false },
      { text: "1956", correct: true },
    ],
  },
  {
    question: "What is Stephen Curry's full name",
    answers: [
      { text: "Steph Curry", correct: false },
      { text: "Wardell Stephen Curry", correct: true},
      { text: "Stephen Wardell Curry", correct: false },
      { text: "Wardell Curry", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  var audio = new Audio("https://www.youtube.com/watch?v=aG71GES4qsc")
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
