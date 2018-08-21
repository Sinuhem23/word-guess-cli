var Letter = require('./Letter.js');

function Word(correctWord) {
  this.correctWord = correctWord;
  this.letters = [];

  this.generateLetters = function() {
    var correctWordArray = this.correctWord.split('');
    for (var i=0; i < correctWordArray.length; i++) {
      var newLetter = new Letter(correctWordArray[i]);
      this.letters.push(newLetter);
    };
  };

  this.makeGuess = function(guess) {
    for (var j=0; j < this.letters.length; j++) {
      this.letters[j].check(guess);
    };
  };

  this.update = function() {
    var string = ''
    for (var k=0; k < this.letters.length; k++) {
      string += this.letters[k].returnCharacter();
    };
    return string;
  };
};

module.exports = Word;
