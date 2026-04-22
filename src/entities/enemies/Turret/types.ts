import type {IEntityCommonParams, IEntityHitBoxConfig} from '../../Entity';
import type {IEnemyTargeting} from '../Enemy';
import type TurretView from './TurretView';

export interface ICreateTurretParams extends IEntityCommonParams {
    health?: number;
}

export interface ITurretParams extends Omit<ICreateTurretParams, 'options'>, IEnemyTargeting {
    view: TurretView;
}

export const TurretHitBoxConfig: IEntityHitBoxConfig = {shiftX: 0, shiftY: 0, width: 100, height: 100} as const;
