import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/interfaces';
import {PlatformTypes} from '@/const';

export type IPlatformTypes = IValueOf<typeof PlatformTypes>;

export interface IPlatform {
    type: IPlatformTypes;
    size: ISize;
    options?: ContainerOptions;
}
