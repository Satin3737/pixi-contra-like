import type {Container} from 'pixi.js';
import Hero from './Hero';
import HeroView from './HeroView';
import type {ICreateHeroParams} from './types';

class HeroFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createHero({onShoot, ...params}: ICreateHeroParams): Hero {
        const view = new HeroView(params);
        const hero = new Hero({view, onShoot});
        this.world.addChild(view);
        return hero;
    }
}

export default HeroFactory;
