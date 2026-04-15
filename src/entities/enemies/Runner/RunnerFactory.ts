import type {IEntityCommonParams} from '@/entities';
import {EnemyFactory} from '../Enemy';
import Runner from './Runner';
import RunnerView from './RunnerView';

class RunnerFactory extends EnemyFactory<IEntityCommonParams, Runner> {
    public create(params: IEntityCommonParams): Runner {
        const view = new RunnerView(params);
        const runner = new Runner({view, onShoot: this.onShoot});
        this.world.game.addChild(view);
        return runner;
    }
}

export default RunnerFactory;
