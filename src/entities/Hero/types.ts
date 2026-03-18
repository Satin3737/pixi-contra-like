import type {IValueOf} from '@/types';

export const Directions = {
    left: -1,
    right: 1,
    up: -1,
    down: 1,
    stop: 0
} as const;

export type IDirections = IValueOf<typeof Directions>;

export const States = {
    stay: 'stay',
    run: 'run',
    jump: 'jump',
    fall: 'fall'
} as const;

export type IStates = IValueOf<typeof States>;

export const ViewStates = {
    stay: 'stay',
    stayUp: 'stayUp',
    stayDown: 'stayDown',
    run: 'run',
    runUp: 'runUp',
    runDown: 'runDown',
    jump: 'jump',
    lay: 'lay'
} as const;

export type IViewStates = IValueOf<typeof ViewStates>;

export interface IAimContext {
    x: number;
    y: number;
    rotation: number;
}

export const AimConfigs: Record<IViewStates, IAimContext> = {
    [ViewStates.stay]:     {x: 60, y: 35,  rotation: 0},
    [ViewStates.stayUp]:   {x: 10, y: -20, rotation: -Math.PI / 2},
    [ViewStates.stayDown]: {x: 10, y: 90,  rotation: Math.PI / 2},
    [ViewStates.run]:      {x: 60, y: 35,  rotation: 0},
    [ViewStates.runUp]:    {x: 40, y: -20, rotation: Math.atan2(-50, 40)},
    [ViewStates.runDown]:  {x: 40, y: 60,  rotation: Math.PI / 4},
    [ViewStates.jump]:     {x: 30, y: 45,  rotation: 0},
    [ViewStates.lay]:      {x: 20, y: 70,  rotation: 0}
} as const;
