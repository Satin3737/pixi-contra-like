import {type ILayers, Layers} from '@/types';
import {PlatformsGroundData, PlatformsNormalData, PlatformsWaterData} from '@/data';
import {
    type IPlatformTypes,
    type IPlatformViewTypes,
    type IPlatformsData,
    type Platform,
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
    }

    private createNormalPlatforms(): void {
        this.createPlatforms(PlatformsNormalData, PlatformTypes.normal, PlatformViewTypes.jungle, Layers.background);
    }

    private createGround(): void {
        this.createPlatforms(PlatformsGroundData, PlatformTypes.solid, PlatformViewTypes.jungleDark, Layers.background);
    }

    private createWater(): void {
        this.createPlatforms(PlatformsWaterData, PlatformTypes.solid, PlatformViewTypes.water, Layers.foreground);
    }

    private createPlatforms(
        data: IPlatformsData[],
        type: IPlatformTypes,
        viewType: IPlatformViewTypes,
        layer: ILayers
    ): void {
        data.forEach(({xBlockIndexes, y}) => {
            for (const index of xBlockIndexes) {
                this.platforms.push(
                    this.platformsFactory.create({
                        type,
                        viewType,
                        layer,
                        position: {x: index * PlatformDefaultWidth, y}
                    })
                );
            }
        });
    }
}

export default StageFactory;
