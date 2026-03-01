import {Container, type ContainerOptions, Graphics} from 'pixi.js';

class Platform extends Container {
    private readonly view: Graphics = new Graphics();

    constructor(params: ContainerOptions) {
        super(params);
        this.view.rect(0, 0, 300, 30).stroke({width: 2, color: 0x00ff00});
        this.addChild(this.view);
    }
}

export default Platform;
