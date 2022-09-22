"use strict";

canvas: HTMLCanvasElement;

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var timeToNextRaven = 0;
var ravenInterval = 500;
var lastTime = 0;
var ravens = [];

var Raven =
/** @class */
function () {
  function Raven() {
    this.width = 100;
    this.height = 50;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
  }

  Raven.prototype.update = function () {
    this.x -= this.directionX;
  };

  Raven.prototype.draw = function () {
    ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  return Raven;
}();

var raven = new Raven();

function animate(timestamp) {
  ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
  var deltatime = timestamp - lastTime;
  var timestamp = lastTime;
  requestAnimationFrame(animate);
}

animate();