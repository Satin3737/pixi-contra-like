import {Directions, type IMovement, type ITicker} from '@/types';
import {getRandomBoolean} from '@/utils';
import {Character} from '../../Entity';
import {Weapon, WeaponTypes} from '../../Weapon';
import RunnerView from './RunnerView';
import {type IRunnerParams, type IRunnerStates, RunnerStates} from './types';

class Runner extends Character<RunnerView> {
    public readonly weapon: Weapon;

    protected override movement: IMovement = {x: Directions.left, y: Directions.stop};

    private state: IRunnerStates = RunnerStates.run;
    private isStayOnSolid: boolean = false;

    public constructor({view, onShoot}: IRunnerParams) {
        super({view});

        this.weapon = new Weapon({type: WeaponTypes.melee, ownerId: this.uid, onShoot});
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

    public override update({deltaTime}: ITicker): void {
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
