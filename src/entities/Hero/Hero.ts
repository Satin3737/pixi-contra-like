import {Directions, type IDirections, type ITicker} from '@/types';
import {Character} from '../Entity';
import {type IPlatformTypes, PlatformTypes} from '../Platforms';
import {Weapon, WeaponTypes} from '../Weapon';
import HeroControls from './HeroControls';
import HeroView from './HeroView';
import {HeroAimConfigs, HeroHitBoxConfigs, HeroStates, type IHeroParams, type IHeroStates} from './types';

class Hero extends Character<HeroView> {
    public readonly weapon: Weapon;

    protected override readonly speed: number = 6;

    private readonly controls: HeroControls;

    private state: IHeroStates = HeroStates.stay;
    private movementContext: {left: IDirections; right: IDirections} = {left: Directions.stop, right: Directions.stop};

    public constructor({view, onShoot}: IHeroParams) {
        super({view});

        this.controls = new HeroControls(this);
        this.weapon = new Weapon({type: WeaponTypes.spread, ownerId: this.uid, onShoot});
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
        if (this.isInAir || (isDown && this.stayOn === PlatformTypes.solid)) return;
        this.stayOn = null;
        this.state = HeroStates.jump;
        !isDown && (this.velocity.y = -this.jumpForce);
    }

    public land(y: number, platformType: IPlatformTypes): void {
        this.stayOn = platformType;
        this.state = HeroStates.stay;
        this.y = y - this.bounds.height;
        this.velocity.y = Directions.stop;
    }

    public shoot(): void {
        if (this.destroyed) return;
        const config = HeroAimConfigs[this.controls.aimState];
        const facingLeft = this.view.direction === Directions.left;

        this.weapon.fire({
            x: this.x + (facingLeft ? this.bounds.width - config.x : config.x),
            y: this.y + config.y,
            rotation: facingLeft ? Math.PI - config.rotation : config.rotation
        });
    }

    public override update({deltaTime}: ITicker): void {
        if (!this.isActive) return;

        this.velocity.x = this.movement.x * this.speed * deltaTime;
        this.x += this.velocity.x;

        if (this.velocity.y > 0 && (this.state === HeroStates.jump || this.state === HeroStates.stay)) {
            this.state = HeroStates.fall;
        }

        this.velocity.y += this.gravityForce * deltaTime;
        this.y += this.velocity.y;

        this.controls.update();
        this.updateHitBox();
    }

    private updateHitBox(): void {
        const hitConfig = HeroHitBoxConfigs[this.view.state];
        const facingLeft = this.view.direction === Directions.left;

        this.hitbox = facingLeft
            ? {...hitConfig, shiftX: this.bounds.width - hitConfig.shiftX - hitConfig.width}
            : hitConfig;
    }
}

export default Hero;
