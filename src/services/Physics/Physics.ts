import type {ICollision, IPos, IPosSize} from '@/types';

class Physics {
    public static isOutOfBoundsAll(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return (
            this.isOutOfBoundsOnlyTop(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyBottom(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyLeft(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyRight(entity, cameraBounds)
        );
    }

    public static isOutOfBoundsLeft(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return (
            this.isOutOfBoundsOnlyTop(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyBottom(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyLeft(entity, cameraBounds)
        );
    }

    public static isOutOfBoundsRight(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return (
            this.isOutOfBoundsOnlyTop(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyBottom(entity, cameraBounds) ||
            this.isOutOfBoundsOnlyRight(entity, cameraBounds)
        );
    }

    public static isOutOfBoundsOnlyTop(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return entity.y + entity.height < -cameraBounds.y;
    }

    public static isOutOfBoundsOnlyBottom(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return entity.y > cameraBounds.height - cameraBounds.y;
    }

    public static isOutOfBoundsOnlyLeft(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return entity.x + entity.width < -cameraBounds.x;
    }

    public static isOutOfBoundsOnlyRight(entity: IPosSize, cameraBounds: IPosSize): boolean {
        return entity.x > cameraBounds.width - cameraBounds.x;
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
