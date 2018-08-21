var Word = require('./word.js')
var chalk = require('chalk');
var inquirer = require('inquirer');

var words = ['react', 'angular', 'express', 'inquirer', 'chalk', 'moment', 'jquery'];

var correctWord = new Word(words[Math.floor(Math.random() * words.length)]);
correctWord.generateLetters();
var guessesRemaining = 10;
var guessesSoFar = [];

console.log(chalk.cyan("\nWelcome to the Word Guess Game!"));
console.log(chalk.yellow("Hint:") + " the words are popular NPM packages\n");

// Reset function
function endGame(outcome) {
  if (outcome === 'win') {
    console.log(chalk.green("\nYou won!"));
    console.log(chalk.yellow("You guessed ") + chalk.blue.bold(correctWord.correctWord.toUpperCase()) + " " + chalk.bgYellow.black.underline("in " + (10-guessesRemaining) + " guesses.") + "\n")
  } else {
    console.log("\n" + chalk.bgRed.white.bold("You lost..."));
    console.log(chalk.yellow("The correct word was: ") + chalk.bgYellow.black.underline(correctWord.correctWord) + "\n");
  };

  correctWord = new Word(words[Math.floor(Math.random() * words.length)]);
  correctWord.generateLetters();
  guessesRemaining = 10;
  guessesSoFar = [];

  inquirer.prompt([
    {
      message: "Would you like to play again?",
      name: "confirm",
      type: "confirm",
    }
  ]).then(function(response) {
    if (response.confirm) {
      console.log("\nGreat! Generating a new word...\n");
      main();
    } else {
      console.log("\nHope you see you next time!\n");
      return;
    };

  });
};

// Main game
function main() {
  inquirer.prompt([
    {
      name: "guess",
      prefix: 'Word:',
      message: chalk.blue(correctWord.update()) +
        "\nGuesses remaining: " + guessesRemaining +
        "\nIncorrect guesses so far: " + guessesSoFar + "\n"
    }
  ]).then(function (data) {
    guessesSoFar.push(data.guess);
    for (var i = 0; i < correctWord.letters.length; i++) {
      correctWord.letters[i].check(data.guess);
    };
    guessesRemaining--;

    if (correctWord.update().toLowerCase() == correctWord.correctWord.toLowerCase()) {
      endGame('win');
      return;
    };

    if (guessesRemaining == 0) {
      endGame('loss');
      return;
    };



    main();

  });
};

main();
