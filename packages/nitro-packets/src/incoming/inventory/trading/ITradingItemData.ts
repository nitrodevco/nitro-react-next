import { FurnitureTypeEnum, IObjectData } from '@nitrodevco/nitro-shared';

export interface ITradingItemData
{
    expirationTimeStamp: number;
    isWallItem: boolean;
    itemId: number;
    furniType: FurnitureTypeEnum;
    ref: number;
    spriteId: number;
    category: number;
    stuffData: IObjectData;
    extra: number;
    secondsToExpiration: number;
    creationDay: number;
    creationMonth: number;
    creationYear: number;
    isGroupable: boolean;
    songId: number;
    flatId: number;
    rentable: boolean;
    hasRentPeriodStarted: boolean;
}
