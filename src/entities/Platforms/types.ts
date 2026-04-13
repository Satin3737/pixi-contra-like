import type {ILayers, IPos, ISize, IValueOf} from '@/types';
import type PlatformView from './PlatformView';

export interface IPlatformsData {
    y: number;
    xBlockIndexes: number[];
}

export interface ICreatePlatformParams {
    type: IPlatformTypes;
    viewType: IPlatformViewTypes;
    position: IPos;
    layer: ILayers;
    size?: ISize;
    isSteppable?: boolean;
}

export interface IPlatformParams extends Omit<ICreatePlatformParams, 'options' | 'size'> {
    view: PlatformView;
}

export type IPlatformViewParams = Omit<ICreatePlatformParams, 'isSteppable'>;

export const PlatformTypes = {
    normal: 'normal',
    solid: 'solid'
} as const;

export type IPlatformTypes = IValueOf<typeof PlatformTypes>;

export const PlatformViewTypes = {
    jungle: 'jungle',
    jungleDark: 'jungleDark',
    water: 'water'
} as const;

export type IPlatformViewTypes = IValueOf<typeof PlatformViewTypes>;

export const PlatformDefaultHeight = 24;
export const PlatformDefaultWidth = 128;

export const DefaultPlatformSize = {width: PlatformDefaultWidth, height: PlatformDefaultHeight};
