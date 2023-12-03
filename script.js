import Quiz from "./modules/quiz.js";
import Question from "./modules/question.js";

const startbtn = document.getElementById("btn");
const quizTemplete = document.getElementById("quiz");
const startTemplete = document.querySelector(".start");
const progressElement = document.getElementById("progress");
const timer = document.getElementById("timer");
const name = document.getElementById("name");

let userName = "";

let questions = [
  new Question({
    questionText: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  }),
  new Question({
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  }),
  new Question({
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  }),
  new Question({
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  }),
  new Question({
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["break", "stop", "halt", "exit"],
    answer: "break",
  }),
];

let quiz = new Quiz(questions);

function displayQuestion() {
  if (quiz.isEnded()) {
    showScore();
  } else {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getQuestionIndex().text;
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      let choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function guess(btnid, choice) {
  let button = document.getElementById(btnid);
  button.onclick = function () {
    quiz.guess(choice);
    displayQuestion();
  };
}

function showProgress() {
  let currentQuesiton = quiz.questionIndex + 1;
  progressElement.innerHTML = `Question ${currentQuesiton} of ${quiz.questions.length}`;
}

function showScore() {
  let quizElement = document.getElementById("quiz");
  let quizComplete = `
        <h1>Quiz Completed</h1>
        <h1 id="user-name">${userName}</h1>
        <h2 id="score">Your Score : ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
        </div>
   `;
  quizElement.innerHTML = quizComplete;
}

let time = quiz.questions.length * 60;

function startTimer() {
  let quizTime = setInterval(function () {
    if (time <= 0) {
      clearInterval(quizTime);
      showScore();
    } else {
      time--;
      let sec = Math.floor(time % 60);
      let min = Math.floor(time / 60) % 60;
      sec = sec <= 9 && sec >= 0 ? "0" + sec : sec;
      min = min <= 9 && min >= 0 ? "0" + min : min;
      timer.innerHTML = `${min} : ${sec}`;
    }
  }, 1000);
}

startbtn.addEventListener("click", (e) => {
  e.preventDefault();
  userName = name.value;
  if (name.value) {
    startTimer();
    startTemplete.style.display = "none";
    quizTemplete.style.display = "block";
    displayQuestion();
  } else {
    alert("please enter your name");
  }
});

name.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    userName = name.value;
    if (name.value) {
      startTimer();
      startTemplete.style.display = "none";
      quizTemplete.style.display = "block";
      displayQuestion();
    } else {
      alert("please enter your name");
    }
  }
});
