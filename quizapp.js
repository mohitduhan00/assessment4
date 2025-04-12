 // Quiz data
 const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Which programming language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1
  }
];

// Variables
let currentQuestion = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const retakeBtn = document.getElementById("retake");

// Load a question
function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => checkAnswer(index, currentQuiz));
    optionsEl.appendChild(button);
  });
}

// Check the selected answer
function checkAnswer(selectedIndex, currentQuiz) {
  const buttons = document.querySelectorAll(".option");

  if (selectedIndex === currentQuiz.correct) {
    buttons[selectedIndex].classList.add("correct");
    score++;
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    buttons[currentQuiz.correct].classList.add("correct");
  }

  buttons.forEach(button => button.disabled = true);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }, 1000);
}

// Show the final score
function showScore() {
  questionEl.textContent = `You scored ${score} out of ${quizData.length}!`;
  optionsEl.innerHTML = "";
  retakeBtn.style.display = "block";
}

// Retake the quiz
retakeBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  retakeBtn.style.display = "none";
  loadQuestion();
});

// Initialize the quiz
loadQuestion();