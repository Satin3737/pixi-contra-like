import {Directions, type IMovement, type IPos} from '@/types';
import Entity from './Entity';
import type EntityView from './EntityView';
import {EntityCategories, type IEntityCategories} from './types';

abstract class Character<TCharacterView extends EntityView = EntityView> extends Entity<TCharacterView> {
    public override readonly category: IEntityCategories = EntityCategories.character;

    protected readonly gravityForce: number = 0.4;
    protected readonly jumpForce: number = 9;
    protected readonly speed: number = 4;

    protected velocity: IPos = {x: 0, y: 0};
    protected movement: IMovement = {x: Directions.stop, y: Directions.stop};

    public abstract get isSkipCollision(): boolean;

    public abstract get isInAir(): boolean;

    public abstract land(y: number, isSolid: boolean): void;
}

export default Character;
