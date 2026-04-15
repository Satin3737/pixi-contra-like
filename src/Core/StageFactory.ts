import {type ILayers, type ISize, Layers} from '@/types';
import {
    PlatformsBossData,
    PlatformsFragileData,
    PlatformsGroundData,
    PlatformsNormalData,
    PlatformsWaterData,
    RunnersData,
    TurretsData
} from '@/data';
import {
    EnemiesFactory,
    Entity,
    type IPlatformTypes,
    type IPlatformViewTypes,
    type IPlatformsData,
    type Platform,
    PlatformDefaultHeight,
    PlatformDefaultWidth,
    PlatformFactory,
    PlatformTypes,
    PlatformViewTypes
} from '@/entities';
import type {IStageFactoryParams} from './types';

class StageFactory {
    private readonly platformsFactory: PlatformFactory;
    private readonly enemiesFactory: EnemiesFactory;
    private readonly platforms: Platform[];
    private readonly entities: Entity[];

    public constructor({world, platforms, entities, onShoot, getTarget}: IStageFactoryParams) {
        this.platformsFactory = new PlatformFactory(world);
        this.enemiesFactory = new EnemiesFactory({world, onShoot, getTarget});
        this.platforms = platforms;
        this.entities = entities;
    }

    public createStage(): void {
        this.createLevel();
        this.createEnemies();
    }

    private createEnemies(): void {
        TurretsData.forEach(({health, options}) => {
            this.entities.push(this.enemiesFactory.createTurret({health, options}));
        });

        RunnersData.forEach(({options}) => {
            this.entities.push(this.enemiesFactory.createRunner({options}));
        });
    }

    private createLevel(): void {
        this.createNormalPlatforms();
        this.createGround();
        this.createWater();
        this.createFragile();
        this.createBossWall();
    }

    private createNormalPlatforms(): void {
        this.createPlatforms({
            data: PlatformsNormalData,
            type: PlatformTypes.normal,
            viewType: PlatformViewTypes.jungle,
            layer: Layers.background
        });
    }

    private createGround(): void {
        this.createPlatforms({
            data: PlatformsGroundData,
            type: PlatformTypes.solid,
            viewType: PlatformViewTypes.jungleDark,
            layer: Layers.background
        });
    }

    private createWater(): void {
        this.createPlatforms({
            data: PlatformsWaterData,
            type: PlatformTypes.solid,
            viewType: PlatformViewTypes.water,
            layer: Layers.foreground
        });
    }

    private createFragile(): void {
        this.createPlatforms({
            data: PlatformsFragileData,
            type: PlatformTypes.fragile,
            viewType: PlatformViewTypes.bridge,
            layer: Layers.background,
            size: {width: PlatformDefaultWidth * 4, height: PlatformDefaultHeight * 2},
            health: 50
        });
    }

    private createBossWall(): void {
        this.createPlatforms({
            data: PlatformsBossData,
            type: PlatformTypes.solid,
            viewType: PlatformViewTypes.boss,
            layer: Layers.background,
            size: {width: PlatformDefaultWidth * 3, height: PlatformDefaultHeight * 30},
            health: 100
        });
    }

    private createPlatforms({
        data,
        ...params
    }: {
        data: IPlatformsData[];
        type: IPlatformTypes;
        viewType: IPlatformViewTypes;
        layer: ILayers;
        size?: ISize;
        health?: number;
    }): void {
        data.forEach(({xBlockIndexes, y}) => {
            for (const index of xBlockIndexes) {
                this.platforms.push(
                    this.platformsFactory.create({...params, position: {x: index * PlatformDefaultWidth, y}})
                );
            }
        });
    }
}

export default StageFactory;
