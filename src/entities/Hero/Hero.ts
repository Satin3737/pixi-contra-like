import {Container, type ContainerOptions, Graphics} from 'pixi.js';
import type {IPosSize, IStates} from '@/interfaces';
import {KeyEvents, Keys, States} from '@/const';
import type Game from '@/Game';

class Hero extends Container {
    private readonly game: Game;
    private readonly view: Graphics = new Graphics();
    private readonly gravityForce: number = 0.1;
    private readonly jumpForce: number = 6;
    private readonly speed: number = 2;

    private state: IStates = States.idle;
    private velocity: {x: number; y: number} = {x: 0, y: 0};
    private movement: {x: number; y: number} = {x: 0, y: 0};
    private movementContext: {left: number; right: number} = {left: 0, right: 0};
    private aimContext: {up: boolean; down: boolean} = {up: false, down: false};

    constructor(game: Game, containerOptions?: ContainerOptions) {
        super(containerOptions);

        this.game = game;

        this.view.rect(0, 0, 20, 60).stroke({width: 2, color: 0x0000ff});
        this.addChild(this.view);

        this.initControls();
    }

    private initControls(): void {
        this.game.keyboardService.attachKey(Keys.left, KeyEvents.keyDown, () => this.moveLeft());
        this.game.keyboardService.attachKey(Keys.left, KeyEvents.keyUp, () => this.stopMoveLeft());

        this.game.keyboardService.attachKey(Keys.right, KeyEvents.keyDown, () => this.moveRight());
        this.game.keyboardService.attachKey(Keys.right, KeyEvents.keyUp, () => this.stopMoveRight());

        this.game.keyboardService.attachKey(Keys.up, KeyEvents.keyDown, () => this.lookUp());
        this.game.keyboardService.attachKey(Keys.up, KeyEvents.keyUp, () => this.lookForward());

        this.game.keyboardService.attachKey(Keys.down, KeyEvents.keyDown, () => this.lookDown());
        this.game.keyboardService.attachKey(Keys.down, KeyEvents.keyUp, () => this.lookForward());

        this.game.keyboardService.attachKey(Keys.space, KeyEvents.keyDown, () => this.jump());
    }

    private moveLeft(): void {
        this.movementContext.left = -1;
        this.movement.x = this.movementContext.right ? 0 : this.movementContext.left;
    }

    private moveRight(): void {
        this.movementContext.right = 1;
        this.movement.x = this.movementContext.left ? 0 : this.movementContext.right;
    }

    private stopMoveLeft(): void {
        this.movementContext.left = 0;
        this.movement.x = this.movementContext.right;
    }

    private stopMoveRight(): void {
        this.movementContext.right = 0;
        this.movement.x = this.movementContext.left;
    }

    private lookUp(): void {
        this.aimContext.up = true;
    }

    private lookDown(): void {
        this.aimContext.down = true;
    }

    private lookForward(): void {
        this.aimContext.down = false;
        this.aimContext.up = false;
    }

    private jump(): void {
        if (this.state === States.jump || this.state === States.fall) return;
        this.state = States.jump;
        !this.aimContext.down && (this.velocity.y = -this.jumpForce);
    }

    public idle(): void {
        this.state = States.idle;
        this.velocity.y = 0;
    }

    public get bounds(): IPosSize {
        return {x: this.x, y: this.y, width: this.view.width, height: this.view.height};
    }

    public get isSkipCollision(): boolean {
        return this.state === States.jump;
    }

    public update(): void {
        this.velocity.x = this.movement.x * this.speed;
        this.x += this.velocity.x;

        this.velocity.y += this.gravityForce;
        this.y += this.velocity.y;

        if (this.velocity.y > 0 && this.state === States.jump) {
            this.state = States.fall;
        }
    }
}

export default Hero;
