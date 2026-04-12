import type World from '@/Core/World';
import type Entity from './Entity';

abstract class EntityFactory {
    protected readonly world: World;

    public constructor(world: World) {
        this.world = world;
    }

    public abstract create(params: unknown): Entity;
}

export default EntityFactory;
