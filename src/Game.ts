import type {Application, Container} from 'pixi.js';
import {KeyboardService} from '@/services';
import {Hero, Platform, PlatformFactory} from '@/entities';

class Game {
    private readonly app: Application;
    private readonly platformFactory: PlatformFactory;
    private readonly platforms: Platform[];
    private readonly hero: Hero;
    public readonly keyboardService: KeyboardService;

    constructor(app: Application) {
        this.app = app;
        this.platformFactory = new PlatformFactory();
        this.keyboardService = new KeyboardService();
        this.platforms = [];

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

    private update(): void {
        const prevHeroPos = this.hero.position.clone();

        this.hero.update();

        for (const platform of this.platforms) {
            if (!this.isAABBCollision(this.hero, platform)) {
                continue;
            }

            const currY = this.hero.y;
            this.hero.y = prevHeroPos.y;

            if (!this.isAABBCollision(this.hero, platform)) {
                this.hero.stay();
                continue;
            }

            this.hero.y = currY;
            this.hero.x = prevHeroPos.x;
        }
    }
}

export default Game;
