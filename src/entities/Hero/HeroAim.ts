import type Hero from './Hero';
import type {IAimContext} from './types';

class HeroAim {
    private readonly hero: Hero;
    private readonly aimContext: IAimContext;

    constructor(hero: Hero) {
        this.hero = hero;
        this.aimContext = {x: this.hero.x, y: this.hero.y, rotation: 0};
    }

    public getAim(): IAimContext {
        return this.aimContext;
    }

    public setAim({x, y, rotation}: IAimContext): void {
        this.aimContext.x = x;
        this.aimContext.y = y;
        this.aimContext.rotation = rotation;
    }
}

export default HeroAim;
