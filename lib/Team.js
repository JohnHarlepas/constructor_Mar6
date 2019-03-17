var pick = require("./Choice");

function Team(Team) {

  this.picks = Team.split("").map(function(char) {
    return new pick(char);
  });
}

Team.prototype.grabPick = function() {
  return this.picks.map(function(pick) { 
    return pick.grabPick();
  }).join(""); 
};

Team.prototype.toString = function() {
  return this.picks.join(" "); 
};

Team.prototype.grabTeam = function(char) {

  var foundpick = false;
  this.picks.forEach(function(pick) {
    if (pick.guess(char)) {
      foundpick = true;
    }
  });


  console.log("\n" + this + "\n");

  return foundpick;
};

Team.prototype.rightAnswer = function() {

  return this.picks.every(function(pick) {
    return pick.visible;
  });
};

module.exports = Team;


