import {Directions, type IMovement, type ITicker} from '@/types';
import {getRandomBoolean} from '@/utils';
import {BaseAppSize} from '@/core';
import {Character} from '../../Entity';
import {type IPlatformTypes, PlatformTypes} from '../../Platforms';
import {Weapon, WeaponTypes} from '../../Weapon';
import type {IGetTarget} from '../Enemy';
import RunnerView from './RunnerView';
import {type IRunnerParams, type IRunnerStates, RunnerHitBoxConfigs, RunnerStates} from './types';

class Runner extends Character<RunnerView> {
    public readonly weapon: Weapon;

    protected override movement: IMovement = {x: Directions.left, y: Directions.stop};

    private readonly getTarget: IGetTarget;

    private state: IRunnerStates = RunnerStates.run;

    public constructor({view, onShoot, getTarget}: IRunnerParams) {
        super({view});

        this.getTarget = getTarget;
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

    public land(y: number, platformType: IPlatformTypes): void {
        this.stayOn = platformType;
        this.state = RunnerStates.run;
        this.y = y - this.bounds.height;
        this.velocity.y = Directions.stop;
    }

    public override update({deltaTime}: ITicker): void {
        if (!this.isActive) {
            const target = this.getTarget();
            this.isActive = !!target && this.x - target.x < BaseAppSize.width * 0.5 + this.bounds.width;
            return;
        }

        this.velocity.x = this.movement.x * this.speed * deltaTime;
        this.x += this.velocity.x;

        if (this.velocity.y > 0) {
            if (!this.isInAir && this.stayOn !== PlatformTypes.solid && getRandomBoolean()) {
                this.jump();
            } else {
                this.state = RunnerStates.fall;
            }
        }

        this.velocity.y += this.gravityForce * deltaTime;
        this.y += this.velocity.y;

        this.view.show(this.state);
        this.hitbox = RunnerHitBoxConfigs[this.state];
    }
}

export default Runner;
