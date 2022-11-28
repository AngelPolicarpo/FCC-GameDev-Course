"use strict";

exports.__esModule = true;

var Player =
/** @class */
function () {
  function Player(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.states = [];
    this.currentState = this.states[0];
    this.image = document.getElementById('dogImage');
    this.width = 200;
    this.height = 181.83;
    this.x = 0;
    this.y = 0;
  }

  Player.prototype.draw = function (context) {
    context.drawImage(this.image, this.x, this.y);
  };

  return Player;
}();

exports["default"] = Player;