import type {IEntityCommonParams} from '../../Entity';
import type {IEnemyTargeting} from '../Enemy';
import type TurretView from './TurretView';

export interface ICreateTurretParams extends IEntityCommonParams {
    health?: number;
}

export interface ITurretParams extends Omit<ICreateTurretParams, 'options'>, IEnemyTargeting {
    view: TurretView;
}
