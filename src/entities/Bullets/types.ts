import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/types';
import type {IEntityHitBoxConfig} from '../Entity';
import type BulletView from './BulletView';

export const BulletTypes = {
    regular: 'regular'
} as const;

export type IBulletTypes = IValueOf<typeof BulletTypes>;

export const BulletSizes: Record<IBulletTypes, ISize> = {
    [BulletTypes.regular]: {width: 4, height: 4}
} as const;

export const BulletHitBoxConfigs: Record<IBulletTypes, IEntityHitBoxConfig> = {
    [BulletTypes.regular]: {shiftX: 0, shiftY: 0, width: 4, height: 4}
} as const;

export interface ICreateBulletParams {
    type: IBulletTypes;
    ownerId: number;
    damage: number;
    options?: ContainerOptions;
}

export interface IBulletParams extends Omit<ICreateBulletParams, 'options'> {
    view: BulletView;
}

export type IBulletViewParams = Omit<ICreateBulletParams, 'ownerId' | 'damage'>;
