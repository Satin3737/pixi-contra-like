import type {IValueOf} from '@/types';
import type {IEntityCommonParams} from '../Entity';
import type {IAimContext, IOnShoot} from '../Weapon';
import type HeroView from './HeroView';

export interface ICreateHeroParams extends IEntityCommonParams {
    onShoot: IOnShoot;
}

export interface IHeroParams extends Pick<ICreateHeroParams, 'onShoot'> {
    view: HeroView;
}

export const HeroStates = {
    stay: 'stay',
    run: 'run',
    jump: 'jump',
    fall: 'fall'
} as const;

export type IHeroStates = IValueOf<typeof HeroStates>;

export const HeroViewStates = {
    stay: 'stay',
    stayUp: 'stayUp',
    stayDown: 'stayDown',
    run: 'run',
    runUp: 'runUp',
    runDown: 'runDown',
    jump: 'jump',
    lay: 'lay'
} as const;

export type IHeroViewStates = IValueOf<typeof HeroViewStates>;

export const HeroAimConfigs: Record<IHeroViewStates, IAimContext> = {
    [HeroViewStates.stay]: {x: 60, y: 35, rotation: 0},
    [HeroViewStates.stayUp]: {x: 10, y: -20, rotation: -Math.PI / 2},
    [HeroViewStates.stayDown]: {x: 10, y: 90, rotation: Math.PI / 2},
    [HeroViewStates.run]: {x: 60, y: 35, rotation: 0},
    [HeroViewStates.runUp]: {x: 40, y: -20, rotation: Math.atan2(-50, 40)},
    [HeroViewStates.runDown]: {x: 40, y: 60, rotation: Math.PI / 4},
    [HeroViewStates.jump]: {x: 30, y: 45, rotation: 0},
    [HeroViewStates.lay]: {x: 20, y: 70, rotation: 0}
} as const;
