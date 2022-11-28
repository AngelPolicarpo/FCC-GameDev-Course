
export default class Player {
    gameHeight: number;
    gameWidth: number;
    states: never[];
    currentState: never;
    image: HTMLElement | null;
    width: number;
    height: number;
    x: number;
    y: number;
    constructor(gameWidth, gameHeight){
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
    draw(context){
        context.drawImage(this.image, this.x, this.y);
    }
}