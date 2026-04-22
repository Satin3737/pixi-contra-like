import type {ITicker} from '@/types';
import {Entity} from '../Entity';
import type BulletView from './BulletView';
import {BulletHitBoxConfigs, type IBulletParams} from './types';

class Bullet extends Entity<BulletView> {
    public readonly ownerId: number;
    public readonly damage: number;

    private readonly speed: number = 16;

    public constructor({view, ownerId, damage, type}: IBulletParams) {
        super({view});
        this.ownerId = ownerId;
        this.damage = damage;
        this.hitbox = BulletHitBoxConfigs[type];
    }

    public override update({deltaTime}: ITicker): void {
        this.x += this.speed * Math.cos(this.view.rotation) * deltaTime;
        this.y += this.speed * Math.sin(this.view.rotation) * deltaTime;
    }
}

export default Bullet;
