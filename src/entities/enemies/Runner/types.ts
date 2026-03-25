import type {IValueOf} from '@/types';

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

export interface IRunner {
    x: number;
    y: number;
}
