// Define an array of quiz questions
const quizQuestions = [
    {
        question: "What is Does CSS stand for?",
        options: ["Cascading Style Sheets", "Concave Sytle Sheets", "Cascading Sheet Styles", "All the above"],
        answer: 0
    },
    {
        question: "What is the correct HTML for referring to an external style sheet?",
        options: ["<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<style src='mystyle.css'>", "<css>mystyle.css</css>"],
        answer: 0
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: [ "In the <body> section", "At the end of the document", "In the <head> section", "In the <footer> section"],
        answer: 2
    },
    {
        question: "Where in an HTML document do you put the JavaScript?",
        options: ["In the <head> section", "At the end of <body> section", "At the end of the document", "In the <footer> section"],
        answer: 1
     },
       {
         question: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "function:myFunction()", "function.myFunction()"],
        answer: 1
     },
       {
        question: "How do you store and value in local storage?",
        options: ["localStorage.getItem('key')", "localStorage.getItem('value')", "localStorage.setItem('value')", "localStorage.setItem('key', 'value')"],
        answer: 3
        },
];
// Define variables
var startButton = document.getElementById("start-button");
var questionDisplay = document.getElementById("question");
var answerOptions = document.getElementById("answer");
var resultDisplay = document.getElementById("result");
var timerDisplay = document.getElementById("timer");
var submitDisplay = document.getElementById("submit");
var submitButton = document.getElementById("submit-button");
var highscoreDisplay = document.getElementById("highscore");
var scoreDisplay = document.getElementById("highscore-list");
var goBackButton = document.getElementById("go-back");
var timer;
var timeleft;
let currentQuestionIndex = 0;
let score = 0;
// hide highscore list
highscoreDisplay.style.display = "none";
//  hides submit button
submitDisplay.style.display = "none";
// add event listener to start button
startButton.addEventListener("click", function () {
    //    hide the start button
    startButton.style.display = "none";
    // sets timer
    timeleft = 60;
    timer = setInterval(updateTimer, 1000);
    // show question
    showQuestion(0);
});
// function to update timer and checks to see if times is up.. if so, end quiz
function updateTimer() {
    document.getElementById("timer").textContent = "Time Left: " + timeleft;
    if (timeleft === 0) {
        endQuiz();
    }
    else {
        timeleft--;
    }
};
//    creates funtion to show the question
function showQuestion(questionIndex) {
    var currentQuestion = quizQuestions[questionIndex];
    questionDisplay.textContent = currentQuestion.question;
    // clear answer options
    answerOptions.innerHTML = "";
    // loop through the answer options and create a button for each one

    for (let i = 0; i < currentQuestion.options.length; i++) {
        var option = document.createElement("button");
        option.classList.add("btn");
        option.textContent = currentQuestion.options[i];
        option.addEventListener("click", selectAnswer);
        answerOptions.appendChild(option);
    }
}
// function to select answer
function selectAnswer(event) {
    var selectedOption = event.target;
    var selectedAnswer = selectedOption.textContent;
    var currentQuestion = quizQuestions[currentQuestionIndex];
    // logic to see if answer is correct and display result
    if (selectedAnswer === currentQuestion.options[currentQuestion.answer]) {
        resultDisplay.textContent = "Correct!";
        score++;
    }
    else {
        resultDisplay.textContent = "Incorrect!";
        timeleft -= 10;
    }
    // increases question index
    currentQuestionIndex++;
    //  checks to see if quiz is over and shows next question.. ends quiz if no more questions

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion(currentQuestionIndex);

    }
    else {
        endQuiz();
    }
}

// function to end quiz
function endQuiz() {
    // hide question
    questionDisplay.style.display = "none";
    // hide answer options
    answerOptions.style.display = "none";
    // show score
    resultDisplay.textContent = "Your score is " + score;
    // hide timer
    timerDisplay.style.display = "none";
    // show input and button
    highscoreDisplay.style.display = "block";
    submitDisplay.style.display = "block";
}
//  save initials and score to local storage and dislay on highscore page
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    // get initials
    var initials = document.getElementById("initials").value.trim();
    if (!initials) {
        alert("Please enter your initials!")
         return;
    }
    var valueToSave = { initials, score }
    var storage = JSON.parse(localStorage.getItem("highscores")) || [];
    storage.push(valueToSave);
    localStorage.setItem("highscores", JSON.stringify(storage));
    // hide submit button
    submitDisplay.style.display = "none";
    // show highscore list
    highscoreDisplay.style.display = "block";
    //    display initials and score in highscore list
    loadHighscores();
});
// function to load highscores and display them and save to local storage
function loadHighscores() {
    var storage = JSON.parse(localStorage.getItem("highscores"));
    if (!storage) {
        return
    }
    storage.sort((elementOne, elementTwo) => elementTwo.score - elementOne.score)
    scoreDisplay.innerHTML = "";
    for (let i = 0; i < storage.length; i++) {
        var li = document.createElement("li");
        li.textContent = storage[i].initials + " - " + storage[i].score;
        scoreDisplay.appendChild(li);
    }

}

// have go back button start quiz over
goBackButton.addEventListener("click", function () {
    // show question
    questionDisplay.style.display = "block";
    // show answer options
    answerOptions.style.display = "flex";
    // hide score
    resultDisplay.textContent = "";
    // hide highscore list
    submitDisplay.style.display = "none";
    highscoreDisplay.style.display = "none";
    timerDisplay.style.display = "block";
    // reset timer
    timeleft = 60;
    // reset score
    score = 0;
    // reset current question index
    currentQuestionIndex = 0;
    // show first question
    showQuestion(0);


});

// clear button to clear highscores from local storage
var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
    localStorage.clear();
    scoreDisplay.innerHTML = "";
});

loadHighscores();