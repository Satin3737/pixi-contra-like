import type {Container} from 'pixi.js';
import {Hero} from '@/entities';
import type {ICamera} from './types';

class Camera {
    private readonly target: Hero;
    private readonly world: Container;
    private readonly isBackScroll: boolean;
    private readonly centerScreenPosX: number;
    private readonly rightBorderPosX: number;

    private lastTargetX: number = 0;

    constructor({target, world, screenSize, isBackScroll}: ICamera) {
        this.target = target;
        this.world = world;
        this.isBackScroll = isBackScroll;

        this.centerScreenPosX = screenSize.width / 2;
        this.rightBorderPosX = this.world.width - this.centerScreenPosX;
    }

    public update(): void {
        if (
            this.target.x > this.centerScreenPosX &&
            this.target.x < this.rightBorderPosX &&
            (this.isBackScroll || this.target.x > this.lastTargetX)
        ) {
            this.world.x = this.centerScreenPosX - this.target.x;
            this.lastTargetX = this.target.x;
        }
    }
}

export default Camera;
