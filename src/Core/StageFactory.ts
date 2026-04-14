import {type ILayers, type ISize, Layers} from '@/types';
import {
    PlatformsBossData,
    PlatformsFragileData,
    PlatformsGroundData,
    PlatformsNormalData,
    PlatformsWaterData
} from '@/data';
import {
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
import type World from './World';

class StageFactory {
    private readonly world: World;
    private readonly platformsFactory: PlatformFactory;
    private readonly platforms: Platform[];

    public constructor(world: World, platforms: Platform[]) {
        this.world = world;
        this.platforms = platforms;
        this.platformsFactory = new PlatformFactory(this.world);
    }

    public createStage(): void {
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
