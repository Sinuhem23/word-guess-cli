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

function endGame(outcome) {
  if (outcome === 'win') {
    console.log("YOU WON!");
  } else {
    console.log("You lost...");
    console.log("The correct word was: " + correctWord.correctWord);
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
    console.log(typeof(response.confirm));

  });
};

function main() {
  inquirer.prompt([
    {
      name: "guess",
      prefix: 'Word:',
      message: chalk.blue(correctWord.update()) +
        "\nGuesses remaining: " + guessesRemaining +
        "\nIncorrect guesses so far: " + guessesSoFar
    }
  ]).then(function (data) {
    guessesSoFar.push(data.guess);
    for (var i = 0; i < correctWord.letters.length; i++) {
      correctWord.letters[i].check(data.guess);
    };
    guessesRemaining--;

    if (guessesRemaining == 0) {
      endGame('loss');
    } else {

    }



    main();

  });
};

main();
