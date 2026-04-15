import type {IEntityCommonParams} from '../Entity';
import type {IEnemyFactoryParams} from './Enemy';
import {type Runner, RunnerFactory} from './Runner';
import {type ICreateTurretParams, type Turret, TurretFactory} from './Turret';

class EnemiesFactory {
    private readonly runnerFactory: RunnerFactory;
    private readonly turretFactory: TurretFactory;

    public constructor(params: IEnemyFactoryParams) {
        this.runnerFactory = new RunnerFactory(params);
        this.turretFactory = new TurretFactory(params);
    }

    public createRunner(params: IEntityCommonParams): Runner {
        return this.runnerFactory.create(params);
    }

    public createTurret(params: ICreateTurretParams): Turret {
        return this.turretFactory.create(params);
    }
}

export default EnemiesFactory;
