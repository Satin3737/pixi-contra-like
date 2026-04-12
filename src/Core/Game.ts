import type {Application} from 'pixi.js';
import type {IPos, IPosSize, ITicker} from '@/types';
import {RunnersData, TurretsData} from '@/data';
import {Camera, Physics} from '@/services';
import {
    Bullet,
    BulletFactory,
    Character,
    Entity,
    EntityCategories,
    Hero,
    HeroFactory,
    type IShootParams,
    Platform,
    PlatformTypes,
    Runner,
    RunnerFactory,
    TurretFactory
} from '@/entities';
import StageFactory from './StageFactory';
import World from './World';

class Game {
    private readonly hero: Hero;
    private readonly camera: Camera;
    private readonly world: World;
    private readonly bulletFactory: BulletFactory;
    private readonly characterPrevPositions: Map<number, IPosSize> = new Map();

    private bullets: Bullet[] = [];
    private entities: Entity[] = [];
    private platforms: Platform[] = [];

    public constructor(app: Application) {
        this.world = new World();

        const stageFactory = new StageFactory(this.world, this.platforms);
        stageFactory.createStage();

        const heroFactory = new HeroFactory(this.world);
        const runnerFactory = new RunnerFactory(this.world);
        const turretFactory = new TurretFactory(this.world);
        this.bulletFactory = new BulletFactory(this.world);

        this.hero = heroFactory.create({onShoot: this.onShoot, options: {x: 100, y: 0}});
        this.entities.push(this.hero);

        TurretsData.forEach(({health, options}) => {
            this.entities.push(
                turretFactory.create({
                    getTarget: () => this.hero.centerPoint,
                    onShoot: this.onShoot,
                    health,
                    options
                })
            );
        });

        RunnersData.forEach(({options}) => {
            this.entities.push(
                runnerFactory.create({
                    onShoot: this.onShoot,
                    options
                })
            );
        });

        this.camera = new Camera({target: this.hero, world: this.world, screenSize: app.screen, isBackScroll: false});

        app.stage.addChild(this.world);
        app.ticker.add(this.update, this);
    }

    private checkPlatformCollision(character: Character, prevPos: IPos, platform: Platform): void {
        const isSolid = platform.type === PlatformTypes.solid;
        if (character.isSkipCollision && !isSolid) return;

        const collision = Physics.getPlatformCollision(character.bounds, platform.bounds, prevPos);
        collision.vertical && character.land(platform.y, isSolid);

        if (collision.horizontal) {
            platform.isSteppable && character.land(platform.y, isSolid);
            isSolid && (character.x = prevPos.x);
        }
    }

    private onShoot = ({aimContext, ...rest}: IShootParams): void => {
        this.bullets.push(this.bulletFactory.create({...rest, options: aimContext}));
    };

    private checkBulletCollisions(): void {
        this.entities.forEach(entity => {
            if (entity.destroyed) return;

            for (const bullet of this.bullets) {
                if (bullet.destroyed || bullet.ownerId === entity.uid) continue;

                if (Physics.isAABBCollision(bullet.bounds, entity.bounds)) {
                    entity.takeDamage(bullet.damage);
                    bullet.destroy();
                    break;
                }
            }
        });
    }

    private checkRunnerCollisions(): void {
        this.entities.forEach(entity => {
            if (entity.destroyed || !(entity instanceof Runner)) return;

            if (Physics.isOutOfBounds(entity, this.camera.visibleAreaBounds)) {
                entity.destroy();
                return;
            }

            if (!this.hero.destroyed && Physics.isAABBCollision(entity.bounds, this.hero.bounds)) {
                this.hero.takeDamage(entity.weapon.damage);
                entity.destroy();
            }
        });
    }

    private updateEntities({deltaTime}: ITicker): void {
        this.entities.forEach(entity => {
            if (entity.destroyed) return;

            if (entity.category === EntityCategories.character) {
                this.characterPrevPositions.set(entity.uid, entity.bounds);
            }

            entity.update({deltaTime});
        });

        this.entities = this.entities.filter(entity => !entity.destroyed);
    }

    private updateBullets({deltaTime}: ITicker): void {
        this.bullets.forEach(bullet => {
            if (bullet.destroyed) return;
            Physics.isOutOfBounds(bullet, this.camera.visibleAreaBounds) && bullet.destroy();
            !bullet.destroyed && bullet.update({deltaTime});
        });

        this.bullets = this.bullets.filter(bullet => !bullet.destroyed);
    }

    private checkObstaclesCollisions(): void {
        for (const platform of this.platforms) {
            this.entities.forEach(entity => {
                if (entity.category !== EntityCategories.character) return;

                const prevPos = this.characterPrevPositions.get(entity.uid);
                if (!prevPos) return;

                if (entity.uid === this.hero.uid && entity.x < -this.world.x) {
                    entity.x = prevPos.x;
                }

                this.checkPlatformCollision(entity as Character, prevPos, platform);
            });
        }

        this.characterPrevPositions.clear();
    }

    private update({deltaTime}: ITicker): void {
        this.checkBulletCollisions();
        this.checkRunnerCollisions();
        this.updateEntities({deltaTime});
        this.updateBullets({deltaTime});
        this.checkObstaclesCollisions();
        this.camera.update();
    }
}

export default Game;
