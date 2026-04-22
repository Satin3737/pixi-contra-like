import type {IValueOf} from '@/types';
import type {IEntityHitBoxConfig} from '../../Entity';
import type {IEnemyTargeting} from '../Enemy';
import type RunnerView from './RunnerView';

export interface IRunnerParams extends IEnemyTargeting {
    view: RunnerView;
}

export const RunnerStates = {
    run: 'run',
    jump: 'jump',
    fall: 'fall'
} as const;

export type IRunnerStates = IValueOf<typeof RunnerStates>;

export const RunnerViewStates = {
    run: 'run',
    jump: 'jump',
    fall: 'fall'
} as const;

export type IRunnerViewStates = IValueOf<typeof RunnerViewStates>;

export const RunnerHitBoxConfigs: Record<IRunnerViewStates, IEntityHitBoxConfig> = {
    [RunnerViewStates.run]: {shiftX: 0, shiftY: 0, width: 20, height: 80},
    [RunnerViewStates.jump]: {shiftX: -10, shiftY: 25, width: 40, height: 40},
    [RunnerViewStates.fall]: {shiftX: -10, shiftY: 25, width: 40, height: 40}
} as const;
