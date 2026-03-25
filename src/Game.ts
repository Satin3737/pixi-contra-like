import {type Application, Container} from 'pixi.js';
import type {ICollision, IPos, IPosSize} from '@/types';
import {EnemiesData, PlatformsData} from '@/data';
import {Camera} from '@/services';
import {Hero, Platform, PlatformFactory, PlatformTypes} from '@/entities';
import {Runner, RunnerFactory} from '@/entities/enemies/Runner';

class Game {
    private readonly hero: Hero;
    private readonly camera: Camera;
    private readonly world: Container;
    private readonly platforms: Platform[] = [];

    private enemies: Runner[] = [];

    constructor(app: Application) {
        this.world = new Container();
        app.stage.addChild(this.world);

        this.hero = new Hero(this.world, {x: 100, y: 0});

        const runnerFactory = new RunnerFactory(this.world);
        const platformFactory = new PlatformFactory(this.world);

        EnemiesData.forEach(params => this.enemies.push(runnerFactory.createRunner(params)));
        PlatformsData.forEach(params => this.platforms.push(platformFactory.createPlatform(params)));

        this.camera = new Camera({target: this.hero, world: this.world, screenSize: app.screen, isBackScroll: false});

        app.ticker.add(this.update, this);
    }

    private isOutOfBounds(entity: IPos, cameraBounds: IPosSize): boolean {
        return (
            entity.x > cameraBounds.width - cameraBounds.x ||
            entity.x < -cameraBounds.x ||
            entity.y > cameraBounds.height - cameraBounds.y ||
            entity.y < -cameraBounds.y
        );
    }

    private isAABBCollision(a: IPosSize, b: IPosSize): boolean {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    private getPlatformCollision(bounds: IPosSize, platform: IPosSize, prevPos: IPos): ICollision {
        const result = {vertical: false, horizontal: false};
        if (!this.isAABBCollision(bounds, platform)) return result;

        const reverted = {...bounds, y: prevPos.y};
        this.isAABBCollision(reverted, platform) ? (result.horizontal = true) : (result.vertical = true);

        return result;
    }

    private checkPlatformCollision(character: Hero | Runner, prevPos: IPos, platform: Platform): void {
        const isSolid = platform.type === PlatformTypes.solid;
        if (character.isSkipCollision && !isSolid) return;

        const collision = this.getPlatformCollision(character.bounds, platform, prevPos);
        collision.vertical && character.land(platform.y, isSolid);

        if (collision.horizontal) {
            platform.isSteppable && character.land(platform.y, isSolid);
            isSolid && (character.x = prevPos.x);
        }
    }

    private update(): void {
        const heroPrevPos = this.hero.bounds;
        const enemyPrevPositions: IPosSize[] = [];

        this.hero.update();

        this.enemies.forEach(enemy => {
            if (enemy.destroyed) return;

            if (this.isOutOfBounds(enemy, this.camera.visibleAreaBounds)) {
                enemy.destroy();
                return;
            }

            for (const bullet of this.hero.heroBullets) {
                if (bullet.destroyed) continue;

                if (this.isAABBCollision(bullet.bounds, enemy.bounds)) {
                    bullet.destroy();
                    enemy.destroy();
                    break;
                }
            }
        });

        this.enemies = this.enemies.filter(enemy => !enemy.destroyed);

        this.enemies.forEach(enemy => {
            enemyPrevPositions.push(enemy.bounds);
            enemy.update();
        });

        this.hero.heroBullets.forEach(bullet => {
            if (bullet.destroyed) return;
            this.isOutOfBounds(bullet, this.camera.visibleAreaBounds) && bullet.destroy();
        });

        for (const platform of this.platforms) {
            this.checkPlatformCollision(this.hero, heroPrevPos, platform);
            this.enemies.forEach((enemy, i) => this.checkPlatformCollision(enemy, enemyPrevPositions[i], platform));
        }

        this.camera.update();
    }
}

export default Game;
