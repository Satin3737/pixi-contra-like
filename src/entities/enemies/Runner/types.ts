import type {IValueOf} from '@/types';
import type {IEntityCommonParams} from '../../Entity';
import type {IOnShoot} from '../../Weapon';
import type RunnerView from './RunnerView';

export interface ICreateRunnerParams extends IEntityCommonParams {
    onShoot: IOnShoot;
}

export interface IRunnerParams extends Pick<ICreateRunnerParams, 'onShoot'> {
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
