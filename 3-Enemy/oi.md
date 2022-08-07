# Enemy!

```JS
class Enemy {
    // O método construtor instancia os inimigos.
    constructor(){
        this.image = new Image();
        this.image.src = 'images/enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 212; 
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
```