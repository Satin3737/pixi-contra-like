import type {IPos} from '@/types';
import type {World} from '@/core';
import type {IOnShoot} from '../../Weapon';

export type IGetTarget = () => IPos | undefined;

export interface IEnemyTargeting {
    onShoot: IOnShoot;
    getTarget: IGetTarget;
}

export interface IEnemyFactoryParams extends IEnemyTargeting {
    world: World;
}
