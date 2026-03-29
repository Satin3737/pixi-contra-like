import type {Container} from 'pixi.js';
import {BulletFactory} from '../Bullets';
import type {IEntityCommonParams} from '../Entity';
import Hero from './Hero';
import HeroView from './HeroView';

class HeroFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createHero(params: IEntityCommonParams): Hero {
        const view = new HeroView(params);
        const bulletFactory = new BulletFactory(this.world);
        const hero = new Hero({view, bulletFactory});
        this.world.addChild(view);
        return hero;
    }
}

export default HeroFactory;
