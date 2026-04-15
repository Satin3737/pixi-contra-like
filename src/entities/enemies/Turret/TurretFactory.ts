import {EnemyFactory} from '../Enemy';
import Turret from './Turret';
import TurretView from './TurretView';
import type {ICreateTurretParams} from './types';

class TurretFactory extends EnemyFactory<ICreateTurretParams, Turret> {
    public create({health, options}: ICreateTurretParams): Turret {
        const view = new TurretView({options});
        const turret = new Turret({view, health, getTarget: this.getTarget, onShoot: this.onShoot});
        this.world.game.addChild(view);
        return turret;
    }
}

export default TurretFactory;
