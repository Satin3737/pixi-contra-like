import type {Container} from 'pixi.js';
import type {IPosSize} from '@/types';
import type {Hero} from '@/entities';

export interface ICamera {
    target: Hero;
    world: Container;
    screenSize: IPosSize;
    isBackScroll: boolean;
}
