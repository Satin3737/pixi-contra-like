import type {IViewStates} from '@/interfaces';
import {Directions, KeyEvents, Keys, ViewStates} from '@/const';
import {KeyboardService} from '@/services';
import type {Hero} from '../';

class HeroControls {
    private readonly hero: Hero;
    private readonly keyboard: KeyboardService = KeyboardService.instance;

    constructor(hero: Hero) {
        this.hero = hero;
        this.initControls();
    }

    public updateViewState(): void {
        const isUp = this.keyboard.isPressed(Keys.up);
        const isDown = this.keyboard.isPressed(Keys.down);
        const isLeft = this.keyboard.isPressed(Keys.left);
        const isRight = this.keyboard.isPressed(Keys.right);
        const isMovingX = isLeft !== isRight;

        let state: IViewStates = ViewStates.stay;

        if (this.hero.isInAir) state = ViewStates.jump;
        else if (isMovingX && isUp) state = ViewStates.runUp;
        else if (isMovingX && isDown) state = ViewStates.runDown;
        else if (isMovingX) state = ViewStates.run;
        else if (isUp) state = ViewStates.stayUp;
        else if (isDown) state = ViewStates.lay;

        this.hero.view.show(state);

        if (isLeft && !isRight) this.hero.view.flip(Directions.left);
        if (isRight && !isLeft) this.hero.view.flip(Directions.right);
    }

    private initControls(): void {
        this.keyboard.subscribeToPressedKeys(Keys.left, isPressed => {
            isPressed ? this.hero.moveLeft() : this.hero.stopMoveLeft();
            this.updateViewState();
        });

        this.keyboard.subscribeToPressedKeys(Keys.right, isPressed => {
            isPressed ? this.hero.moveRight() : this.hero.stopMoveRight();
            this.updateViewState();
        });

        this.keyboard.subscribeToPressedKeys(Keys.up, isPressed => {
            isPressed ? this.hero.lookUp() : this.hero.lookForward();
            this.updateViewState();
        });

        this.keyboard.subscribeToPressedKeys(Keys.down, isPressed => {
            isPressed ? this.hero.lookDown() : this.hero.lookForward();
            this.updateViewState();
        });

        this.keyboard.attachKey(Keys.space, KeyEvents.keyDown, () => {
            this.hero.jump();
            this.updateViewState();
        });
    }
}

export default HeroControls;
