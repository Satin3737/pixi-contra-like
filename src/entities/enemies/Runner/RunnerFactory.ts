import type {Container, ContainerOptions} from 'pixi.js';
import Runner from './Runner';
import RunnerView from './RunnerView';

class RunnerFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createRunner(options?: ContainerOptions): Runner {
        const runnerView = new RunnerView(options);
        const runner = new Runner(runnerView);
        this.world.addChild(runnerView);
        return runner;
    }
}

export default RunnerFactory;
