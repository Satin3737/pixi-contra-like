import type {IValueOf} from './helper';

export interface ITicker {
    deltaTime: number;
}

export const Layers = {
    game: 'game',
    foreground: 'foreground',
    background: 'background'
} as const;

export type ILayers = IValueOf<typeof Layers>;
