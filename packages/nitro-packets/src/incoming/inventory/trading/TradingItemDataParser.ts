import { FurnitureTypeEnum, IMessageDataWrapper, ObjectDataParser } from '@nitrodevco/nitro-shared';
import { ITradingItemData } from './ITradingItemData';

export const TradingItemDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ITradingItemData = {
        itemId: wrapper.readInt(),
        furniType: wrapper.readString().toLowerCase() as FurnitureTypeEnum,
        ref: wrapper.readInt(),
        spriteId: wrapper.readInt(),
        category: wrapper.readInt(),
        isGroupable: wrapper.readBoolean(),
        stuffData: ObjectDataParser(wrapper),
        secondsToExpiration: -1,
        expirationTimeStamp: 0, // TODO NEEDS TICKER TIME
        hasRentPeriodStarted: false,
        creationDay: wrapper.readInt(),
        creationMonth: wrapper.readInt(),
        creationYear: wrapper.readInt(),
        extra: null,
        flatId: -1,
        rentable: false,
        isWallItem: false,
        songId: -1
    };

    packet.extra = (packet.furniType === FurnitureTypeEnum.Floor) ? wrapper.readInt() : -1;
    packet.isWallItem = (packet.furniType === FurnitureTypeEnum.Wall);

    return packet;
}
