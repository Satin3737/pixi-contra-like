import type {Container} from 'pixi.js';
import type {IPlatform} from '@/interfaces';
import Platform from './Platform';

class PlatformFactory {
    private readonly world: Container;

    constructor(world: Container) {
        this.world = world;
    }

    public createPlatform(params: IPlatform): Platform {
        const platform = new Platform(params);
        this.world.addChild(platform);
        return platform;
    }
}

export default PlatformFactory;
