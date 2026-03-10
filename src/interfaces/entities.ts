import type {IValueOf} from '@/interfaces';
import type {Directions} from '@/const';

export interface IPos {
    x: number;
    y: number;
}

export interface ISize {
    width: number;
    height: number;
}

export type IPosSize = IPos & ISize;

export type IDirections = IValueOf<typeof Directions>;
