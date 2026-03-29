import {Graphics} from 'pixi.js';
import {EntityView} from '../Entity';
import {type IPlatformTypes, type IPlatformViewParams, PlatformTypes} from './types';

class PlatformView extends EntityView {
    public constructor({type, size, options}: IPlatformViewParams) {
        super({size, options});
        this.drawPlatform(type);
    }

    private drawPlatform(type: IPlatformTypes): void {
        switch (type) {
            case PlatformTypes.normal:
                this.drawNormalPlatform();
                break;
            case PlatformTypes.solid:
                this.drawSolidPlatform();
                break;
            default:
                this.drawNormalPlatform();
        }
    }

    private drawNormalPlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x00ff00});
        this.view.addChild(graphics);
    }

    private drawSolidPlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x00ff00});
        graphics.lineTo(this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x00ff00});
        this.view.addChild(graphics);
    }
}

export default PlatformView;
