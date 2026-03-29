import {EntityFactory} from '../Entity';
import Bullet from './Bullet';
import BulletView from './BulletView';
import type {ICreateBulletParams} from './types';

class BulletFactory extends EntityFactory {
    public create({type, ownerId, damage, options}: ICreateBulletParams): Bullet {
        const view = new BulletView({type, options});
        const bullet = new Bullet({view, ownerId, damage});
        this.world.addChild(view);
        return bullet;
    }
}

export default BulletFactory;
