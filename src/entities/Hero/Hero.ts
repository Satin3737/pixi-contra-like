import type {Container, ContainerOptions} from 'pixi.js';
import type {IDirections, IPosSize, IStates} from '@/interfaces';
import {Directions, States} from '@/const';
import {HeroControls, HeroView} from './';

class Hero {
    public readonly view: HeroView;

    private readonly stage: Container;
    private readonly controls: HeroControls;
    private readonly gravityForce: number = 0.2;
    private readonly jumpForce: number = 9;
    private readonly speed: number = 3;

    private state: IStates = States.stay;
    private velocity: {x: number; y: number} = {x: 0, y: 0};
    private movement: {x: IDirections; y: IDirections} = {x: Directions.stop, y: Directions.stop};
    private movementContext: {left: IDirections; right: IDirections} = {left: Directions.stop, right: Directions.stop};
    private aimContext: {up: boolean; down: boolean} = {up: false, down: false};

    constructor(stage: Container, options?: ContainerOptions) {
        this.stage = stage;

        this.view = new HeroView(options);
        this.controls = new HeroControls(this);
        this.stage.addChild(this.view);
    }

    public get x(): number {
        return this.view.x;
    }

    public set x(value: number) {
        this.view.x = value;
    }

    public get y(): number {
        return this.view.y;
    }

    public set y(value: number) {
        this.view.y = value;
    }

    public get bounds(): IPosSize {
        return this.view.bounds;
    }

    public get isInAir(): boolean {
        return this.state === States.jump || this.state === States.fall;
    }

    public get isSkipCollision(): boolean {
        return this.state === States.jump;
    }

    public moveLeft(): void {
        this.movementContext.left = Directions.left;
        this.movement.x = this.movementContext.right ? Directions.stop : this.movementContext.left;
    }

    public moveRight(): void {
        this.movementContext.right = Directions.right;
        this.movement.x = this.movementContext.left ? Directions.stop : this.movementContext.right;
    }

    public stopMoveLeft(): void {
        this.movementContext.left = Directions.stop;
        this.movement.x = this.movementContext.right;
    }

    public stopMoveRight(): void {
        this.movementContext.right = Directions.stop;
        this.movement.x = this.movementContext.left;
    }

    public lookUp(): void {
        this.aimContext.up = true;
    }

    public lookDown(): void {
        this.aimContext.down = true;
    }

    public lookForward(): void {
        this.aimContext.down = false;
        this.aimContext.up = false;
    }

    public jump(): void {
        if (this.state === States.jump || this.state === States.fall) return;
        this.state = States.jump;
        !this.aimContext.down && (this.velocity.y = -this.jumpForce);
    }

    public stay(y: number): void {
        this.state = States.stay;
        this.y = y - this.bounds.height;
        this.velocity.y = Directions.stop;
        this.controls.updateViewState();
    }

    public update(): void {
        this.velocity.x = this.movement.x * this.speed;
        this.x += this.velocity.x;

        if (this.velocity.y > 0 && (this.state === States.jump || this.state === States.stay)) {
            this.state = States.fall;
            this.controls.updateViewState();
        }

        this.velocity.y += this.gravityForce;
        this.y += this.velocity.y;
    }
}

export default Hero;
