import type {IPos, IValueOf} from '@/types';
import type PlatformView from './PlatformView';

export interface IPlatformsData {
    y: number;
    xBlockIndexes: number[];
}

export interface ICreatePlatformParams {
    type: IPlatformTypes;
    position: IPos;
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

export const PlatformDefaultHeight = 24;
export const PlatformDefaultWidth = 128;
