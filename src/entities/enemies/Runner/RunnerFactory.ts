import type {Container} from 'pixi.js';
import type {IPos} from '@/types';
import Runner from './Runner';

class RunnerFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createRunner(params: IPos): Runner {
        return new Runner(this.world, params);
    }
}

export default RunnerFactory;
