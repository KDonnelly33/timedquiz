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
var timer;
var timeleft;
let currentQuestionIndex = 0;
let score = 0;
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
    timeleft--;
    document.getElementById("timer").textContent = timeleft;
}
//    creates funtion to show the question
function showQuestion(questionIndex) {
    var currentQuestion = quizQuestions[questionIndex];
    questionDisplay.textContent = currentQuestion.question;
    // clear answer options
    answerOptions.innerHTML = "";
    // loop through the answer options and create a button for each one

    for (let i = 0; i < currentQuestion.options.length; i++) {
        var option = document.createElement("button");
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
}