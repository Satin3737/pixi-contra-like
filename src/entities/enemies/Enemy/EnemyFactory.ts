import {type Entity, EntityFactory} from '../../Entity';
import type {IOnShoot} from '../../Weapon';
import type {IEnemyFactoryParams, IGetTarget} from './types';

abstract class EnemyFactory<TParams, TEntity extends Entity> extends EntityFactory {
    protected readonly onShoot: IOnShoot;
    protected readonly getTarget: IGetTarget;

    public constructor({world, onShoot, getTarget}: IEnemyFactoryParams) {
        super(world);
        this.onShoot = onShoot;
        this.getTarget = getTarget;
    }

    public abstract create(params: TParams): TEntity;
}

export default EnemyFactory;
