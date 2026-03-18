import type {Container} from 'pixi.js';
import Bullet from './Bullet';
import type {IBullet} from './types';

class BulletFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createBullet(params: IBullet): Bullet {
        const bullet = new Bullet(params);
        this.world.addChild(bullet);
        return bullet;
    }
}

export default BulletFactory;
