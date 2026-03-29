import {type ITicker} from '@/types';
import {BulletTypes, type IOnShoot} from '../../Bullets';
import {Entity} from '../../Entity';
import TurretView from './TurretView';
import type {IGetTarget, ITurretParams} from './types';

class Turret extends Entity<TurretView> {
    private readonly onShoot: IOnShoot;
    private readonly getTarget: IGetTarget;
    private readonly rotationSpeed: number = 0.02;
    private readonly shootCooldown: number = 120;

    private lastShootTime: number = 0;

    public constructor({view, health, getTarget, onShoot}: ITurretParams) {
        super({view, health});
        this.onShoot = onShoot;
        this.getTarget = getTarget;
    }

    public update({deltaTime}: ITicker): void {
        const target = this.getTarget();
        if (!target) return;

        const targetAngle = Math.atan2(target.y - this.y, target.x - this.x);
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
        this.onShoot({
            type: BulletTypes.regular,
            ownerId: this.uid,
            damage: this.damage,
            options: {
                y: this.y + this.bounds.width / 2,
                x: this.x + this.bounds.height / 2,
                rotation: this.view.barrelRotation
            }
        });
    }
}

export default Turret;
