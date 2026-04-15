import type {Entity, IEnemyFactoryParams, Platform} from '@/entities';

export interface IStageFactoryParams extends IEnemyFactoryParams {
    platforms: Platform[];
    entities: Entity[];
}
