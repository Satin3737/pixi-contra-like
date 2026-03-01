import {Keys} from '@/const';
import type {IValueOf} from '@/interfaces';

export type IKeys = IValueOf<typeof Keys>;

export type IKeyCallback = (event: KeyboardEvent) => void;

export type IKeysCallbacks = Record<
    IKeys,
    {
        onUp: IKeyCallback[];
        onDown: IKeyCallback[];
    }
>;
