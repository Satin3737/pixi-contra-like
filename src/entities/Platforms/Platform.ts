import {Container, Graphics} from 'pixi.js';
import type {IPlatform, IPlatformTypes, ISize} from '@/interfaces';
import {PlatformSteppableHeight, PlatformTypes} from '@/const';

class Platform extends Container {
    private readonly view: Graphics = new Graphics();
    public readonly type: IPlatformTypes;
    public readonly isSteppable: boolean;

    constructor({type, size, options}: IPlatform) {
        super(options);

        this.type = type;
        this.setSize(size);

        this.drawPlatform(size);
        this.addChild(this.view);

        this.isSteppable = this.type === PlatformTypes.solid && this.height >= PlatformSteppableHeight;
    }

    private drawPlatform({width, height}: ISize): void {
        this.view.rect(0, 0, width, height).stroke({width: 2, color: 0x00ff00});
        this.type === PlatformTypes.solid && this.view.lineTo(width, height).stroke({width: 2, color: 0x00ff00});
    }
}

export default Platform;
