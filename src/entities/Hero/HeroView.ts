import {Container, type ContainerOptions, Graphics} from 'pixi.js';
import type {ISize} from '@/interfaces';

class HeroView extends Container {
    private readonly view = new Graphics();

    constructor(options?: ContainerOptions) {
        super(options);

        this.drawHero({
            width: options?.width || 0,
            height: options?.height || 0
        });
    }

    private drawHero(size: ISize): void {
        const {width, height} = size;
        const halfWidth = width * 0.5;

        this.pivot.x = halfWidth;

        this.view.rect(halfWidth, 0, width, height).stroke({width: 1, color: 0x0000ff});
        this.view.rect(halfWidth, 30, 50, 10).stroke({width: 1, color: 0x0000ff});

        this.addChild(this.view);
    }
}

export default HeroView;
