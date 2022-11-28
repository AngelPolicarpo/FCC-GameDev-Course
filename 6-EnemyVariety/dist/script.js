"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;
    var Game = /** @class */ (function () {
        function Game(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost', 'spider'];
        }
        Game.prototype.update = function (deltaTime) {
            this.enemies = this.enemies.filter(function (object) { return !object.markedForDeletion; });
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                this._addNewEnemy();
                console.log(this.enemies);
            }
            else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(function (object) { return object.update(deltaTime); });
        };
        Game.prototype.draw = function () {
            var _this = this;
            this.enemies.forEach(function (object) { return object.draw(_this.ctx); });
        };
        Game.prototype._addNewEnemy = function () {
            var randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if (randomEnemy == 'worm')
                this.enemies.push(new Worm(this));
            else if (randomEnemy == 'ghost')
                this.enemies.push(new Ghost(this));
            else if (randomEnemy == 'spider')
                this.enemies.push(new Spider(this));
            this.enemies.sort(function (a, b) {
                return a.y - b.y;
            });
        };
        return Game;
    }());
    var Enemy = /** @class */ (function () {
        function Enemy(game) {
            this.game = game;
            this.markedForDeletion = false;
            this.frameX;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;
        }
        Enemy.prototype.update = function (deltaTime) {
            this.x -= this.vx * deltaTime;
            if (this.x < 0 - this.width)
                this.markedForDeletion = true;
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame)
                    this.frameX++;
                else
                    this.frameX = 0;
                this.frameTimer = 0;
            }
            else {
                this.frameTimer += deltaTime;
            }
        };
        Enemy.prototype.draw = function (ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        };
        return Enemy;
    }());
    var Worm = /** @class */ (function (_super) {
        __extends(Worm, _super);
        function Worm(game) {
            var _this = _super.call(this, game) || this;
            _this.spriteWidth = 229;
            _this.spriteHeight = 171;
            _this.width = _this.spriteWidth / 2;
            _this.height = _this.spriteHeight / 2;
            _this.x = _this.game.width;
            _this.y = _this.game.height - _this.height;
            _this.image = new Image();
            _this.image.src = 'enemy_worm.png';
            _this.vx = Math.random() * 0.1 + 0.1;
            return _this;
        }
        return Worm;
    }(Enemy));
    var Ghost = /** @class */ (function (_super) {
        __extends(Ghost, _super);
        function Ghost(game) {
            var _this = _super.call(this, game) || this;
            _this.spriteWidth = 261;
            _this.spriteHeight = 209;
            _this.width = _this.spriteWidth / 2;
            _this.height = _this.spriteHeight / 2;
            _this.x = _this.game.width;
            _this.y = Math.random() * _this.game.height * 0.5;
            _this.image = new Image();
            _this.image.src = 'enemy_ghost.png';
            _this.vx = Math.random() * 0.2 + 0.1;
            _this.angle = 0;
            _this.curve = Math.random() * 3;
            return _this;
        }
        Ghost.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            this.y += Math.sin(this.angle) * this.curve;
            this.angle += 0.04;
        };
        Ghost.prototype.draw = function () {
            ctx.save();
            ctx.globalAlpha = 0.5;
            _super.prototype.draw.call(this, ctx);
            ctx.restore();
        };
        return Ghost;
    }(Enemy));
    var Spider = /** @class */ (function (_super) {
        __extends(Spider, _super);
        function Spider(game) {
            var _this = _super.call(this, game) || this;
            _this.spriteWidth = 310;
            _this.spriteHeight = 175;
            _this.width = _this.spriteWidth / 2;
            _this.height = _this.spriteHeight / 2;
            _this.x = Math.random() * _this.game.width;
            _this.y = 0 - _this.height;
            _this.image = new Image();
            _this.image.src = 'enemy_spider.png';
            _this.vx = 0;
            _this.vy = Math.random() * 0.1 + 0.1;
            _this.maxLenght = Math.random() * _this.game.height;
            return _this;
        }
        Spider.prototype.update = function (deltaTime) {
            _super.prototype.update.call(this, deltaTime);
            if (this.y < 0 - this.height * 2)
                this.markedForDeletion = true;
            this.y += this.vy * deltaTime;
            if (this.y > 200)
                this.vy *= -1;
        };
        Spider.prototype.draw = function (ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, 0);
            ctx.lineTo(this.x + this.width / 2, this.y + 10);
            ctx.stroke();
            _super.prototype.draw.call(this, ctx);
        };
        return Spider;
    }(Enemy));
    var game = new Game(ctx, canvas.width, canvas.height);
    var lastTime = 1;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    }
    ;
    animate(0);
});
