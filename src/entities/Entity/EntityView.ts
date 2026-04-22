import {Container, Graphics} from 'pixi.js';
import {Directions, type IDirections, type IPosSize, type ISize} from '@/types';
import type {IEntityViewParams} from './types';

class EntityView extends Container {
    private static readonly _debugInstances = new Set<EntityView>();
    private static _debugEnabled = false;

    protected readonly view = new Container();
    protected readonly debugHitBox: Graphics = new Graphics();

    private readonly size: ISize;

    protected constructor({size, options}: IEntityViewParams) {
        super(options);
        this.size = size;

        const halfWidth = this.bounds.width * 0.5;
        this.view.pivot.x = halfWidth;
        this.view.x = halfWidth;
        this.addChild(this.view);

        this.debugHitBox.visible = EntityView._debugEnabled;
        EntityView._debugInstances.add(this);
    }

    public get bounds(): IPosSize {
        return {
            x: this.x,
            y: this.y,
            width: this.size.width,
            height: this.size.height
        };
    }

    public get direction(): IDirections {
        const scaleX = this.view.scale.x;
        if (scaleX === Directions.left) return Directions.left;
        if (scaleX === Directions.right) return Directions.right;
        return Directions.stop;
    }

    public static get debugEnabled(): boolean {
        return EntityView._debugEnabled;
    }

    public static setDebugMode(enabled: boolean): void {
        EntityView._debugEnabled = enabled;
        EntityView._debugInstances.forEach(instance => {
            instance.debugHitBox.visible = enabled;
        });
    }

    public override destroy(): void {
        EntityView._debugInstances.delete(this);
        super.destroy();
    }

    public flip(direction: IDirections) {
        this.view.scale.x = direction;
    }
}

export default EntityView;
