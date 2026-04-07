import {BulletTypes} from '../Bullets';
import {type IAimContext, type IOnShoot, type IWeaponParams, type IWeaponTypes, WeaponTypes} from './types';

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
        if (this._type === WeaponTypes.melee) return;

        this.onShoot({
            type: BulletTypes.regular,
            ownerId: this.ownerId,
            damage: this.damage,
            aimContext
        });
    }
}

export default Weapon;
