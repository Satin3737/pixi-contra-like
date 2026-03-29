import {Graphics} from 'pixi.js';
import {EntityView} from '../Entity';
import {BulletSizes, BulletTypes, type IBulletTypes, type IBulletViewParams} from './types';

class BulletView extends EntityView {
    public constructor({type, options}: IBulletViewParams) {
        super({size: BulletSizes[type], options});
        this.drawBullet(type);
    }

    private drawBullet(type: IBulletTypes) {
        switch (type) {
            case BulletTypes.regular:
                this.drawRegularBullet();
                break;
            default:
                this.drawRegularBullet();
        }
    }

    private drawRegularBullet(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x00ff00});
        this.view.addChild(graphics);
    }
}

export default BulletView;
