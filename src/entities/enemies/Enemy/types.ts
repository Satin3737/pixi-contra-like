import type {IPos} from '@/types';
import type World from '@/Core/World';
import type {IOnShoot} from '../../Weapon';

export type IGetTarget = () => IPos | undefined;

export interface IEnemyFactoryParams {
    world: World;
    onShoot: IOnShoot;
    getTarget: IGetTarget;
}
