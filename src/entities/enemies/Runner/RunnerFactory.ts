import type {Container} from 'pixi.js';
import type {IEntityCommonParams} from '@/entities';
import Runner from './Runner';
import RunnerView from './RunnerView';

class RunnerFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createRunner(params: IEntityCommonParams): Runner {
        const view = new RunnerView(params);
        const runner = new Runner({view});
        this.world.addChild(view);
        return runner;
    }
}

export default RunnerFactory;
