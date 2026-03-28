import {type ContainerOptions, Graphics} from 'pixi.js';
import {EntityView} from '../Entity';

class BulletView extends EntityView {
    constructor(options?: ContainerOptions) {
        super({width: 4, height: 4}, options);
        this.drawBullet();
    }

    private drawBullet(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, 4, 4).stroke({width: 1, color: 0x00ff00});
        this.view.addChild(graphics);
        this.addChild(this.view);
    }
}

export default BulletView;
