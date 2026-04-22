import type {IPos, IPosSize, ITicker} from '@/types';
import type EntityView from './EntityView';
import {
    EntityCategories,
    type IEntityCategories,
    type IEntityHitBox,
    type IEntityHitBoxConfig,
    type IEntityParams
} from './types';

class Entity<TEntityView extends EntityView = EntityView> {
    public readonly view: TEntityView;
    public readonly category: IEntityCategories = EntityCategories.entity;

    protected _isCircleHitbox: boolean = false;

    private readonly _hitBox: IEntityHitBoxConfig;

    private _isActive: boolean = false;
    private _health: number = 1;

    protected constructor({view, health}: IEntityParams<TEntityView>) {
        this.view = view;
        this._hitBox = {shiftX: 0, shiftY: 0, ...this.bounds};
        if (health !== undefined) this._health = health;
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

    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(value: boolean) {
        this._isActive = value;
    }

    public get centerPoint(): IPos | undefined {
        if (this.destroyed) return;
        const {x, y, width, height} = this.bounds;
        return {x: x + width * 0.5, y: y + height * 0.5};
    }

    public get health(): number {
        return this._health;
    }

    public get uid(): number {
        return this.view.uid;
    }

    public get isCircleHitbox(): boolean {
        return this._isCircleHitbox;
    }

    public get hitbox(): IEntityHitBox {
        return {
            ...this._hitBox,
            x: this.bounds.x + this._hitBox.shiftX,
            y: this.bounds.y + this._hitBox.shiftY
        };
    }

    public set hitbox(value: IEntityHitBoxConfig) {
        this._hitBox.width = value.width;
        this._hitBox.height = value.height;
        this._hitBox.shiftX = value.shiftX;
        this._hitBox.shiftY = value.shiftY;
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

    public destroy(): void {
        this.view.destroy();
    }

    public update(_: ITicker): void {}
}

export default Entity;
