import {Container, Graphics} from 'pixi.js';

class Hero extends Container {
    private readonly view: Graphics;
    private readonly gravityForce: number;
    private readonly jumpForce: number;
    private readonly speed: number;
    private readonly velocity: {x: number; y: number};
    private readonly movement: {x: number; y: number};
    private readonly horizontalMovementContext: {left: number; right: number};

    constructor() {
        super();

        this.gravityForce = 0.1;
        this.jumpForce = 4;
        this.speed = 2;
        this.velocity = {x: 0, y: 0};
        this.movement = {x: 0, y: 0};
        this.horizontalMovementContext = {left: 0, right: 0};

        this.view = new Graphics();
        this.view.rect(0, 0, 20, 60).stroke({width: 2, color: 0x0000ff});
        this.addChild(this.view);
    }

    public update() {
        this.velocity.x = this.movement.x * this.speed;
        this.x += this.velocity.x;

        this.velocity.y += this.gravityForce;
        this.y += this.velocity.y;
    }

    public moveLeft() {
        this.horizontalMovementContext.left = -1;
        this.movement.x = this.horizontalMovementContext.right ? 0 : this.horizontalMovementContext.left;
    }

    public moveRight() {
        this.horizontalMovementContext.right = 1;
        this.movement.x = this.horizontalMovementContext.left ? 0 : this.horizontalMovementContext.right;
    }

    public stopMoveLeft() {
        this.horizontalMovementContext.left = 0;
        this.movement.x = this.horizontalMovementContext.right;
    }

    public stopMoveRight() {
        this.horizontalMovementContext.right = 0;
        this.movement.x = this.horizontalMovementContext.left;
    }

    public jump() {
        this.velocity.y = -this.jumpForce;
    }

    public stay() {
        this.velocity.y = 0;
    }
}

export default Hero;
