import type {IEntityCommonParams} from '../../Entity';
import type {IOnShoot} from '../../Weapon';
import type {IGetTarget} from '../Enemy/types';
import type TurretView from './TurretView';

export interface ICreateTurretParams extends IEntityCommonParams {
    health?: number;
}

export interface ITurretParams extends Omit<ICreateTurretParams, 'options'> {
    view: TurretView;
    getTarget: IGetTarget;
    onShoot: IOnShoot;
}
