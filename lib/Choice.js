
function Choice(char) {

  this.visible = !/[a-z1-9]/i.test(char);

  this.char = char;
}

Choice.prototype.toString = function() {
  if (this.visible === true) {
    return this.char;
  }
  return "_";
};

Choice.prototype.getSolution = function() {
  return this.char;
};

Choice.prototype.guess = function(charGuess) {
  if (charGuess.toUpperCase() === this.char.toUpperCase()) {
    this.visible = true;
    return true;
  }

  return false;
};

module.exports = Choice;
