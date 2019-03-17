var inquirer = require("inquirer");
var chalk = require("chalk");
var Team = require("./Team");
var teams = require("./teams");



function GmeContr() {

  var self = this;


  this.play = function() {
    this.guessesLeft = 10;
    this.nextTeam();
  };


  this.nextTeam = function() {
    var randTeam = teams[Math.floor(Math.random() * teams.length)];
    this.currentTeam = new Team(randTeam);
    console.log("\n" + this.currentTeam + "\n");
    this.makeGuess();
  };

  this.makeGuess = function() {
    this.rqLetter().then(function() {

      if (self.guessesLeft < 1) {
        console.log(
          "Out of chances! Team was: \"" + self.currentTeam.grabPick() + "\"\n"
        );
        self.askToPlayAgain();


      }
      else if (self.currentTeam.rightAnswer()) {
        console.log("You are good. Have some more!");
        self.guessesLeft = 10;
        self.nextTeam();

      }
      else {
        self.makeGuess();
      }
    });
  };


  this.askToPlayAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Another Round?"
        }
      ])
      .then(function(val) {

        if (val.choice) {
          self.play();
        }
        else {
          self.quit();
        }
      });
  };


  this.rqLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {

            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {

        var didGuessCorrectly = self.currentTeam.grabTeam(val.choice);
        if (didGuessCorrectly) {
          console.log(chalk.green("\nYou got it right!\n"));

        }
        else {
          self.guessesLeft--;
          console.log(chalk.red("\nTo bad, you are wrong!\n"));
          console.log(self.guessesLeft + " opportunities to fail!!!\n");
        }
      });
  };

  this.quit = function() {
    console.log("\nGoodbye!");
    process.exit(0);
  };
}

module.exports = GmeContr;