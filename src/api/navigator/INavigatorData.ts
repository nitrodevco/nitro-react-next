import { RoomDataParser } from '@nitrots/nitro-renderer';

export interface INavigatorData
{
    homeRoomId: number;
    enteredGuestRoom: RoomDataParser;
    currentRoomOwner: boolean;
    currentRoomId: number;
    currentRoomIsStaffPick: boolean;
    avatarId: number;
    roomPicker: boolean;
    eventMod: boolean;
    currentRoomRating: number;
    canRate: boolean;
}
