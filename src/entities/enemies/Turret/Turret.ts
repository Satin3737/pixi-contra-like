import {type ITicker} from '@/types';
import {BaseAppSize} from '@/core';
import {Entity} from '../../Entity';
import {Weapon} from '../../Weapon';
import type {IGetTarget} from '../Enemy';
import TurretView from './TurretView';
import {type ITurretParams, TurretHitBoxConfig} from './types';

class Turret extends Entity<TurretView> {
    private readonly weapon: Weapon;
    private readonly getTarget: IGetTarget;
    private readonly rotationSpeed: number = 0.02;
    private readonly shootCooldown: number = 120;

    private lastShootTime: number = 0;

    public constructor({view, health, getTarget, onShoot}: ITurretParams) {
        super({view, health});
        this.getTarget = getTarget;
        this.hitbox = TurretHitBoxConfig;
        this.weapon = new Weapon({ownerId: this.uid, onShoot});
    }

    public override update({deltaTime}: ITicker): void {
        const target = this.getTarget();
        if (!target) return;

        if (!this.isActive) {
            this.isActive = this.x - target.x < BaseAppSize.width * 0.5 + this.bounds.width;
            return;
        }

        const center = this.centerPoint;
        if (!center) return;

        const targetAngle = Math.atan2(target.y - center.y, target.x - center.x);
        const diff = targetAngle - this.view.barrelRotation;
        const normalized = Math.atan2(Math.sin(diff), Math.cos(diff));
        this.view.barrelRotation += normalized * this.rotationSpeed * deltaTime;

        this.lastShootTime += deltaTime;

        if (this.lastShootTime >= this.shootCooldown) {
            this.lastShootTime = 0;
            this.shoot();
        }
    }

    private shoot(): void {
        const center = this.centerPoint ?? this;
        this.weapon.fire({x: center.x, y: center.y, rotation: this.view.barrelRotation});
    }
}

export default Turret;
