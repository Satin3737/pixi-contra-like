import {Graphics} from 'pixi.js';
import {BaseAppSize} from '@/Core/const';
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
            case PlatformViewTypes.bridge:
                this.drawBridgePlatform();
                break;
            case PlatformViewTypes.boss:
                this.drawBossWall();
                break;
            default:
                this.drawJunglePlatform();
        }
    }

    private drawJunglePlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).fill(0x00ff00);
        graphics.rect(0, this.bounds.height, this.bounds.width, BaseAppSize.height).fill(0x694216);
        this.view.addChild(graphics);
    }

    private drawJungleDarkPlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).fill(0x00ff00);
        graphics.rect(0, this.bounds.height, this.bounds.width, BaseAppSize.height).fill(0x694216);
        graphics.lineTo(this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x000000});
        this.view.addChild(graphics);
    }

    private drawWaterPlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, -this.bounds.height, this.bounds.width, this.bounds.height).fill(0x0000ff);
        this.view.addChild(graphics);
    }

    private drawBridgePlatform(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).fill(0xffffff);
        this.view.addChild(graphics);
    }

    private drawBossWall(): void {
        const graphics = new Graphics();
        graphics.rect(0, 0, this.bounds.width, this.bounds.height).fill(0xff0000);
        graphics.lineTo(this.bounds.width, this.bounds.height).stroke({width: 1, color: 0x000000});
        this.view.addChild(graphics);
    }
}

export default PlatformView;
