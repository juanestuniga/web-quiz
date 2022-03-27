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
  