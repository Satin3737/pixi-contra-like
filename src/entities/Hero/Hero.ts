import {Container, type ContainerOptions, Graphics} from 'pixi.js';
import type {IStates} from '@/interfaces';
import {Keys, States} from '@/const';
import type Game from '@/Game';

class Hero extends Container {
    private readonly game: Game;
    private readonly view: Graphics = new Graphics();
    private readonly gravityForce: number = 0.1;
    private readonly jumpForce: number = 4;
    private readonly speed: number = 2;
    private readonly velocity: {x: number; y: number} = {x: 0, y: 0};
    private readonly movement: {x: number; y: number} = {x: 0, y: 0};
    private readonly horizontalMovementContext: {left: number; right: number} = {left: 0, right: 0};
    private state: IStates = States.idle;

    constructor(game: Game, containerOptions?: ContainerOptions) {
        super(containerOptions);

        this.game = game;

        this.view.rect(0, 0, 20, 60).stroke({width: 2, color: 0x0000ff});
        this.addChild(this.view);

        this.initControls();
    }

    private initControls(): void {
        this.game.keyboardService.attachKeyDown(Keys.left, () => this.moveLeft());
        this.game.keyboardService.attachKeyDown(Keys.right, () => this.moveRight());
        this.game.keyboardService.attachKeyDown(Keys.up, () => this.jump());
        this.game.keyboardService.attachKeyDown(Keys.space, () => this.jump());

        this.game.keyboardService.attachKeyUp(Keys.left, () => this.stopMoveLeft());
        this.game.keyboardService.attachKeyUp(Keys.right, () => this.stopMoveRight());
    }

    public moveLeft(): void {
        this.horizontalMovementContext.left = -1;
        this.movement.x = this.horizontalMovementContext.right ? 0 : this.horizontalMovementContext.left;
    }

    public moveRight(): void {
        this.horizontalMovementContext.right = 1;
        this.movement.x = this.horizontalMovementContext.left ? 0 : this.horizontalMovementContext.right;
    }

    public stopMoveLeft(): void {
        this.horizontalMovementContext.left = 0;
        this.movement.x = this.horizontalMovementContext.right;
    }

    public stopMoveRight(): void {
        this.horizontalMovementContext.right = 0;
        this.movement.x = this.horizontalMovementContext.left;
    }

    public jump(): void {
        if (this.state === States.jump || this.state === States.fall) return;
        this.state = States.jump;
        this.velocity.y = -this.jumpForce;
    }

    public stay(): void {
        this.state = States.idle;
        this.velocity.y = 0;
    }

    public update(): void {
        this.velocity.x = this.movement.x * this.speed;
        this.x += this.velocity.x;

        this.velocity.y += this.gravityForce;
        this.y += this.velocity.y;
    }
}

export default Hero;
