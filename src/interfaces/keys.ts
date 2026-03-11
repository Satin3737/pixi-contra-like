import type {IValueOf} from '@/interfaces';
import {KeyEvents, Keys} from '@/const';

export type IKeys = IValueOf<typeof Keys>;

export type IKeyEvents = IValueOf<typeof KeyEvents>;

export type IKeyUpDownCallback = (event: KeyboardEvent) => void;

export type IKeyPressedCallback = (isPressed: boolean, event: KeyboardEvent) => void;

export type IKeyUpDownCallbacks = Record<IKeys, Record<IKeyEvents, IKeyUpDownCallback[]>>;

export type IPressedCallbacks = Record<IKeys, IKeyPressedCallback[]>;
