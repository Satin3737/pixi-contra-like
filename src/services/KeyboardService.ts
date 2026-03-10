import type {IKeyCallback, IKeyEvents, IKeys, IKeysCallbacks} from '@/interfaces';
import {KeyEvents, Keys} from '@/const';

class KeyboardService {
    private static _instance: KeyboardService;
    private readonly keysCallbacks: IKeysCallbacks;

    private constructor() {
        this.keysCallbacks = Object.values(Keys).reduce<IKeysCallbacks>((acc, key) => {
            acc[key] = {[KeyEvents.keyUp]: [], [KeyEvents.keyDown]: []};
            return acc;
        }, {} as IKeysCallbacks);

        this.initListeners();
    }

    public static get instance(): KeyboardService {
        if (!this._instance) {
            this._instance = new KeyboardService();
        }

        return this._instance;
    }

    public attachKey(key: IKeys, type: IKeyEvents, callback: IKeyCallback): void {
        this.keysCallbacks[key][type].push(callback);
    }

    public detachKey(key: IKeys, type: IKeyEvents, callback: IKeyCallback): void {
        this.keysCallbacks[key][type] = this.keysCallbacks[key][type].filter(cb => cb !== callback);
    }

    private initListeners(): void {
        Object.values(KeyEvents).forEach(eventType => {
            document.addEventListener(eventType, event => this.onKeyEvent(event, eventType));
        });
    }

    private isKeyExists(keyCode: string): keyCode is IKeys {
        return keyCode in this.keysCallbacks;
    }

    private onKeyEvent(event: KeyboardEvent, type: IKeyEvents): void {
        if (!this.isKeyExists(event.code)) return;
        this.keysCallbacks[event.code][type].forEach(cb => cb(event));
    }
}

export default KeyboardService;
