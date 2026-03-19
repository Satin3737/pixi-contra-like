import {Directions, type IDirections} from '@/types';
import {KeyEvents, Keyboard, Keys} from '@/services';
import type Hero from './Hero';
import {AimConfigs, HeroViewStates, type IHeroViewStates} from './types';

class HeroControls {
    private readonly hero: Hero;
    private readonly keyboard: Keyboard = Keyboard.instance;

    constructor(hero: Hero) {
        this.hero = hero;
        this.initControls();
    }

    public get isDown(): boolean {
        return this.keyboard.isPressed(Keys.down);
    }

    public update(): void {
        const state = this.currentViewState;
        const config = AimConfigs[state];
        const direction = this.currentViewDirection;

        this.hero.view.show(state);
        if (direction) this.hero.view.flip(direction);

        const facingLeft = this.hero.view.direction === Directions.left;

        this.hero.aim.setAim({
            x: this.hero.x + (facingLeft ? this.hero.bounds.width - config.x : config.x),
            y: this.hero.y + config.y,
            rotation: facingLeft ? Math.PI - config.rotation : config.rotation
        });
    }

    private get isUp(): boolean {
        return this.keyboard.isPressed(Keys.up);
    }

    private get isLeft(): boolean {
        return this.keyboard.isPressed(Keys.left);
    }

    private get isRight(): boolean {
        return this.keyboard.isPressed(Keys.right);
    }

    private get isMovingX(): boolean {
        return this.isLeft !== this.isRight;
    }

    private get currentViewState(): IHeroViewStates {
        let state: IHeroViewStates = HeroViewStates.stay;

        if (this.hero.isInAir) state = HeroViewStates.jump;
        else if (this.isMovingX && this.isUp) state = HeroViewStates.runUp;
        else if (this.isMovingX && this.isDown) state = HeroViewStates.runDown;
        else if (this.isMovingX) state = HeroViewStates.run;
        else if (this.isUp) state = HeroViewStates.stayUp;
        else if (this.isDown) state = HeroViewStates.lay;

        return state;
    }

    private get currentViewDirection(): IDirections | undefined {
        if (this.isLeft && !this.isRight) return Directions.left;
        if (this.isRight && !this.isLeft) return Directions.right;
        return;
    }

    private initControls(): void {
        this.keyboard.subscribeToPressedKeys(Keys.left, isPressed => {
            isPressed ? this.hero.moveLeft() : this.hero.stopMoveLeft();
        });

        this.keyboard.subscribeToPressedKeys(Keys.right, isPressed => {
            isPressed ? this.hero.moveRight() : this.hero.stopMoveRight();
        });

        this.keyboard.attachKey(Keys.space, KeyEvents.keyDown, () => {
            this.hero.jump(this.isDown);
        });

        this.keyboard.attachKey(Keys.a, KeyEvents.keyDown, () => {
            this.hero.shoot();
        });
    }
}

export default HeroControls;
