import type {IValueOf} from './helper';

export const Directions = {
    left: -1,
    right: 1,
    up: -1,
    down: 1,
    stop: 0
} as const;

export type IDirections = IValueOf<typeof Directions>;

export interface IPos {
    x: number;
    y: number;
}

export interface ISize {
    width: number;
    height: number;
}

export type IPosSize = IPos & ISize;

export interface ICollision {
    vertical: boolean;
    horizontal: boolean;
}
