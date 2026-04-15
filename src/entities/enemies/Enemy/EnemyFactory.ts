import {type Entity, EntityFactory} from '../../Entity';
import type {IOnShoot} from '../../Weapon';
import type {IEnemyFactoryParams, IGetTarget} from './types';

abstract class EnemyFactory<TParams, TEntity extends Entity> extends EntityFactory<TParams, TEntity> {
    protected readonly onShoot: IOnShoot;
    protected readonly getTarget: IGetTarget;

    public constructor({world, onShoot, getTarget}: IEnemyFactoryParams) {
        super(world);
        this.onShoot = onShoot;
        this.getTarget = getTarget;
    }
}

export default EnemyFactory;
