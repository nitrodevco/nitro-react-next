import { IModRoomData } from './IModRoomData';

export interface IRoomModerationData
{
    flatId: number;
    userCount: number;
    ownerInRoom: boolean;
    ownerId: number;
    ownerName: string;
    room: IModRoomData;
}
