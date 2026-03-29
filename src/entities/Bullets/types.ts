import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/types';

export const BulletTypes = {
    regular: 'regular'
} as const;

export type IBulletTypes = IValueOf<typeof BulletTypes>;

export const BulletSizes: Record<IBulletTypes, ISize> = {
    [BulletTypes.regular]: {width: 4, height: 4}
} as const;

export interface ICreateBulletParams {
    type: IBulletTypes;
    options?: ContainerOptions;
}

export type IBulletViewParams = ICreateBulletParams;
