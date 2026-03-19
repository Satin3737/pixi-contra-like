import {type Application, Container} from 'pixi.js';
import type {ICollision, IPos, IPosSize} from '@/types';
import {PlatformsData} from '@/data';
import {Camera} from '@/services';
import {Hero, Platform, PlatformFactory, PlatformTypes} from '@/entities';

class Game {
    private readonly hero: Hero;
    private readonly camera: Camera;
    private readonly world: Container;
    private readonly platforms: Platform[] = [];

    constructor(app: Application) {
        this.world = new Container();
        app.stage.addChild(this.world);

        this.hero = new Hero(this.world, {x: 100, y: 0});

        const platformFactory = new PlatformFactory(this.world);
        PlatformsData.forEach(pos => this.platforms.push(platformFactory.createPlatform(pos)));

        this.camera = new Camera({target: this.hero, world: this.world, screenSize: app.screen, isBackScroll: false});

        app.ticker.add(this.update, this);
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

        this.hero.heroBullets.forEach(bullet => {
            bullet.isOutOfBounds(this.camera.visibleAreaBounds) && bullet.destroy();
        });

        this.hero.update();

        for (const platform of this.platforms) {
            if (this.hero.isSkipCollision && platform.type !== PlatformTypes.solid) continue;

            const collision = this.getIsCollision(this.hero.bounds, platform, prevHeroPos);

            if (collision.vertical) {
                this.hero.y = prevHeroPos.y;
                this.hero.stay(platform.y);
            }

            if (collision.horizontal) {
                platform.isSteppable && this.hero.stay(platform.y);
            }
        }

        this.camera.update();
    }
}

export default Game;
