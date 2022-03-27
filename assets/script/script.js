/* ------- Global Variable Declarations ------- */
let quiz = document.querySelector("#quiz");
let intro = document.querySelector("#introduction");
let assesFT = document.querySelector("#assess-ft");
let progressBar = document.querySelector(".progress");
let startBtn = document.querySelector("#startBtn");
let timeSpan = document.querySelector("#timeSpan");
let questionH5 = document.querySelector("#question");
let answersDiv = document.querySelector("#answers");
let allDone = document.querySelector("#allDone");
let finalScore = document.querySelector("#finalScore");
let submit = document.querySelector("#submit");
let highScoresList = document.querySelector("#highScoresList");
let initials = document.querySelector("#initials");
let clearHighscoresBtn = document.querySelector("#clearHighscoresBtn");
let image_area = document.querySelector("#image_area");
let totalSeconds = 60;
let timeRemining = totalSeconds;
let secondsElapsed = 0;
let discountSeconds = 0;
let currentQuestion = 0;
let progress = 0;
let correctAnswers = 0;
let correctScore = 0;
var localHighscoresArray = [];
let time = setInterval(timer, 1000);
let justRegistered = false;
clearInterval(time);
/* --------------- Quiz Array --------------- */

let quizArray = [
    {
      question:
        "Inside which HTML element do we put the JavaScript?",
      options: ["<script>", "<js>", "<javascript>", "<scripting>"],
      correct: 0,
    },
    {
      question: "Where is the correct place to insert a JavaScript?",
      options: [
        "Both the <head> section and the <body> section are correct",
        "The <body> section",
        "The <head> section",
      ],
      correct: 0,
    },
    {
      question:
        "What is the correct syntax for reffereing to an external script called 'xxx.js'?",
      options: [
        "<script src='xxx.js'>",
        "<script href='xxx.js'>",
        "<script name='xxx.js'>",
      ],
      correct: 0,
    },
    {
      question: "The external JavaScript file must contain the <script> tag.",
      options: [
        "False",
        "True",
      ],
      correct: 0,
    },
    {
      question:
        "How do you call a function named myFunction?",
      options: [
        "myFunction()",
        "call function myFunction()",
        "call myFunction()",
      ],
      correct: 0,
    },
    {
      question:
        "How to write an IF statement in JavaScript?",
      options: [
        "if (i == 5)",
        "if i=5",
        "if i == 5 then",
        "if i = 5 then",
      ],
      correct: 0,
    },
    {
      question: "How does a FOR loop start?",
      options: [
          "for (i = 0; i <= 5; i++)", 
          "for i = 1 to 5", 
          "for (i <= 5; i++)", 
          "for (i = 0; i <= 5)"
      ],
      correct: 0,
    },
  ];
  /* ------------- Events Listeners ------------- */

startBtn.addEventListener("click", startQuiz);
answersDiv.addEventListener("click", assesSelection);
submit.addEventListener("click", addToHighscores);
clearHighscoresBtn.addEventListener("click", clearHighscores);
$("#staticBackdrop").on("shown.bs.modal", function (e) {
  loadHighScores();
});
$("#staticBackdrop").on("hidden.bs.modal", function (e) {
  if (justRegistered) {
    initate();
  }
});

initate();
/* ------------- Functions ------------- */

function initate() {
    timeSpan.textContent = timeRemining;
    quiz.style.display = "none";
    allDone.style.display = "none";
    assesFT.style.display = "none";
    intro.style.display = "block";
    startBtn.style.display = "block";
    progressBar.style.display = "none";
  
    totalSeconds = 60;
    timeRemining = totalSeconds;
    secondsElapsed = 0;
    discountSeconds = 0;
    currentQuestion = 0;
    progress = 0;
    correctAnswers = 0;
    correctScore = 0;
    justRegistered = false;
    timeSpan.textContent = timeRemining;
  
    if (localStorage.getItem("highscore")) {
      localHighscoresArray = localStorage.getItem("highscore").split(",");
    }
    clearInterval(time);
    updateProgress();
  
    allDone.firstElementChild.setAttribute("class", "alert alert-info mt-0 mb-0");
    submit.setAttribute("class", "btn btn-info");
    progressBar.firstElementChild.setAttribute(
      "class",
      "progress-bar bg-info progress-bar-striped progress-bar-animated"
    );
  }
  
  function startQuiz() {
    intro.style.display = "none";
    startBtn.style.display = "none";
    quiz.style.display = "block";
    time = setInterval(timer, 1000);
    progressBar.style.display = "block";
    showQuestion();
  }
  
  function timer() {
    timeRemining = totalSeconds - secondsElapsed - 1 - discountSeconds;
    timeSpan.textContent = timeRemining;
    secondsElapsed++;
    if (timeRemining <= 0) {
      clearInterval(time);
      disableQuestions();
      gameOver("time_out");
    }
  }
  
  function showQuestion() {
    questionH5.textContent = quizArray[currentQuestion].question;
    var optionsBtnsArray = [];
    var indexArray = [];
  
    for (i = 0; i < quizArray[currentQuestion].options.length; i++) {
      var questionBtn = document.createElement("button");
      questionBtn.setAttribute("type", "button");
      questionBtn.setAttribute(
        "class",
        "list-group-item list-group-item-action list-group-item-info mt-1 answerButton"
      );
      questionBtn.setAttribute("data-index", i);
      if (i === 0) {
        questionBtn.setAttribute("correct", "yes");
      } else {
        questionBtn.setAttribute("correct", "no");
      }
      questionBtn.textContent = quizArray[currentQuestion].options[i];
      answersDiv.append(questionBtn);
      indexArray.push(i);
    }
  
    answersDiv.childNodes.forEach(function (child) {
      var rndIndex = Math.floor(Math.random() * indexArray.length);
      answersDiv.append(answersDiv.children[rndIndex]);
      indexArray.splice(rndIndex, 1);
    });
  }
  
  function disableQuestions() {
    let questionsAssed = document.querySelectorAll(".answerButton");
    questionsAssed.forEach((element) => {
      element.setAttribute(
        "class",
        "list-group-item list-group-item-action list-group-item-danger mt-1 answerButton disabled"
      );
      if (
        parseInt(element.getAttribute("data-index")) ===
        quizArray[currentQuestion].correct
      ) {
        element.setAttribute(
          "class",
          "list-group-item list-group-item-action list-group-item-success mt-1 answerButton disabled"
        );
      }
    });
  }
  
  function assesSelection(event) {
    if (event.target.matches("button")) {
      var index = parseInt(event.target.getAttribute("data-index"));
      var timeInterval = 1000;
      disableQuestions();
      if (event.target.getAttribute("correct") === "yes") {
        displayFTAlert(true);
        correctAnswers++;
      } else {
        discountSeconds += 3;
        clearInterval(time);
        time = setInterval(timer, 1000);
        displayFTAlert(false);
      }
      currentQuestion++;
      updateProgress();
  
      if (currentQuestion === quizArray.length) {
        timeInterval = 5000;
        gameOver("questions_done");
      } else {
        setTimeout(removeQuestionsButtons, 1000);
        setTimeout(showQuestion, 1001);
      }
  
      setTimeout(function () {
        assesFT.style.display = "none";
      }, timeInterval);
    }
  }
  
  function updateProgress() {
    progress = Math.floor((currentQuestion / quizArray.length) * 100);
    var styleStr = String("width: " + progress + "%; height: 100%;");
    progressBar.firstElementChild.setAttribute("style", styleStr);
    progressBar.firstElementChild.textContent = progress + " %";
    correctScore = Math.floor((correctAnswers / quizArray.length) * 100);
  }
  
  function displayFTAlert(correct) {
    if (correct) {
      assesFT.setAttribute(
        "class",
        "alert alert-success mt-0 mb-0 pt-0 pb-0 text-center"
      );
      assesFT.innerHTML = "<strong>Correct</strong>";
      assesFT.style.display = "block";
    } else {
      assesFT.setAttribute(
        "class",
        "alert alert-danger mt-0 mb-0 pt-0 pb-0 text-center"
      );
      assesFT.innerHTML =
        "<strong>Incorrect. </strong> 3 secs. discounted. Keep trying!!";
      assesFT.style.display = "block";
      timeSpan.style.color = "red";
      setTimeout(function () {
        timeSpan.style.color = "black";
      }, 1000);
    }
  }
  
  function removeQuestionsButtons() {
    questionH5.textContent = "";
    var child = answersDiv.lastElementChild;
    while (child) {
      answersDiv.removeChild(child);
      child = answersDiv.lastElementChild;
    }
    while (image_area.hasChildNodes()) {
      image_area.removeChild(image_area.childNodes[0]);
    }
  }
  
  function gameOver(cause) {
    if (cause === "questions_done") {
      console.log("QUESTIONS DONE");
      setTimeout(() => {
        assesFT.setAttribute(
          "class",
          "alert alert-dark mt-0 mb-0 pt-0 pb-0 text-center"
        );
        assesFT.innerHTML = "<strong>Quiz finished</strong> Good luck!";
      }, 1500);
      clearInterval(time);
    } else if (cause === "time_out") {
      console.log("TIME OUT");
      disableQuestions();
      setTimeout(() => {
      }, 4000);
      assesFT.setAttribute(
        "class",
        "alert alert-info mt-0 mb-0 pt-0 pb-0 text-center"
      );
      assesFT.innerHTML = "<strong>Time finished</strong> Good luck!";
    } else {
      return false;
    }
    assesFT.style.display = "block";
    if (correctScore >= 70) {
      setTimeout(() => {
      }, 5000);
    } else {
      setTimeout(() => {
        allDone.firstElementChild.setAttribute(
          "class",
          "alert alert-danger mt-0 mb-0"
        );
        progressBar.firstElementChild.setAttribute(
          "class",
          "progress-bar bg-danger progress-bar-striped progress-bar-animated"
        );
        submit.setAttribute("class", "btn btn-danger");
      }, 5000);
    }
    setTimeout(function () {
      finalScore.textContent = correctScore;
      quiz.style.display = "none";
      allDone.style.display = "block";
      assesFT.style.display = "none";
      removeQuestionsButtons();
    }, 5000);
  }