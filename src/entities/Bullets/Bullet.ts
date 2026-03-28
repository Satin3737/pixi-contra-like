import type {ITicker} from '@/types';
import {Entity} from '../Entity';
import type BulletView from './BulletView';

class Bullet extends Entity<BulletView> {
    private readonly speed: number = 24;

    public update({deltaTime}: ITicker): void {
        this.x += this.speed * Math.cos(this.view.rotation) * deltaTime;
        this.y += this.speed * Math.sin(this.view.rotation) * deltaTime;
    }
}

export default Bullet;
