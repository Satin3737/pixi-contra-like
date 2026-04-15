import type {IPosSize} from '@/types';
import type {World} from '@/core';
import type {Hero} from '@/entities';

export interface ICamera {
    target: Hero;
    world: World;
    screenSize: IPosSize;
    isBackScroll: boolean;
}
