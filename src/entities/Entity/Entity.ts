import type {IPos, IPosSize, ITicker} from '@/types';
import type EntityView from './EntityView';
import {EntityCategories, type IEntityCategories, type IEntityParams} from './types';

class Entity<TEntityView extends EntityView = EntityView> {
    public readonly view: TEntityView;
    public readonly category: IEntityCategories = EntityCategories.entity;

    private _health: number = 1;
    private _damage: number = 1;

    public constructor({view, health, damage}: IEntityParams<TEntityView>) {
        this.view = view;
        if (health !== undefined) this._health = health;
        if (damage !== undefined) this._damage = damage;
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

    public get centerPoint(): IPos | undefined {
        if (this.destroyed) return;
        const {x, y, width, height} = this.bounds;
        return {x: x + width * 0.5, y: y + height * 0.5};
    }

    public get health(): number {
        return this._health;
    }

    public get damage(): number {
        return this._damage;
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

    public takeDamage(amount: number): void {
        this._health -= amount;
        if (this._health <= 0) this.destroy();
    }

    public update(_: ITicker): void {}

    public destroy(): void {
        this.view.destroy();
    }
}

export default Entity;
