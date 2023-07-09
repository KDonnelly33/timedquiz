// Define an array of quiz questions
const quizQuestions = [
    {
        question: "What is Does CSS stand for?",
        options: ["Cascading Style Sheets", "Concave Sytle Sheets", "Cascading Sheet Styles", "All the above"],
        answer: 0
    },
    {
        question: "What is the correct HTML for referring to an external style sheet?",
        options: ["<stylesheet>mystyle.css</stylesheet>", "<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<style src='mystyle.css'>", "<link href='mystyle.css'>"],
        answer: 1
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: ["In the <head> section", "In the <body> section", "At the end of the document", "In the <footer> section"],
        answer: 0
    }
    // Add more questions here
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
highscoreDisplay.style.display = "none";
submitDisplay.style.display = "none";
// when i click the start button the first question should appear
startButton.addEventListener("click", function () {
    //    hide the start button
    startButton.style.display = "none";
    // show the first question
    timeleft = 60;
    timer = setInterval(updateTimer, 1000);
    showQuestion(0);
});
// function to update timer
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
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    // logic to see if answer is correct
    if (selectedAnswer === currentQuestion.options[currentQuestion.answer]) {
        resultDisplay.textContent = "Correct!";
        score++;
    }
    else {
        resultDisplay.textContent = "Incorrect!";
        timeleft -= 10;
    }

    currentQuestionIndex++;
    //  checks to see if quiz is over and shows next question

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
    if (initials === "") {
        alert("Please enter your initials!")
        return
    }
    var valueToSave = { initials, score }
    var storage = localStorage.getItem("highscores");
    if (storage === null) {
        // save initials and score to local storage
        localStorage.setItem("highscores", JSON.stringify([valueToSave]));
        return
    }
    storage = JSON.parse(storage);
    storage.push(valueToSave);
    localStorage.setItem("highscores", JSON.stringify(storage));
    //    display initials and score in highscore list
    loadHighscores();
    // hide submit button
    submitDisplay.style.display = "none";
    // show highscore list
    highscoreDisplay.style.display = "block";

});

function loadHighscores() {
    var storage = localStorage.getItem("highscores");
    if (storage === null) {
        console.log("Storage empty, bug")
        return
    }
    console.log("Storage not empty")
    storage = JSON.parse(storage);

    storage.sort((elementOne, elementTwo) => elementTwo.score - elementOne.score)
    console.log(storage)
    scoreDisplay.innerHTML = "";
    for (let i = 0; i < storage.length; i++) {
        var li = document.createElement("li");
        li.textContent = storage[i].initials + " - " + storage[i].score;
        scoreDisplay.appendChild(li);
        console.log(li)
    }
    // li.textContent = initials + " - " + score;
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


loadHighscores();