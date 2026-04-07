import type {IValueOf} from '@/types';
import type {ICreateBulletParams} from '../Bullets';

export interface IAimContext {
    x: number;
    y: number;
    rotation: number;
}

export interface IShootParams extends Omit<ICreateBulletParams, 'options'> {
    aimContext: IAimContext;
}

export type IOnShoot = (params: IShootParams) => void;

export const WeaponTypes = {
    none: 'none',
    regular: 'regular',
    melee: 'melee',
    spread: 'spread'
} as const;

export type IWeaponTypes = IValueOf<typeof WeaponTypes>;

export interface IWeaponParams {
    ownerId: number;
    onShoot: IOnShoot;
    type?: IWeaponTypes;
    damage?: number;
}
