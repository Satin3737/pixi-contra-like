import type {IValueOf} from '@/types';
import type {IOnShoot} from '../../Weapon';
import type RunnerView from './RunnerView';

export interface IRunnerParams {
    view: RunnerView;
    onShoot: IOnShoot;
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
