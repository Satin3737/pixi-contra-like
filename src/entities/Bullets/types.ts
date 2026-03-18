import type {ContainerOptions} from 'pixi.js';

export interface IBullet extends ContainerOptions {
    x: number;
    y: number;
    rotation: number;
}
