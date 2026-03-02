import type {Application, Container} from 'pixi.js';
import type {ICollision, IPos} from '@/interfaces';
import {KeyboardService} from '@/services';
import {Hero, Platform, PlatformFactory} from '@/entities';

class Game {
    private readonly app: Application;
    private readonly platformFactory: PlatformFactory = new PlatformFactory();
    private readonly platforms: Platform[] = [];
    private readonly hero: Hero;
    public readonly keyboardService: KeyboardService = new KeyboardService();

    constructor(app: Application) {
        this.app = app;
        this.hero = new Hero(this, {x: 100, y: 0});

        this.platforms.push(this.platformFactory.createPlatform({x: 50, y: 300}));
        this.platforms.push(this.platformFactory.createPlatform({x: 300, y: 360}));
        this.platforms.push(this.platformFactory.createPlatform({x: 500, y: 300}));

        this.app.stage.addChild(this.hero, ...this.platforms);
        this.app.ticker.add(this.update, this);
    }

    private isAABBCollision(a: Container, b: Container): boolean {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    private isCollision(a: Container, b: Container, prevPos: IPos): ICollision {
        const result = {vertical: false, horizontal: false};

        if (!this.isAABBCollision(a, b)) return result;

        const currY = a.y;
        a.y = prevPos.y;

        this.isAABBCollision(a, b) ? (result.horizontal = true) : (result.vertical = true);

        a.y = currY;
        return result;
    }

    private update(): void {
        const prevHeroPos = this.hero.position.clone();

        this.hero.update();

        for (const platform of this.platforms) {
            const collision = this.isCollision(this.hero, platform, prevHeroPos);

            if (collision.vertical) {
                this.hero.y = prevHeroPos.y;
                this.hero.stay();
            }

            if (collision.horizontal) {
                this.hero.x = prevHeroPos.x;
            }
        }
    }
}

export default Game;
