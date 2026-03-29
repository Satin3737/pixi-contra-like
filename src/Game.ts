import {type Application, Container} from 'pixi.js';
import type {ICollision, IPos, IPosSize, ITicker} from '@/types';
import {PlatformsData, RunnersData, TurretsData} from '@/data';
import {Camera, Physics} from '@/services';
import {
    Bullet,
    BulletFactory,
    Character,
    Hero,
    HeroFactory,
    type ICreateBulletParams,
    Platform,
    PlatformFactory,
    PlatformTypes,
    Runner,
    RunnerFactory,
    Turret,
    TurretFactory
} from '@/entities';

class Game {
    private readonly hero: Hero;
    private readonly camera: Camera;
    private readonly world: Container;
    private readonly platforms: Platform[] = [];
    private readonly bulletFactory: BulletFactory;

    private bullets: Bullet[] = [];
    private characters: Character[] = [];
    private turrets: Turret[] = [];

    constructor(app: Application) {
        this.world = new Container();

        const heroFactory = new HeroFactory(this.world);
        const runnerFactory = new RunnerFactory(this.world);
        const platformFactory = new PlatformFactory(this.world);
        const turretFactory = new TurretFactory(this.world);
        this.bulletFactory = new BulletFactory(this.world);

        this.hero = heroFactory.create({onShoot: this.onShoot, options: {x: 100, y: 0}});
        this.characters.push(this.hero);

        TurretsData.forEach(({health, options}) => {
            this.turrets.push(
                turretFactory.create({getTarget: this.getHeroAsTarget, onShoot: this.onShoot, health, options})
            );
        });

        RunnersData.forEach(({options}) => this.characters.push(runnerFactory.create({options})));
        PlatformsData.forEach(params => this.platforms.push(platformFactory.create(params)));

        this.camera = new Camera({target: this.hero, world: this.world, screenSize: app.screen, isBackScroll: false});

        app.stage.addChild(this.world);
        app.ticker.add(this.update, this);
    }

    private getPlatformCollision(bounds: IPosSize, platform: IPosSize, prevPos: IPos): ICollision {
        const result = {vertical: false, horizontal: false};
        if (!Physics.isAABBCollision(bounds, platform)) return result;

        const reverted = {...bounds, y: prevPos.y};
        Physics.isAABBCollision(reverted, platform) ? (result.horizontal = true) : (result.vertical = true);

        return result;
    }

    private checkPlatformCollision(character: Character, prevPos: IPos, platform: Platform): void {
        const isSolid = platform.type === PlatformTypes.solid;
        if (character.isSkipCollision && !isSolid) return;

        const collision = this.getPlatformCollision(character.bounds, platform.bounds, prevPos);
        collision.vertical && character.land(platform.y, isSolid);

        if (collision.horizontal) {
            platform.isSteppable && character.land(platform.y, isSolid);
            isSolid && (character.x = prevPos.x);
        }
    }

    private onShoot = (params: ICreateBulletParams): void => {
        this.bullets.push(this.bulletFactory.create(params));
    };

    private getHeroAsTarget = (): IPos | undefined => {
        if (this.hero.destroyed) return;
        return this.hero.bounds;
    };

    private update({deltaTime}: ITicker): void {
        const characterPrevPositions: IPosSize[] = [];

        this.characters.forEach(character => {
            if (character.destroyed) return;

            if (Physics.isOutOfBounds(character, this.camera.visibleAreaBounds)) {
                character.destroy();
                return;
            }

            if (
                character instanceof Runner &&
                !this.hero.destroyed &&
                Physics.isAABBCollision(character.bounds, this.hero.bounds)
            ) {
                this.hero.takeDamage(character.damage);
                character.destroy();
                return;
            }

            for (const bullet of this.bullets) {
                if (bullet.destroyed || bullet.ownerId === character.uid) continue;

                if (Physics.isAABBCollision(bullet.bounds, character.bounds)) {
                    bullet.destroy();
                    character.takeDamage(bullet.damage);
                    return;
                }
            }

            characterPrevPositions.push(character.bounds);
            !character.destroyed && character.update({deltaTime});
        });

        this.characters = this.characters.filter(enemy => !enemy.destroyed);

        this.turrets = this.turrets.filter(turret => !turret.destroyed);

        this.bullets.forEach(bullet => {
            if (bullet.destroyed) return;
            Physics.isOutOfBounds(bullet, this.camera.visibleAreaBounds) && bullet.destroy();
            !bullet.destroyed && bullet.update({deltaTime});
        });

        this.bullets = this.bullets.filter(bullet => !bullet.destroyed);

        this.turrets.forEach(turret => {
            for (const bullet of this.bullets) {
                if (bullet.destroyed || bullet.ownerId === turret.uid) continue;
                if (Physics.isAABBCollision(bullet.bounds, turret.bounds)) {
                    turret.takeDamage(bullet.damage);
                    bullet.destroy();
                    break;
                }
            }

            !turret.destroyed && turret.update({deltaTime});
        });

        for (const platform of this.platforms) {
            this.characters.forEach((character, i) =>
                this.checkPlatformCollision(character, characterPrevPositions[i], platform)
            );
        }

        this.camera.update();
    }
}

export default Game;
