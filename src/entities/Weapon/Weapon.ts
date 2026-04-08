import {BulletTypes} from '../Bullets';
import {
    type IAimContext,
    type IOnShoot,
    type IShootParams,
    type IWeaponParams,
    type IWeaponTypes,
    WeaponTypes
} from './types';

class Weapon {
    private _type: IWeaponTypes = WeaponTypes.regular;
    private _damage: number = 1;

    private readonly ownerId: number;
    private readonly onShoot: IOnShoot;

    public constructor({ownerId, onShoot, type, damage}: IWeaponParams) {
        this.ownerId = ownerId;
        this.onShoot = onShoot;
        if (type) this._type = type;
        if (damage) this._damage = damage;
    }

    public get type(): IWeaponTypes {
        return this._type;
    }

    public set type(type: IWeaponTypes) {
        this._type = type;
    }

    public get damage(): number {
        return this._damage;
    }

    public set damage(value: number) {
        this._damage = value;
    }

    public fire(aimContext: IAimContext): void {
        switch (this._type) {
            case WeaponTypes.none:
            case WeaponTypes.melee:
                return;
            case WeaponTypes.spread:
                this.fireSpread(aimContext);
                break;
            case WeaponTypes.regular:
                this.fireRegular(aimContext);
                break;
            default:
                this.fireRegular(aimContext);
        }
    }

    private get commonShootParams(): Omit<IShootParams, 'aimContext'> {
        return {
            type: BulletTypes.regular,
            ownerId: this.ownerId,
            damage: this.damage
        };
    }

    private fireRegular(aimContext: IAimContext) {
        this.onShoot({...this.commonShootParams, aimContext});
    }

    private fireSpread(aimContext: IAimContext) {
        const spreadAngle = 0.1;
        const bulletCount = 5;
        const startAngle = aimContext.rotation - spreadAngle * (bulletCount - 1) * 0.5;

        for (let i = 0; i < bulletCount; i++) {
            this.onShoot({
                ...this.commonShootParams,
                aimContext: {...aimContext, rotation: startAngle + spreadAngle * i}
            });
        }
    }
}

export default Weapon;
