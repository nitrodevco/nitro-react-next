import { IRoomData } from './IRoomData';
import { OfficialRoomEntryTypeEnum } from './OfficialRoomEntryTypeEnum';

export interface IOfficialRoomEntryData
{
    index: number;
    popupCaption: string;
    popupDesc: string;
    showDetails: boolean;
    picText: string;
    picRef: string;
    folderId: number;
    userCount: number;
    type: OfficialRoomEntryTypeEnum;
    tag: string;
    guestRoomData: IRoomData;
    open: boolean;
}
