"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
document.addEventListener('load', function () {
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 800;

  var Game =
  /** @class */
  function () {
    function Game() {
      this.enemies = [];
    }

    Game.prototype.update = function () {};

    Game.prototype.draw = function () {};

    Game.prototype._addNewEnemy = function () {};

    return Game;
  }();

  var Enemy =
  /** @class */
  function () {
    function Enemy() {}

    Enemy.prototype.update = function () {};

    Enemy.prototype.draw = function () {};

    return Enemy;
  }();

  var lastTime = 0;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    console.log(deltaTime);
    requestAnimationFrame(animate);
  }

  ;
  animate(0);
});