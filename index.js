/**
 * Word Guess Application
 */

// Dependencies
// ------------------------------

const Word = require("./js/word"),
inquirer = require("inquirer"),
readline = require("readline");

// Global Variables
// ------------------------------

const words = [
    "anomalistic",
    "callipygian",
    "equanimity",
    "magnanimous",
    "unencumbered",
    "perspicacious",
    "osculator",
    "nidificate",
    "gasconading",
    "ebullient"
],
gameState = {
    attempts: 7,
    won: false,
    over: false
};

// Functions
// ------------------------------

// Get random number
const getRandomNum = (max, base = 0) => Math.floor((Math.random() * max) + base);

// Get random game word
const getGameWord = (words) => words[getRandomNum(words.length)];

// Clear console
const clearConsole = () => {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
};

// Play game
const playGame = (game) => {
    if (!game.over) {
        console.log(`${game.triviaWord.get()}\n`);
        console.log(`Guesses: ${game.triviaWord.getGuessesString()}\n`);
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "guess",
                    message: "Guess a single letter: "
                }
            ])
            .then((input) => {
                clearConsole();
                const {hit, duplicate} = game.triviaWord.guess(input.guess.charAt(0));
                if (!hit) {
                    if (!duplicate) {
                        game.attempts -= 1;
                        console.log(`\n${game.attempts} attempt(s) remaining\n`);
                    }
                }
                checkGame(game);
            });
    } else {
        let message;
        if (game.won) {
            message = `You guessed the word ${game.triviaWord.word} correctly`;
            message += "\nYou win!\n";
        } else {
            message = `You were unable to guess the word ${game.triviaWord.word} correctly`;
            message += "\nYou lose...\n";
        }
        clearConsole();
        console.log(message);
    }
};

// Check game
const checkGame = (game) => {
    if (game.triviaWord.get().indexOf("_") === -1) {
        game.won = true;
        game.over = true;
    } else if (game.attempts <= 0) {
        game.over = true;
    }
    playGame(game);
};

// Main
// ------------------------------

gameState.triviaWord = new Word(getGameWord(words));
clearConsole();
playGame(gameState);
