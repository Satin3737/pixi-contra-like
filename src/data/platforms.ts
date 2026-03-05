import type {IPlatform} from '@/interfaces';
import {PlatformTypes} from '@/const';

export const PlatformsData: IPlatform[] = [
    {type: PlatformTypes.normal, size: {width: 200, height: 30}, options: {x: 100, y: 400}},
    {type: PlatformTypes.normal, size: {width: 200, height: 30}, options: {x: 300, y: 400}},
    {type: PlatformTypes.normal, size: {width: 200, height: 30}, options: {x: 500, y: 400}},
    {type: PlatformTypes.normal, size: {width: 200, height: 30}, options: {x: 700, y: 400}},
    {type: PlatformTypes.normal, size: {width: 200, height: 30}, options: {x: 900, y: 400}},
    {type: PlatformTypes.normal, size: {width: 200, height: 30}, options: {x: 300, y: 550}},
    {type: PlatformTypes.solid, size: {width: 200, height: 30}, options: {x: 0, y: 740}},
    {type: PlatformTypes.solid, size: {width: 200, height: 30}, options: {x: 200, y: 740}},
    {type: PlatformTypes.solid, size: {width: 200, height: 30}, options: {x: 400, y: 710}}
];
