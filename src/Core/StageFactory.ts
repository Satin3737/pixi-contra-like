import {PlatformsGroundData, PlatformsNormalData, PlatformsWaterData} from '@/data';
import {
    type IPlatformTypes,
    type IPlatformsData,
    type Platform,
    PlatformDefaultWidth,
    PlatformFactory,
    PlatformTypes
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
        this.createPlatforms(PlatformsNormalData, PlatformTypes.normal);
    }

    private createGround(): void {
        this.createPlatforms(PlatformsGroundData, PlatformTypes.solid);
    }

    private createWater(): void {
        this.createPlatforms(PlatformsWaterData, PlatformTypes.solid);
    }

    private createPlatforms(data: IPlatformsData[], type: IPlatformTypes): void {
        data.forEach(({xBlockIndexes, y}) => {
            for (const index of xBlockIndexes) {
                this.platforms.push(
                    this.platformsFactory.create({
                        type,
                        position: {x: index * PlatformDefaultWidth, y}
                    })
                );
            }
        });
    }
}

export default StageFactory;
