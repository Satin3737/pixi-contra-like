import type {Container, ContainerOptions} from 'pixi.js';
import Bullet from './Bullet';
import BulletView from './BulletView';

class BulletFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createBullet(options?: ContainerOptions): Bullet {
        const bulletView = new BulletView(options);
        const bullet = new Bullet(bulletView);
        this.world.addChild(bulletView);
        return bullet;
    }
}

export default BulletFactory;
