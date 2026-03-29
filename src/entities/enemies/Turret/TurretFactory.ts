import {EntityFactory} from '../../Entity';
import Turret from './Turret';
import TurretView from './TurretView';
import type {ICreateTurretParams} from './types';

class TurretFactory extends EntityFactory {
    public create({getTarget, onShoot, health, options}: ICreateTurretParams): Turret {
        const view = new TurretView({options});
        const turret = new Turret({view, health, getTarget, onShoot});
        this.world.addChild(view);
        return turret;
    }
}

export default TurretFactory;
