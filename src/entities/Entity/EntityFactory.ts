import type {Container} from 'pixi.js';
import type Entity from './Entity';

abstract class EntityFactory {
    protected readonly world: Container;

    public constructor(world: Container) {
        this.world = world;
    }

    public abstract create(params: unknown): Entity;
}

export default EntityFactory;
