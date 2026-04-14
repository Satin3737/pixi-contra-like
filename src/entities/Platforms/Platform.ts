import {Entity} from '../Entity';
import type PlatformView from './PlatformView';
import {type IPlatformParams, type IPlatformTypes, PlatformDefaultHeight, PlatformTypes} from './types';

class Platform extends Entity<PlatformView> {
    public readonly type: IPlatformTypes;
    public readonly isSteppable: boolean;

    public constructor({view, type, health, isSteppable}: IPlatformParams) {
        super({view, health: health ?? Infinity});
        this.type = type;
        this.isSteppable = isSteppable ?? (this.isSolid && this.bounds.height <= PlatformDefaultHeight);
    }

    private get isSolid(): boolean {
        return this.type === PlatformTypes.solid;
    }
}

export default Platform;
