import type {Container, ContainerOptions} from 'pixi.js';
import {BulletFactory} from '../Bullets';
import Hero from './Hero';
import HeroView from './HeroView';

class HeroFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createHero(options?: ContainerOptions): Hero {
        const heroView = new HeroView(options);
        const bulletFactory = new BulletFactory(this.world);
        const hero = new Hero(heroView, bulletFactory);
        this.world.addChild(heroView);
        return hero;
    }
}

export default HeroFactory;
