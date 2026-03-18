import {Container, Graphics} from 'pixi.js';
import type {IPosSize} from '@/types';
import type {IBullet} from './types';

class Bullet extends Container {
    private readonly view: Graphics = new Graphics();
    private readonly speed: number = 12;

    constructor(options: IBullet) {
        super(options);
        this.drawBullet();
    }

    public isOutOfBounds(cameraBounds: IPosSize): boolean {
        return (
            this.x > cameraBounds.width - cameraBounds.x ||
            this.x < -cameraBounds.x ||
            this.y > cameraBounds.height - cameraBounds.y ||
            this.y < -cameraBounds.y
        );
    }

    public update(): void {
        this.x += this.speed * Math.cos(this.rotation);
        this.y += this.speed * Math.sin(this.rotation);
    }

    private drawBullet(): void {
        this.view.rect(0, 0, 4, 4).stroke({width: 1, color: 0x00ff00});
        this.addChild(this.view);
    }
}

export default Bullet;
