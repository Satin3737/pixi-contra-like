import type {Container} from 'pixi.js';
import type {IPos} from '@/types';
import Runner from './Runner';
import RunnerView from './RunnerView';

class RunnerFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createRunner(params: IPos): Runner {
        const runnerView = new RunnerView(params);
        const runner = new Runner(runnerView);
        this.world.addChild(runnerView);
        return runner;
    }
}

export default RunnerFactory;
