import {Directions, type IDirections, type ITicker} from '@/types';
import {BulletTypes, type IBulletTypes, type IOnShoot} from '../Bullets';
import {Character} from '../Entity';
import HeroAim from './HeroAim';
import HeroControls from './HeroControls';
import HeroView from './HeroView';
import {HeroStates, type IHeroParams, type IHeroStates} from './types';

class Hero extends Character<HeroView> {
    public readonly aim: HeroAim;

    protected override readonly speed: number = 6;

    private readonly controls: HeroControls;
    private readonly onShoot: IOnShoot;

    private state: IHeroStates = HeroStates.stay;
    private movementContext: {left: IDirections; right: IDirections} = {left: Directions.stop, right: Directions.stop};
    private bulletType: IBulletTypes = BulletTypes.regular;

    public constructor({view, onShoot}: IHeroParams) {
        super({view});

        this.aim = new HeroAim(this);
        this.controls = new HeroControls(this);
        this.onShoot = onShoot;
    }

    public get isInAir(): boolean {
        return this.state === HeroStates.jump || this.state === HeroStates.fall;
    }

    public get isSkipCollision(): boolean {
        return this.state === HeroStates.jump;
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
        this.onShoot({
            type: this.bulletType,
            ownerId: this.uid,
            damage: this.damage,
            options: this.aim.getAim()
        });
    }

    public override update({deltaTime}: ITicker): void {
        this.velocity.x = this.movement.x * this.speed * deltaTime;
        this.x += this.velocity.x;

        if (this.velocity.y > 0 && (this.state === HeroStates.jump || this.state === HeroStates.stay)) {
            this.state = HeroStates.fall;
        }

        this.velocity.y += this.gravityForce * deltaTime;
        this.y += this.velocity.y;

        this.controls.update();
    }
}

export default Hero;
