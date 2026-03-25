import type {Container} from 'pixi.js';
import Runner from './Runner';
import type {IRunner} from './types';

class RunnerFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createRunner(params: IRunner): Runner {
        return new Runner(this.world, params);
    }
}

export default RunnerFactory;
