import {type IEntityCommonParams, PlatformDefaultWidth} from '@/entities';

export const RunnersData: IEntityCommonParams[] = [
    {options: {x: PlatformDefaultWidth * 9, y: 304}},
    {options: {x: PlatformDefaultWidth * 10, y: 304}},
    {options: {x: PlatformDefaultWidth * 11, y: 304}},
    {options: {x: PlatformDefaultWidth * 13, y: 412}},
    {options: {x: PlatformDefaultWidth * 14, y: 412}},
    {options: {x: PlatformDefaultWidth * 15, y: 304}},
    {options: {x: PlatformDefaultWidth * 16, y: 412}},
    {options: {x: PlatformDefaultWidth * 20, y: 304}},
    {options: {x: PlatformDefaultWidth * 21, y: 304}},
    {options: {x: PlatformDefaultWidth * 29, y: 520}},
    {options: {x: PlatformDefaultWidth * 30, y: 520}},
    {options: {x: PlatformDefaultWidth * 40, y: 520}},
    {options: {x: PlatformDefaultWidth * 42, y: 412}}
];

export const TurretsData: (IEntityCommonParams & {health: number})[] = [
    {health: 5, options: {x: PlatformDefaultWidth * 10, y: 670}},
    {health: 5, options: {x: PlatformDefaultWidth * 22, y: 500}},
    {health: 5, options: {x: PlatformDefaultWidth * 29, y: 550}},
    {health: 5, options: {x: PlatformDefaultWidth * 35, y: 550}},
    {health: 5, options: {x: PlatformDefaultWidth * 45, y: 670}},
    {health: 5, options: {x: PlatformDefaultWidth * 48, y: 670}}
];
