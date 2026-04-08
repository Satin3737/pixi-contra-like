import {Directions, type IDirections} from '@/types';
import {KeyEvents, Keyboard, Keys} from '@/services';
import type Hero from './Hero';
import {HeroViewStates, type IHeroViewStates} from './types';

class HeroControls {
    private readonly hero: Hero;
    private readonly keyboard: Keyboard = Keyboard.instance;

    public constructor(hero: Hero) {
        this.hero = hero;
        this.initControls();
    }

    public get isDown(): boolean {
        return this.keyboard.isPressed(Keys.down);
    }

    public get aimState(): IHeroViewStates {
        if (this.hero.isInAir) {
            if (this.isMovingX && this.isUp) return HeroViewStates.runUp;
            if (this.isMovingX && this.isDown) return HeroViewStates.runDown;
            if (this.isUp) return HeroViewStates.stayUp;
            if (this.isDown) return HeroViewStates.stayDown;
            return HeroViewStates.jump;
        }
        return this.currentViewState;
    }

    public update(): void {
        const state = this.currentViewState;
        const direction = this.currentViewDirection;
        this.hero.view.show(state);
        if (direction) this.hero.view.flip(direction);
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
