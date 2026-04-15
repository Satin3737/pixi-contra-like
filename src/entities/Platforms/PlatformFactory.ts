import {EntityFactory} from '../Entity';
import Platform from './Platform';
import PlatformView from './PlatformView';
import type {ICreatePlatformParams} from './types';

class PlatformFactory extends EntityFactory<ICreatePlatformParams, Platform> {
    public create(params: ICreatePlatformParams): Platform {
        const view = new PlatformView(params);
        const platform = new Platform({...params, view});
        this.world[params.layer].addChild(view);
        return platform;
    }
}

export default PlatformFactory;
