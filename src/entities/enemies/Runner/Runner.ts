import type {Container, ContainerOptions} from 'pixi.js';
import {Directions, type IDirections, type IPos, type IPosSize, type ITicker} from '@/types';
import {getRandomBoolean} from '@/utils';
import RunnerView from './RunnerView';
import {type IRunnerStates, RunnerStates} from './types';

class Runner {
    private readonly view: RunnerView;
    private readonly gravityForce: number = 0.4;
    private readonly jumpForce: number = 8;
    private readonly speed: number = 4;

    private state: IRunnerStates = RunnerStates.run;
    private velocity: IPos = {x: 0, y: 0};
    private movement: {x: IDirections; y: IDirections} = {x: Directions.left, y: Directions.stop};
    private isStayOnSolid: boolean = false;

    constructor(world: Container, options?: ContainerOptions) {
        this.view = new RunnerView(options);
        world.addChild(this.view);
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

    public get destroyed(): boolean {
        return this.view.destroyed;
    }

    public get isInAir(): boolean {
        return this.state === RunnerStates.jump || this.state === RunnerStates.fall;
    }

    public get isSkipCollision(): boolean {
        return this.state === RunnerStates.jump;
    }

    public jump(): void {
        if (this.isInAir) return;
        this.state = RunnerStates.jump;
        this.velocity.y = -this.jumpForce;
    }

    public land(y: number, isSolid: boolean): void {
        this.state = RunnerStates.run;
        this.y = y - this.bounds.height;
        this.velocity.y = Directions.stop;
        this.isStayOnSolid = isSolid;
    }

    public destroy(): void {
        this.view.destroy();
    }

    public update({deltaTime}: ITicker): void {
        this.velocity.x = this.movement.x * this.speed * deltaTime;
        this.x += this.velocity.x;

        if (this.velocity.y > 0) {
            if (!this.isInAir && !this.isStayOnSolid && getRandomBoolean()) {
                this.jump();
            } else {
                this.state = RunnerStates.fall;
            }
        }

        this.velocity.y += this.gravityForce * deltaTime;
        this.y += this.velocity.y;
    }
}

export default Runner;
