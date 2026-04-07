import type {ContainerOptions} from 'pixi.js';
import type {ISize, IValueOf} from '@/types';

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
