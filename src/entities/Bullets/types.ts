import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/types';
import type BulletView from './BulletView';

export const BulletTypes = {
    regular: 'regular'
} as const;

export type IBulletTypes = IValueOf<typeof BulletTypes>;

export const BulletSizes: Record<IBulletTypes, ISize> = {
    [BulletTypes.regular]: {width: 4, height: 4}
} as const;

export interface ICreateBulletParams {
    type: IBulletTypes;
    ownerId: number;
    options?: ContainerOptions;
}

export interface IBulletParams extends Pick<ICreateBulletParams, 'ownerId'> {
    view: BulletView;
}

export type IBulletViewParams = Omit<ICreateBulletParams, 'ownerId'>;

export type IOnShoot = (params: ICreateBulletParams) => void;
