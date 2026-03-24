import {Container, Graphics} from 'pixi.js';
import type {ISize} from '@/types';
import {type IPlatform, type IPlatformTypes, PlatformSteppableHeight, PlatformTypes} from './types';

class Platform extends Container {
    public readonly type: IPlatformTypes;
    public readonly isSteppable: boolean;

    private readonly view: Graphics = new Graphics();

    constructor({type, size, isSteppable, options}: IPlatform) {
        super(options);
        this.type = type;
        this.drawPlatform(size);
        this.isSteppable = isSteppable ?? (this.isSolid && this.height >= PlatformSteppableHeight);
    }

    private get isSolid(): boolean {
        return this.type === PlatformTypes.solid;
    }

    private drawPlatform({width, height}: ISize): void {
        this.view.setSize({width, height});
        this.view.rect(0, 0, width, height).stroke({width: 1, color: 0x00ff00});
        this.isSolid && this.view.lineTo(width, height).stroke({width: 1, color: 0x00ff00});
        this.addChild(this.view);
    }
}

export default Platform;
