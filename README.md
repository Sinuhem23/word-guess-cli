# Word Guess CLI
A "Hangman" type game you can play in your terminal.

## Demo
<p align="center">
<img src="https://adnanyousef.github.io/word-guess-cli/demo.gif">
</p>

## Installation
You can install and run with NPM. Simply open your terminal and type the following commands:
```
$ git clone https://www.github.com/adnanyousef/word-guess-cli.git
$ cd word-guess-cli
$ npm install
```
Then, start the game with:
```
$ node index.js
```
Alternatively, to install system-wide (so that you don't have to be in the directory to run the app), just run:
```
$ npm link
```
This will make the command `word-guess-cli` available to you anywhere in your terminal! No need `cd` into this git repo to run the app.

## How To Play
1. After launching the game, you will see some blanks. Each represents a letter from the random word.
2. Type a letter to guess if it is in the random word.
3. Each time you guess an incorrect letter, your "Guesses Remaining" will reduce by 1. Once this reaches zero, you lose!
4. If you guess the random word before exhausting your guesses remaining, you win!
5. At the win/loss screen, you may play again by hitting the enter key, or you can exit by typing "n" or "no."

## Issues
If you encounter any bugs or have ideas to further improve this app, please submit an issue [here](https://github.com/adnanyousef/word-guess-cli/issues).