import type {ICollision, IPos, IPosSize} from '@/types';

class Physics {
    public static isOutOfBounds(entity: IPos, cameraBounds: IPosSize): boolean {
        return (
            entity.x > cameraBounds.width - cameraBounds.x ||
            entity.x < -cameraBounds.x ||
            entity.y > cameraBounds.height - cameraBounds.y ||
            entity.y < -cameraBounds.y
        );
    }

    public static isAABBCollision(a: IPosSize, b: IPosSize): boolean {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    public static getPlatformCollision(bounds: IPosSize, platform: IPosSize, prevPos: IPos): ICollision {
        const result = {vertical: false, horizontal: false};
        if (!this.isAABBCollision(bounds, platform)) return result;

        const reverted = {...bounds, y: prevPos.y};
        this.isAABBCollision(reverted, platform) ? (result.horizontal = true) : (result.vertical = true);

        return result;
    }
}

export default Physics;
