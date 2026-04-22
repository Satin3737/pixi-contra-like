import type {IValueOf} from '@/types';

export const Keys = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    space: 'Space',
    a: 'KeyA',
    h: 'KeyH'
} as const;

export const KeyEvents = {
    keyDown: 'keydown',
    keyUp: 'keyup'
} as const;

export type IKeys = IValueOf<typeof Keys>;
export type IKeyEvents = IValueOf<typeof KeyEvents>;

export type IKeyUpDownCallback = (event: KeyboardEvent) => void;
export type IKeyPressedCallback = (isPressed: boolean, event: KeyboardEvent) => void;

export type IKeyUpDownCallbacks = Record<IKeys, Record<IKeyEvents, IKeyUpDownCallback[]>>;
export type IPressedCallbacks = Record<IKeys, IKeyPressedCallback[]>;
