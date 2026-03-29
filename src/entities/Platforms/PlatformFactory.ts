import type {Container} from 'pixi.js';
import Platform from './Platform';
import PlatformView from './PlatformView';
import type {ICreatePlatformParams} from './types';

class PlatformFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createPlatform(params: ICreatePlatformParams): Platform {
        const view = new PlatformView(params);
        const platform = new Platform({...params, view});
        this.world.addChild(view);
        return platform;
    }
}

export default PlatformFactory;
