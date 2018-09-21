/**
 * Letter Module
 */

// Letter constructor
// ------------------------------

function Letter(char) {
    this.char = char;
    this.guessed = false;
}

// Letter prototype
// ------------------------------

// Get character or underscore
Letter.prototype.get = function() {
    if (this.guessed) {
        return this.char;
    }
    return "_";
};

// Check character
Letter.prototype.check = function(char) {
    if (char.toLowerCase() === this.char) {
        this.guessed = true;
    }
};

// Export letter
// ------------------------------

module.exports = Letter;
