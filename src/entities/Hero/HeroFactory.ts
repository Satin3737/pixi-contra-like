import {EntityFactory} from '../Entity';
import Hero from './Hero';
import HeroView from './HeroView';
import type {ICreateHeroParams} from './types';

class HeroFactory extends EntityFactory<ICreateHeroParams, Hero> {
    public create({onShoot, ...params}: ICreateHeroParams): Hero {
        const view = new HeroView(params);
        const hero = new Hero({view, onShoot});
        this.world.game.addChild(view);
        return hero;
    }
}

export default HeroFactory;
