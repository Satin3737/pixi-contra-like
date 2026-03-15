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
