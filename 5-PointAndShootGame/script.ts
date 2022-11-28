export { };

const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
const ctx: any = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = <HTMLCanvasElement>document.getElementById('collisionCanvas');
const collisionCtx: any = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

ctx.font = '35px Arial';
let gameOver = false;
let score = 0;
var recordValue = localStorage.record;
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let ravens: Raven[] = [];

class Raven {
    width: number;
    height: number;
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    markedForDeletion: boolean;
    image: HTMLImageElement;
    spriteWidth: number;
    spriteHeight: number;
    sizeModifier: number;
    frame: number;
    maxFrame: number;
    timeSinceFlap: number;
    flapInterval: number;
    color: string;
    randomColors: number[];
    constructor() {
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
        this.image.src = 'enemy_ghost.png'
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(deltaTime?) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width) gameOver = true;
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

let explosion: Explosion[] = [];
class Explosion {
    image: HTMLImageElement;
    spriteHeight: number;
    spriteWidth: number;
    size: number;
    x: number;
    y: number;
    frame: number;
    sound: HTMLAudioElement;
    timeSinceLastFrame: number;
    frameInterval: number;
    markedForDeletion: boolean;
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = 'boom.png';
        this.spriteHeight = 179;
        this.spriteWidth = 200;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'boom.mp3';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/4, this.size, this.size);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75)
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 53, 73)
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('LOSER', canvas.width/2, canvas.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText('LOSER', canvas.width/2 +3, canvas.height/2 -2);    
}
function drawRecord() {
    ctx.fillStyle = 'black';
    ctx.fillText('Record: ' + localStorage.record, 50, 75*1.5)
    ctx.fillStyle = 'white';
    ctx.fillText('Record: ' + localStorage.record, 53, 73*1.5)
}

window.addEventListener('click', function (e) {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            object.markedForDeletion = true;
            score++;
            explosion.push(new Explosion(object.x, object.y, object.width));
        }
    });
});

function saveRecord() {
    if (score > recordValue) {
    localStorage.record = 0;
    recordValue = score;
    localStorage.record = recordValue;
    console.log(localStorage.record)
    }
}

function animate(timestamp: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function (a, b) {
            return a.width - b.width;
        });
    };
    saveRecord()
    drawScore();
    drawRecord();
    [...ravens, ...explosion].forEach(object => object.update(deltaTime));
    [...ravens, ...explosion].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markedForDeletion);
    explosion = explosion.filter(object => !object.markedForDeletion);
    if (!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
}
animate(0);


