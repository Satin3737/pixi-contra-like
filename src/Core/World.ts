import {Container} from 'pixi.js';

class World extends Container {
    public readonly background: Container = new Container();
    public readonly foreground: Container = new Container();
    public readonly game: Container = new Container();

    public constructor() {
        super();
        this.addChild(...[this.background, this.game, this.foreground]);
    }
}

export default World;
