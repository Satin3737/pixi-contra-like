import {Graphics} from 'pixi.js';
import {EntityView} from '../Entity';
import {BulletHitBoxConfigs, BulletSizes, BulletTypes, type IBulletTypes, type IBulletViewParams} from './types';

class BulletView extends EntityView {
    public constructor({type, options}: IBulletViewParams) {
        super({size: BulletSizes[type], options});
        this.drawBullet(type);
        this.drawDebugHitBox(type);
        this.view.addChild(this.debugHitBox);
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

    private drawDebugHitBox(type: IBulletTypes): void {
        const {shiftX, shiftY, width, height} = BulletHitBoxConfigs[type];
        this.debugHitBox
            .rect(shiftX, shiftY, width, height)
            .fill({color: 0xff0000, alpha: 0.35})
            .stroke({width: 1, color: 0xff0000, alpha: 0.9});
    }

    private drawRegularBullet(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x00ff00});
        this.view.addChild(graphics);
    }
}

export default BulletView;
