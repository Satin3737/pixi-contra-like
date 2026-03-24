import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/types';

export interface IPlatform {
    type: IPlatformTypes;
    size: ISize;
    isSteppable?: boolean;
    options?: ContainerOptions;
}

export const PlatformTypes = {
    normal: 'normal',
    solid: 'solid'
} as const;

export type IPlatformTypes = IValueOf<typeof PlatformTypes>;

export const PlatformSteppableHeight = 20;
