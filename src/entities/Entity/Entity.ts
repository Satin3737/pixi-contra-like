import type {IPosSize, ITicker} from '@/types';
import type EntityView from './EntityView';

abstract class Entity<TEntityView extends EntityView = EntityView> {
    public readonly view: TEntityView;

    constructor(view: TEntityView) {
        this.view = view;
    }

    public get x(): number {
        return this.view.x;
    }

    public set x(value: number) {
        this.view.x = value;
    }

    public get y(): number {
        return this.view.y;
    }

    public set y(value: number) {
        this.view.y = value;
    }

    public get bounds(): IPosSize {
        return this.view.bounds;
    }

    public get destroyed(): boolean {
        return this.view.destroyed;
    }

    public destroy(): void {
        this.view.destroy();
    }

    public abstract update({deltaTime}: ITicker): void;
}

export default Entity;
