import type {ContainerOptions} from 'pixi.js';
import type {ISize} from '@/types';

export interface IEntityCommonParams {
    options?: ContainerOptions;
}

export interface IEntityParams<TEntityView> {
    view: TEntityView;
    health?: number;
    damage?: number;
}

export interface IEntityViewParams extends IEntityCommonParams {
    size: ISize;
}
