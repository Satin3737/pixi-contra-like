import type {World} from '@/core';
import type Entity from './Entity';

abstract class EntityFactory<TParams, TEntity extends Entity> {
    protected readonly world: World;

    public constructor(world: World) {
        this.world = world;
    }

    public abstract create(params: TParams): TEntity;
}

export default EntityFactory;
