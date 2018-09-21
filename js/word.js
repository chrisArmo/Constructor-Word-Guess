/**
 * Word Module
 */

// Dependencies
// ------------------------------

const Letter = require("./letter");
 
// Word constructor
// ------------------------------

function Word(word) {
    this.letters = word.split("").map((letter) => new Letter(letter));
    this.word = word;
    this.guesses = [];
}

// Word prototype
// ------------------------------

// Get display word string
Word.prototype.get = function() {
    return this.letters.map((letter) => letter.get()).join(" ");
};

// Make guess
Word.prototype.guess = function(char) {
    let outcome = {
        hit: false,
        duplicate: false
    };
    if (!this.guesses.includes(char)) {
        const preCheckLength = this.get().replace(/\s|_/g, "").length;
        this.letters.forEach((letter) => letter.check(char));
        this.guesses.push(char);    
        if (this.get().replace(/\s|_/g, "").length > preCheckLength) {
            outcome.hit = true;
            console.log("Hit!\n");
        } else {
            console.log("Strike!");
        }
    } else {
        outcome.duplicate = true;
        console.log("You already guessed that number!\n");
    }
    return outcome;
};

// Get guesses
Word.prototype.getGuessesString = function() {
    return this.guesses.join(", ");
};

// Export word
// ------------------------------

module.exports = Word;
