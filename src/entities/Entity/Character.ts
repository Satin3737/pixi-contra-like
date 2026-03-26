import Entity from './Entity';
import type EntityView from './EntityView';

abstract class Character<TCharacterView extends EntityView = EntityView> extends Entity<TCharacterView> {
    public abstract get isSkipCollision(): boolean;

    public abstract get isInAir(): boolean;

    public abstract land(y: number, isSolid: boolean): void;
}

export default Character;
