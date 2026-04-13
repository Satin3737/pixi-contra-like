import {Graphics} from 'pixi.js';
import {EntityView} from '../Entity';
import {DefaultPlatformSize, type IPlatformViewParams, type IPlatformViewTypes, PlatformViewTypes} from './types';

class PlatformView extends EntityView {
    public constructor({viewType, position, size = DefaultPlatformSize}: IPlatformViewParams) {
        super({size, options: position});
        this.drawPlatform(viewType);
    }

    private drawPlatform(type: IPlatformViewTypes): void {
        switch (type) {
            case PlatformViewTypes.jungle:
                this.drawJunglePlatform();
                break;
            case PlatformViewTypes.jungleDark:
                this.drawJungleDarkPlatform();
                break;
            case PlatformViewTypes.water:
                this.drawWaterPlatform();
                break;
            default:
                this.drawJunglePlatform();
        }
    }

    private drawJunglePlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x000000}).fill(0x00ff00);
        this.view.addChild(graphics);
    }

    private drawJungleDarkPlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x000000}).fill(0x00ff00);
        graphics.lineTo(this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x000000});
        this.view.addChild(graphics);
    }

    private drawWaterPlatform(): void {
        const graphics = new Graphics();
        graphics
            .rect(0, -this.bounds.height, this.bounds.width, this.bounds.height)
            .stroke({width: 1, color: 0x000000})
            .fill(0x0000ff);
        graphics.lineTo(this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x000000});
        this.view.addChild(graphics);
    }
}

export default PlatformView;
