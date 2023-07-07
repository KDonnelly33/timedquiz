// Define an array of quiz questions
const quizQuestions = [
    {
      question: "What is Does CSS stand for?",
      options: ["Cascading Style Sheets", "Concave Sytle Sheets", "Cascading Sheet Styles", "All the above"],
      answer: 1
    },
    {question: "What is the correct HTML for referring to an external style sheet?",
      options: ["<stylesheet>mystyle.css</stylesheet>", "<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<style src='mystyle.css'>", "<link href='mystyle.css'>"],
      answer: 2
    } ,  
    // Add more questions here
  ];
    // Define variables
    var startButton = document.getElementById("start-button");

    // when i click the start button the first question should appear
    startButton.addEventListener("click", function() {
    //    hide the start button
        startButton.style.display = "none";
        // show the first question

        showQuestion(0);
    });
//    creates funtion to show the question
    function showQuestion(questionIndex) {
        var currentquestion = quizQuestions[questionIndex];
questionDisplay.textContent = currentquestion.question;



    }