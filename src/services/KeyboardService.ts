import type {IKeyCallback, IKeys, IKeysCallbacks} from '@/interfaces';
import {Keys} from '@/const';

class KeyboardService {
    private readonly keysCallbacks: IKeysCallbacks;

    constructor() {
        this.keysCallbacks = Object.values(Keys).reduce<IKeysCallbacks>((acc, key) => {
            acc[key] = {onUp: [], onDown: []};
            return acc;
        }, {} as IKeysCallbacks);

        this.initListeners();
    }

    private initListeners(): void {
        document.addEventListener('keydown', event => this.onKeyDown(event));
        document.addEventListener('keyup', event => this.onKeyUp(event));
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (event.code in this.keysCallbacks) {
            this.keysCallbacks[event.code as IKeys].onDown.forEach(cb => cb(event));
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (event.code in this.keysCallbacks) {
            this.keysCallbacks[event.code as IKeys].onUp.forEach(cb => cb(event));
        }
    }

    public attachKeyDown(key: IKeys, callback: IKeyCallback): void {
        this.keysCallbacks[key].onDown.push(callback);
    }

    public attachKeyUp(key: IKeys, callback: IKeyCallback): void {
        this.keysCallbacks[key].onUp.push(callback);
    }
}

export default KeyboardService;
