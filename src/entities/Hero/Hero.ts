import {type Container, type ContainerOptions} from 'pixi.js';
import {Directions, type IDirections, type IPos, type IPosSize} from '@/types';
import {Bullet, BulletFactory} from '../Bullets';
import HeroAim from './HeroAim';
import HeroControls from './HeroControls';
import HeroView from './HeroView';
import {HeroStates, type IHeroStates} from './types';

class Hero {
    public readonly view: HeroView;
    public readonly aim: HeroAim;

    private readonly controls: HeroControls;
    private readonly bulletFactory: BulletFactory;
    private readonly gravityForce: number = 0.2;
    private readonly jumpForce: number = 9;
    private readonly speed: number = 3;

    private state: IHeroStates = HeroStates.stay;
    private velocity: IPos = {x: 0, y: 0};
    private movement: {x: IDirections; y: IDirections} = {x: Directions.stop, y: Directions.stop};
    private movementContext: {left: IDirections; right: IDirections} = {left: Directions.stop, right: Directions.stop};
    private bullets: Bullet[] = [];

    constructor(world: Container, options?: ContainerOptions) {
        this.view = new HeroView(options);
        this.aim = new HeroAim(this);
        this.controls = new HeroControls(this);
        this.bulletFactory = new BulletFactory(world);
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

    public get isInAir(): boolean {
        return this.state === HeroStates.jump || this.state === HeroStates.fall;
    }

    public get isSkipCollision(): boolean {
        return this.state === HeroStates.jump;
    }

    public get heroBullets(): Bullet[] {
        return this.bullets;
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

    public jump(isDown: boolean): void {
        if (this.isInAir) return;
        this.state = HeroStates.jump;
        !isDown && (this.velocity.y = -this.jumpForce);
    }

    public land(y: number, _: boolean): void {
        this.state = HeroStates.stay;
        this.y = y - this.bounds.height;
        this.velocity.y = Directions.stop;
    }

    public shoot(): void {
        this.bullets.push(this.bulletFactory.createBullet(this.aim.getAim()));
    }

    public update(): void {
        this.velocity.x = this.movement.x * this.speed;
        this.x += this.velocity.x;

        if (this.velocity.y > 0 && (this.state === HeroStates.jump || this.state === HeroStates.stay)) {
            this.state = HeroStates.fall;
        }

        this.velocity.y += this.gravityForce;
        this.y += this.velocity.y;

        this.controls.update();

        this.bullets = this.bullets.filter(bullet => !bullet.destroyed);
        this.bullets.forEach(bullet => bullet.update());
    }
}

export default Hero;
