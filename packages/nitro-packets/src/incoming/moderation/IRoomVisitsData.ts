import { IRoomVisitData } from './IRoomVisitData';

export interface IRoomVisitsData
{
    userId: number;
    userName: string;
    rooms: IRoomVisitData[];
}
