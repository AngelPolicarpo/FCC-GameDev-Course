"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var collisionCanvas = document.getElementById('collisionCanvas');
var collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
ctx.font = '35px Arial';
var score = 0;
var timeToNextRaven = 0;
var ravenInterval = 500;
var lastTime = 0;
var ravens = [];
var Raven = /** @class */ (function () {
    function Raven() {
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.sizeModifier = Math.random() * 0.2 + 0.3;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'enemy_ghost.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    Raven.prototype.update = function (deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width)
            this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame)
                this.frame = 0;
            else
                this.frame++;
            this.timeSinceFlap = 0;
        }
    };
    Raven.prototype.draw = function () {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    };
    return Raven;
}());
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 53, 73);
}
window.addEventListener('click', function (e) {
    var detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    var pc = detectPixelColor.data;
    ravens.forEach(function (object) {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            object.markedForDeletion = true;
            score++;
        }
    });
});
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    var deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function (a, b) {
            return a.width - b.width;
        });
    }
    ;
    drawScore();
    __spreadArrays(ravens).forEach(function (object) { return object.update(deltaTime); });
    __spreadArrays(ravens).forEach(function (object) { return object.draw(); });
    ravens = ravens.filter(function (object) { return !object.markedForDeletion; });
    requestAnimationFrame(animate);
}
animate(0);
