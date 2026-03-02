import type {IValueOf} from '@/interfaces';
import {KeyEvents, Keys} from '@/const';

export type IKeys = IValueOf<typeof Keys>;

export type IKeyEvents = IValueOf<typeof KeyEvents>;

export type IKeyCallback = (event: KeyboardEvent) => void;

export type IKeysCallbacks = Record<IKeys, Record<IKeyEvents, IKeyCallback[]>>;
