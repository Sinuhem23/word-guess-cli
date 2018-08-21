#!/usr/bin/env node
var Word = require('./word.js')
var chalk = require('chalk');
var inquirer = require('inquirer');

var words = ['react', 'geocoder', 'express', 'inquirer', 'chalk', 'moment', 'jquery', 'request'];

var correctWord = new Word(words[Math.floor(Math.random() * words.length)]);
correctWord.generateLetters();
var guessesRemaining = 10;
var guessesSoFar = [];

console.log(chalk.cyan("\nWelcome to the Word Guess Game!"));
console.log(chalk.yellow("Hint:") + " the words are popular NPM packages.");

// Reset function
function endGame(outcome) {
  if (outcome === 'win') {
    console.log(chalk.blue.bold("\nYou won!"));
    console.log(chalk.yellow("You guessed ") + chalk.blue.bold(correctWord.correctWord.toUpperCase()) + " " + chalk.bgYellow.black("with " + (guessesRemaining) + " guesses remaining.") + "\n")
  } else {
    console.log("\n" + chalk.bgRed.white.bold("You lost..."));
    console.log(chalk.yellow("The correct word was: ") + chalk.bgYellow.black(correctWord.correctWord + ".") + "\n");
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
      console.log(chalk.cyan("\nGreat! Generating a new word..."));
      main();
    } else {
      console.log(chalk.cyan("\nHope you see you next time!\n"));
      return;
    };
  });
};

// Main game
function main() {
  inquirer.prompt([
    {
      name: "guess",
      prefix: '',
      message: "\nWord: " + chalk.blue(correctWord.update()) +
        "\n\nGuesses remaining: " + chalk.magenta.bold(guessesRemaining) +
        "\nIncorrect guesses so far: " + chalk.magenta.bold(guessesSoFar.join(' ')) + "\n" +
        "Guess a letter:"
    }
  ]).then(function (data) {
    
    // Validate user input
    if (data.guess === "") {
      console.log(chalk.bgRed.white("\nWHOOPS!") + chalk.yellow(" You did enter a letter."));
      return main();
    } else if (data.guess.length > 1) {
      console.log(chalk.bgRed.white("\nWHOOPS!") + chalk.yellow(" Please guess one letter at a time."));
      return main();
    } else if (guessesSoFar.includes(data.guess)) {
      console.log(chalk.bgRed.white("\nWHOOPS!") + chalk.yellow(" You already guessed that! Choose another letter."));
      return main();
    };

    // Only decrement guessesRemaining on an incorrect guess
    if (!correctWord.correctWord.includes(data.guess)) {
      guessesRemaining--;
    }

    guessesSoFar.push(data.guess);
    
    for (var i = 0; i < correctWord.letters.length; i++) {
      correctWord.letters[i].check(data.guess);
    };
    

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
