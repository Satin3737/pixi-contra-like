import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/types';
import type PlatformView from './PlatformView';

export interface ICreatePlatformParams {
    size: ISize;
    type: IPlatformTypes;
    isSteppable?: boolean;
    options?: ContainerOptions;
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

export const PlatformSteppableHeight = 20;
