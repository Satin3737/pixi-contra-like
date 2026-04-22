import type {ContainerOptions} from 'pixi.js';
import type {IPosSize, ISize, IValueOf} from '@/types';

export const EntityCategories = {
    entity: 'entity',
    character: 'character'
} as const;

export type IEntityCategories = IValueOf<typeof EntityCategories>;

export interface IEntityCommonParams {
    options?: ContainerOptions;
}

export interface IEntityParams<TEntityView> {
    view: TEntityView;
    health?: number;
}

export interface IEntityViewParams extends IEntityCommonParams {
    size: ISize;
}

export interface IEntityHitBox extends IPosSize {
    shiftX: number;
    shiftY: number;
}

export type IEntityHitBoxConfig = Omit<IEntityHitBox, 'x' | 'y'>;
