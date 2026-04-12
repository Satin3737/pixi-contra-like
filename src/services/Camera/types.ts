import type {IPosSize} from '@/types';
import type {Hero} from '@/entities';
import type World from '@/Core/World';

export interface ICamera {
    target: Hero;
    world: World;
    screenSize: IPosSize;
    isBackScroll: boolean;
}
