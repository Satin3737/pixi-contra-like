import type {IPlatform} from '@/interfaces';
import Platform from './Platform';

class PlatformFactory {
    public createPlatform(params: IPlatform): Platform {
        return new Platform(params);
    }
}

export default PlatformFactory;
