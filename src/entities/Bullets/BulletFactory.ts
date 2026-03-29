import type {Container} from 'pixi.js';
import Bullet from './Bullet';
import BulletView from './BulletView';
import type {ICreateBulletParams} from './types';

class BulletFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createBullet(params: ICreateBulletParams): Bullet {
        const view = new BulletView(params);
        const bullet = new Bullet({view});
        this.world.addChild(view);
        return bullet;
    }
}

export default BulletFactory;
