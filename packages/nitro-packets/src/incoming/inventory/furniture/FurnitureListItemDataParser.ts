import { FurnitureTypeEnum, IMessageDataWrapper, ObjectDataParser } from '@nitrodevco/nitro-shared';
import { IFurnitureListItemData } from './IFurnitureListItemData';

export const FurnitureListItemDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        itemId: wrapper.readInt(),
        furniType: wrapper.readString().toLowerCase() as FurnitureTypeEnum,
        ref: wrapper.readInt(),
        spriteId: wrapper.readInt(),
        category: wrapper.readInt(),
        stuffData: ObjectDataParser(wrapper),
        isRecyclable: wrapper.readBoolean(),
        tradable: wrapper.readBoolean(),
        isGroupable: wrapper.readBoolean(),
        sellable: wrapper.readBoolean(),
        secondsToExpiration: wrapper.readInt(),
        expirationTimeStamp: null, // TODO NEED TICKER TIME
    } as IFurnitureListItemData;

    if (packet.secondsToExpiration > -1)
    {
        packet.rentable = true;
    }
    else
    {
        packet.rentable = false;
        packet.secondsToExpiration = -1;
    }

    packet.hasRentPeriodStarted = wrapper.readBoolean();
    packet.flatId = wrapper.readInt();
    packet.isWallItem = (packet.furniType === FurnitureTypeEnum.Wall);

    if (packet.furniType === FurnitureTypeEnum.Floor)
    {
        packet.slotId = wrapper.readString();
        packet.extra = wrapper.readInt();
    }

    return packet;
}
