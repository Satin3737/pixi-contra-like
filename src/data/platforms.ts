import type {IPlatformsData} from '@/entities';

export const PlatformsNormalData: IPlatformsData[] = [
    {
        xBlockIndexes: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        y: 276
    },
    {
        xBlockIndexes: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 34, 35, 36, 45, 46, 47, 48
        ],
        y: 384
    },
    {
        xBlockIndexes: [5, 6, 7, 13, 14, 16, 31, 32, 42, 43, 49],
        y: 492
    },
    {
        xBlockIndexes: [46, 47, 48],
        y: 578
    },
    {
        xBlockIndexes: [8, 11, 28, 29, 30, 36, 37, 39, 40],
        y: 600
    },
    {
        xBlockIndexes: [50],
        y: 624
    }
];

export const PlatformsGroundData: IPlatformsData[] = [
    {
        xBlockIndexes: [9, 10, 25, 26, 27, 32, 33, 34, 35, 45, 46, 47, 48, 49, 50, 51, 52],
        y: 720
    }
];

export const PlatformsWaterData: IPlatformsData[] = [
    {
        xBlockIndexes: Array.from({length: 54}, (_, i) => i),
        y: 768
    }
];

export const PlatformsFragileData: IPlatformsData[] = [
    {
        xBlockIndexes: [16],
        y: 384
    }
];

export const PlatformsBossData: IPlatformsData[] = [
    {
        xBlockIndexes: [52],
        y: 170
    }
];
