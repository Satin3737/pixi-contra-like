import type {IValueOf} from '@/types';
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
