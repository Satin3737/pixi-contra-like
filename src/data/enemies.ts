import type {IEntityCommonParams} from '@/entities';

export const RunnersData: IEntityCommonParams[] = [
    {options: {x: 900, y: 320}},
    {options: {x: 1000, y: 470}},
    {options: {x: 800, y: 470}}
];

export const TurretsData: (IEntityCommonParams & {health: number})[] = [{health: 5, options: {x: 500, y: 200}}];
