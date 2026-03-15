import {
    type IKeyEvents,
    type IKeyPressedCallback,
    type IKeyUpDownCallback,
    type IKeyUpDownCallbacks,
    type IKeys,
    type IPressedCallbacks,
    KeyEvents,
    Keys
} from './types';

class Keyboard {
    private static _instance: Keyboard;

    private readonly pressedKeys: Set<IKeys> = new Set();
    private readonly onUpDownKeysCallbacks: IKeyUpDownCallbacks;
    private readonly onPressedKeysCallbacks: IPressedCallbacks;

    private constructor() {
        this.onUpDownKeysCallbacks = Object.values(Keys).reduce<IKeyUpDownCallbacks>((acc, key) => {
            acc[key] = {[KeyEvents.keyUp]: [], [KeyEvents.keyDown]: []};
            return acc;
        }, {} as IKeyUpDownCallbacks);

        this.onPressedKeysCallbacks = Object.values(Keys).reduce<IPressedCallbacks>((acc, key) => {
            acc[key] = [];
            return acc;
        }, {} as IPressedCallbacks);

        this.initUpDownListeners();
        this.initPressedListeners();
    }

    public static get instance(): Keyboard {
        if (!this._instance) {
            this._instance = new Keyboard();
        }

        return this._instance;
    }

    public attachKey(key: IKeys, type: IKeyEvents, callback: IKeyUpDownCallback): void {
        this.onUpDownKeysCallbacks[key][type].push(callback);
    }

    public detachKey(key: IKeys, type: IKeyEvents, callback: IKeyUpDownCallback): void {
        this.onUpDownKeysCallbacks[key][type] = this.onUpDownKeysCallbacks[key][type].filter(cb => cb !== callback);
    }

    public subscribeToPressedKeys(key: IKeys, callback: IKeyPressedCallback): void {
        this.onPressedKeysCallbacks[key].push(callback);
    }

    public unsubscribeFromPressedKeys(key: IKeys, callback: IKeyPressedCallback): void {
        this.onPressedKeysCallbacks[key] = this.onPressedKeysCallbacks[key].filter(cb => cb !== callback);
    }

    public isPressed(key: IKeys): boolean {
        return this.pressedKeys.has(key);
    }

    private initUpDownListeners(): void {
        Object.values(KeyEvents).forEach(eventType => {
            document.addEventListener(eventType, event => this.onUpDownKeyEvent(event, eventType));
        });
    }

    private initPressedListeners(): void {
        Object.values(Keys).forEach(key => {
            this.attachKey(key, KeyEvents.keyDown, event => {
                this.pressedKeys.add(key);
                this.notifyPressedKeys(key, true, event);
            });
            this.attachKey(key, KeyEvents.keyUp, event => {
                this.pressedKeys.delete(key);
                this.notifyPressedKeys(key, false, event);
            });
        });
    }

    private isKeyExists(keyCode: string): keyCode is IKeys {
        return keyCode in this.onUpDownKeysCallbacks;
    }

    private onUpDownKeyEvent(event: KeyboardEvent, type: IKeyEvents): void {
        if (!this.isKeyExists(event.code)) return;
        this.onUpDownKeysCallbacks[event.code][type].forEach(cb => cb(event));
    }

    private notifyPressedKeys(key: IKeys, isPressed: boolean, event: KeyboardEvent): void {
        this.onPressedKeysCallbacks[key].forEach(callback => callback(isPressed, event));
    }
}

export default Keyboard;
