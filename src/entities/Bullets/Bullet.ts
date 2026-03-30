import type {ITicker} from '@/types';
import {Entity} from '../Entity';
import type BulletView from './BulletView';
import type {IBulletParams} from './types';

class Bullet extends Entity<BulletView> {
    public readonly ownerId: number;

    private readonly speed: number = 24;

    public constructor({view, ownerId, damage}: IBulletParams) {
        super({view, damage});
        this.ownerId = ownerId;
    }

    public override update({deltaTime}: ITicker): void {
        this.x += this.speed * Math.cos(this.view.rotation) * deltaTime;
        this.y += this.speed * Math.sin(this.view.rotation) * deltaTime;
    }
}

export default Bullet;
