import type {IPos} from '@/types';
import type {IOnShoot} from '../../Bullets';
import type {IEntityCommonParams} from '../../Entity';
import type TurretView from './TurretView';

export type IGetTarget = () => IPos | undefined;

export interface ICreateTurretParams extends IEntityCommonParams {
    getTarget: IGetTarget;
    onShoot: IOnShoot;
    health?: number;
}

export interface ITurretParams extends Omit<ICreateTurretParams, 'options'> {
    view: TurretView;
}
