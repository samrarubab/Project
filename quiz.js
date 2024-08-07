// Getting the address of div element defined in html file
let formAddr = document.querySelector(".container");

// Creating a new heading tag
let heading = document.createElement("h1");
formAddr.appendChild(heading);
heading.textContent = "Basic Math Quiz";
heading.classList = "main-heading";

let questions = [];
let correctAnswers = [];

// Retrieve the score from localStorage
let score = localStorage.getItem("score");
if (score === null) {
  score = 0;
} else {
  score = parseInt(score);
}

// Display the current score
let scoreDisplay = document.createElement("p");
formAddr.appendChild(scoreDisplay);
scoreDisplay.textContent = `Score: ${score}`;
scoreDisplay.classList = "score";

for (let i = 1; i <= Math.round(Math.random() * 10); i++) {
  // Choosing a random operator
  let arrOperator = ["+", "-", "*", "/", "%", "^"];
  let randomOperator =
    arrOperator[Math.floor(Math.random() * arrOperator.length)];

  // Choosing two random numbers
  let num1 = Math.round(Math.random() * 100);
  let num2 = Math.round(Math.random() * 100);

  // Creating new paragraph tag
  let paragraph = document.createElement("p");
  formAddr.appendChild(paragraph);
  paragraph.textContent = `${i}. What is ${num1} ${randomOperator} ${num2}?`;
  paragraph.classList = "para";

  // Calculate the correct answer
  let correctAnswer = answer(randomOperator, num1, num2);
  correctAnswers.push(correctAnswer.toFixed(2));

  // Generating unique answers including the correct one
  let answers = new Set();
  while (answers.size < 4) {
    if (answers.size == 3) {
      answers.add(correctAnswer.toFixed(2));
    } else {
      answers.add((Math.random() * correctAnswer * 10).toFixed(2));
    }
  }

  // Shuffle the answers
  let shuffledAnswers = Array.from(answers);
  shuffledAnswers.sort(() => Math.random() - 0.5);

  // Store question and its answers
  questions.push({
    question: `${num1} ${randomOperator} ${num2}`,
    answers: shuffledAnswers,
    correctAnswer: correctAnswer.toFixed(2),
  });

  // Adding options to choose the correct one
  shuffledAnswers.forEach((ans, index) => {
    // Creating radios to see which answer is ticked
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${i}`;
    radio.value = ans;
    radio.classList = "radio-class";
    formAddr.appendChild(radio);

    // Creating spans to show the options
    let span = document.createElement("span");
    formAddr.appendChild(span);
    span.textContent = ans;
    span.classList = "span-class";

    // Creating a line break to separate each radio button
    formAddr.appendChild(document.createElement("br"));
  });
}

// Creating Submit Button
let submitBtn = document.createElement("button");
formAddr.appendChild(submitBtn);
submitBtn.textContent = "Submit Quiz";
submitBtn.classList = "submit-btn";

// Logic for finding the answer of the questions
function answer(randomOperator, num1, num2) {
  switch (randomOperator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    case "^":
      return num1 ** num2;
    default:
      return "Invalid operator";
  }
}

// Add an event listener to the submit button
submitBtn.addEventListener("click", checkAnswers);

// Function to check the answers
function checkAnswers() {
  let tempScore = 0;
  for (let i = 0; i < questions.length; i++) {
    let radios = document.querySelectorAll(`input[name="question${i + 1}"]`);
    radios.forEach((radio) => {
      if (radio.checked && radio.value === questions[i].correctAnswer) {
        tempScore++;
      }
    });
  }
  score += tempScore;
  localStorage.setItem("score", score);

  let result = document.createElement("p");
  formAddr.appendChild(result);
  result.textContent = `You scored ${tempScore} out of ${questions.length}`;
  result.classList = "result";

  scoreDisplay.textContent = `Score: ${score}`;
}