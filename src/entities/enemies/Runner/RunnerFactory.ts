import {EntityFactory} from '../../Entity';
import Runner from './Runner';
import RunnerView from './RunnerView';
import type {ICreateRunnerParams} from './types';

class RunnerFactory extends EntityFactory {
    public create({onShoot, ...params}: ICreateRunnerParams): Runner {
        const view = new RunnerView(params);
        const runner = new Runner({view, onShoot});
        this.world.addChild(view);
        return runner;
    }
}

export default RunnerFactory;
