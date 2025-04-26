// File: trivia_game.js

const readline = require('readline');

// Setup CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Question Data
const questions = [
  {
    question: 'What is the capital of France?',
    choices: ['A) Paris', 'B) Berlin', 'C) Rome', 'D) Madrid'],
    answer: 'A'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choices: ['A) Earth', 'B) Mars', 'C) Jupiter', 'D) Venus'],
    answer: 'B'
  },
  {
    question: 'Who wrote "Hamlet"?',
    choices: ['A) Dickens', 'B) Tolkien', 'C) Shakespeare', 'D) Hemingway'],
    answer: 'C'
  }
];

// Game Variables
let score = 0;
let currentQuestionIndex = 0;
let gameTimer;
const GAME_DURATION = 60000; // 60 seconds

// Start the Game
function startGame() {
  console.log('Welcome to the Trivia Game!');
  console.log('You have 60 seconds to answer all questions. Good luck!\n');
  
  startTimer();
  askNextQuestion();
}

// Start Global Game Timer
function startTimer() {
  gameTimer = setTimeout(() => {
    console.log('\nTime is up!');
    endGame();
  }, GAME_DURATION);
}

// Ask a Single Question
function askNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const current = questions[currentQuestionIndex];
    console.log(current.question);
    current.choices.forEach(choice => console.log(choice));
    rl.question('Your answer (A, B, C, D): ', (userInput) => {
      handleAnswer(userInput.toUpperCase(), current.answer);
    });
  } else {
    endGame();
  }
}

// Handle User Answer
function handleAnswer(userInput, correctAnswer) {
  if (userInput === correctAnswer) {
    console.log('Correct!\n');
    score++;
  } else {
    console.log(`Wrong! The correct answer was ${correctAnswer}.\n`);
  }
  currentQuestionIndex++;
  askNextQuestion();
}

// End the Game
function endGame() {
  clearTimeout(gameTimer);
  console.log(`\nGame Over! Your final score is: ${score}/${questions.length}`);
  console.log('Thanks for playing!');
  rl.close();
}

// Start the app
startGame();
