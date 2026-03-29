import type {Container} from 'pixi.js';
import type {IPosSize} from '@/types';
import {Entity} from '@/entities';
import type {ICamera} from './types';

class Camera {
    private readonly target: Entity;
    private readonly world: Container;
    private readonly isBackScroll: boolean;
    private readonly centerScreenPosX: number;
    private readonly rightBorderPosX: number;
    private readonly screenSize: IPosSize;

    private lastTargetX: number = 0;

    constructor({target, world, screenSize, isBackScroll}: ICamera) {
        this.target = target;
        this.world = world;
        this.screenSize = screenSize;
        this.isBackScroll = isBackScroll;

        this.centerScreenPosX = this.screenSize.width / 2;
        this.rightBorderPosX = this.world.width - this.centerScreenPosX;
    }

    public get visibleAreaBounds(): IPosSize {
        return {
            x: this.world.x,
            y: this.world.y,
            width: this.screenSize.width,
            height: this.screenSize.height
        };
    }

    public update(): void {
        if (this.target.destroyed) return;

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
