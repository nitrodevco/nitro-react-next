import { IPetFigureData } from './IPetFigureData';

export interface IPetData
{
    id: number;
    name: string;
    figureData: IPetFigureData;
    level: number;
}
