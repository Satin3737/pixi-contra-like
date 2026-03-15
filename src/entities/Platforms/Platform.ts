import {Container, Graphics} from 'pixi.js';
import type {ISize} from '@/types';
import {type IPlatform, type IPlatformTypes, PlatformSteppableHeight, PlatformTypes} from './types';

class Platform extends Container {
    public readonly type: IPlatformTypes;
    public readonly isSteppable: boolean;

    private readonly view: Graphics = new Graphics();

    constructor({type, size, options}: IPlatform) {
        super(options);

        this.type = type;
        this.drawPlatform(size);
        this.isSteppable = this.type === PlatformTypes.solid && this.height >= PlatformSteppableHeight;
    }

    private drawPlatform({width, height}: ISize): void {
        this.view.setSize({width, height});
        this.view.rect(0, 0, width, height).stroke({width: 1, color: 0x00ff00});
        this.type === PlatformTypes.solid && this.view.lineTo(width, height).stroke({width: 1, color: 0x00ff00});
        this.addChild(this.view);
    }
}

export default Platform;
