import type {Container} from 'pixi.js';
import type {ISize} from '@/types';
import type {Hero} from '@/entities';

export interface ICamera {
    target: Hero;
    world: Container;
    screenSize: ISize;
    isBackScroll: boolean;
}
