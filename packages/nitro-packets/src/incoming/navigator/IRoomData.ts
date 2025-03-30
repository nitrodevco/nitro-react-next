import { DoorModeTypeEnum } from './DoorModeTypeEnum';
import { TradeModeTypeEnum } from './TradeModeTypeEnum';

export interface IRoomData
{
    roomId: number;
    roomName: string;
    showOwner: boolean;
    ownerId: number;
    ownerName: string;
    doorMode: DoorModeTypeEnum;
    userCount: number;
    maxUserCount: number;
    description: string;
    tradeMode: TradeModeTypeEnum;
    score: number;
    ranking: number;
    categoryId: number;
    totalStars: number;
    groupId: number;
    groupName: string;
    groupBadge: string;
    tags: string[];
    bitMask: number;
    thumbnail: any;
    allowPets: boolean;
    displayAd: boolean;
    adName: string;
    adDescription: string;
    adExpiresIn: number;
    allInRoomMuted: boolean;
    canMute: boolean;
    officialRoomPicRef: string;
}
