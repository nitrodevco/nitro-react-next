import { FurnitureTypeEnum, IObjectData } from '@nitrodevco/nitro-shared';

export interface IFurnitureListItemData
{
    rentable: boolean;
    itemId: number;
    furniType: FurnitureTypeEnum;
    ref: number;
    spriteId: number;
    category: number;
    stuffData: IObjectData;
    isGroupable: boolean;
    isRecyclable: boolean;
    tradable: boolean;
    sellable: boolean;
    secondsToExpiration: number;
    extra: number;
    flatId: number;
    isWallItem: boolean;
    hasRentPeriodStarted: boolean;
    expirationTimeStamp: number;
    slotId: string;
    songId: number;
}
