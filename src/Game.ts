import type {Application} from 'pixi.js';
import type {ICollision, IPos, IPosSize} from '@/interfaces';
import {PlatformTypes} from '@/const';
import {PlatformsData} from '@/data';
import {Hero, Platform, PlatformFactory} from '@/entities';

class Game {
    private readonly app: Application;
    private readonly platformFactory: PlatformFactory = new PlatformFactory();
    private readonly platforms: Platform[] = [];
    private readonly hero: Hero;

    constructor(app: Application) {
        this.app = app;
        this.hero = new Hero(this.app.stage, {x: 100, y: 0});

        PlatformsData.forEach(pos => this.platforms.push(this.platformFactory.createPlatform(pos)));

        this.app.stage.addChild(...this.platforms);
        this.app.ticker.add(this.update, this);
    }

    private isAABBCollision(a: IPosSize, b: IPosSize): boolean {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    private getIsCollision(aa: IPosSize, bb: IPosSize, aaPrevPos: IPos): ICollision {
        const result = {vertical: false, horizontal: false};
        if (!this.isAABBCollision(aa, bb)) return result;
        aa.y = aaPrevPos.y;
        this.isAABBCollision(aa, bb) ? (result.horizontal = true) : (result.vertical = true);
        return result;
    }

    private update(): void {
        const prevHeroPos = this.hero.bounds;

        this.hero.update();

        for (const platform of this.platforms) {
            if (this.hero.isSkipCollision && platform.type !== PlatformTypes.solid) continue;

            const collision = this.getIsCollision(this.hero.bounds, platform, prevHeroPos);

            if (collision.vertical) {
                this.hero.y = prevHeroPos.y;
                this.hero.stay(platform.y);
            }

            if (collision.horizontal) {
                if (platform.isSteppable) {
                    this.hero.stay(platform.y);
                }
            }
        }
    }
}

export default Game;
