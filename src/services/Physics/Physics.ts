import type {IPos, IPosSize} from '@/types';

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
}

export default Physics;
