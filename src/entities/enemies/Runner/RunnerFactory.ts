import {EntityFactory, type IEntityCommonParams} from '../../Entity';
import Runner from './Runner';
import RunnerView from './RunnerView';

class RunnerFactory extends EntityFactory {
    public create(params: IEntityCommonParams): Runner {
        const view = new RunnerView(params);
        const runner = new Runner({view});
        this.world.addChild(view);
        return runner;
    }
}

export default RunnerFactory;
