import {KeyEvents, Keys} from '@/const';
import {KeyboardService} from '@/services';
import type {Hero} from '../';

class HeroControls {
    private readonly hero: Hero;
    private readonly keyboard: KeyboardService = KeyboardService.instance;

    constructor(hero: Hero) {
        this.hero = hero;
        this.keyboard = KeyboardService.instance;
        this.initControls();
    }

    private initControls(): void {
        this.keyboard.attachKey(Keys.left, KeyEvents.keyDown, () => this.hero.moveLeft());
        this.keyboard.attachKey(Keys.left, KeyEvents.keyUp, () => this.hero.stopMoveLeft());

        this.keyboard.attachKey(Keys.right, KeyEvents.keyDown, () => this.hero.moveRight());
        this.keyboard.attachKey(Keys.right, KeyEvents.keyUp, () => this.hero.stopMoveRight());

        this.keyboard.attachKey(Keys.up, KeyEvents.keyDown, () => this.hero.lookUp());
        this.keyboard.attachKey(Keys.up, KeyEvents.keyUp, () => this.hero.lookForward());

        this.keyboard.attachKey(Keys.down, KeyEvents.keyDown, () => this.hero.lookDown());
        this.keyboard.attachKey(Keys.down, KeyEvents.keyUp, () => this.hero.lookForward());

        this.keyboard.attachKey(Keys.space, KeyEvents.keyDown, () => this.hero.jump());
    }
}

export default HeroControls;
