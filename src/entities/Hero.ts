import {Container, Graphics} from 'pixi.js';

class Hero extends Container {
    private readonly view: Graphics;
    private readonly gravity: number;
    private readonly velocity: {x: number; y: number};

    constructor() {
        super();

        this.gravity = 0.1;
        this.velocity = {x: 0, y: 0};

        this.view = new Graphics();
        this.view.rect(0, 0, 20, 60).stroke({width: 2, color: 0x0000ff});
        this.addChild(this.view);
    }

    public update() {
        this.velocity.y += this.gravity;
        this.y += this.velocity.y;
    }

    public stay() {
        this.velocity.y = 0;
    }
}

export default Hero;
