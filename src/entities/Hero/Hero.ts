import type {Container, ContainerOptions} from 'pixi.js';
import type {IPosSize, IStates} from '@/interfaces';
import {States} from '@/const';
import {HeroControls, HeroView} from './';

class Hero {
    private readonly stage: Container;
    private readonly view: HeroView;
    private readonly gravityForce: number = 0.2;
    private readonly jumpForce: number = 9;
    private readonly speed: number = 3;

    private state: IStates = States.stay;
    private size: {width: number; height: number} = {width: 0, height: 0};
    private velocity: {x: number; y: number} = {x: 0, y: 0};
    private movement: {x: number; y: number} = {x: 0, y: 0};
    private movementContext: {left: number; right: number} = {left: 0, right: 0};
    private aimContext: {up: boolean; down: boolean} = {up: false, down: false};

    constructor(stage: Container, options?: ContainerOptions) {
        this.stage = stage;

        this.size = {width: 20, height: 80};
        this.view = new HeroView({...options, ...this.size});
        new HeroControls(this);
        this.stage.addChild(this.view);
    }

    public moveLeft(): void {
        this.movementContext.left = -1;
        this.movement.x = this.movementContext.right ? 0 : this.movementContext.left;
    }

    public moveRight(): void {
        this.movementContext.right = 1;
        this.movement.x = this.movementContext.left ? 0 : this.movementContext.right;
    }

    public stopMoveLeft(): void {
        this.movementContext.left = 0;
        this.movement.x = this.movementContext.right;
    }

    public stopMoveRight(): void {
        this.movementContext.right = 0;
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
        this.velocity.y = 0;
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
        return {x: this.x, y: this.y, width: this.size.width, height: this.size.height};
    }

    public get isSkipCollision(): boolean {
        return this.state === States.jump;
    }

    public update(): void {
        this.velocity.x = this.movement.x * this.speed;
        this.x += this.velocity.x;

        if (this.velocity.y > 0 && (this.state === States.jump || this.state === States.stay)) {
            this.state = States.fall;
        }

        this.velocity.y += this.gravityForce;
        this.y += this.velocity.y;
    }
}

export default Hero;
