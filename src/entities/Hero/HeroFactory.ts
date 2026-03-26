import type {Container} from 'pixi.js';
import type {IPos} from '@/types';
import {BulletFactory} from '../Bullets';
import Hero from './Hero';
import HeroView from './HeroView';

class HeroFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createHero(params: IPos): Hero {
        const heroView = new HeroView(params);
        const bulletFactory = new BulletFactory(this.world);
        const hero = new Hero(heroView, bulletFactory);
        this.world.addChild(heroView);
        return hero;
    }
}

export default HeroFactory;
