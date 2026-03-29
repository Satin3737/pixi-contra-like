import type {IPosSize} from '@/types';
import type EntityView from './EntityView';
import type {IEntityParams} from './types';

class Entity<TEntityView extends EntityView = EntityView> {
    public readonly view: TEntityView;

    public constructor({view}: IEntityParams<TEntityView>) {
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

    public get uid(): number {
        return this.view.uid;
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
}

export default Entity;
