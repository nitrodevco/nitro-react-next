import { IRoomData } from '../navigator/IRoomData';

export interface INavigatorSearchResultListData
{
    code: string;
    data: string;
    action: number;
    closed: boolean;
    mode: number;
    rooms: IRoomData[];
}
