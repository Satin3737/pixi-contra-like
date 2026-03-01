import type {IPos} from '@/interfaces';
import {Platform} from '@/entities';

class PlatformFactory {
    public createPlatform({x, y}: IPos): Platform {
        return new Platform({x, y});
    }
}

export default PlatformFactory;
