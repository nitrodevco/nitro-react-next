import { IOfficialRoomEntryData } from './IOfficialRoomEntryData';
import { IRoomData } from './IRoomData';

export interface IGuestRoomSearchResultData
{
    searchType: number;
    searchParam: string;
    rooms: IRoomData[];
    ad: IOfficialRoomEntryData;
}
