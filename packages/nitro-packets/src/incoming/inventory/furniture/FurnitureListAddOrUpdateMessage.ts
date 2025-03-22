import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FurnitureListItemDataParser } from './FurnitureListItemDataParser';
import { IFurnitureListItemData } from './IFurnitureListItemData';

type FurnitureListAddOrUpdateMessageType = {
    item: IFurnitureListItemData;
};

export const FurnitureListAddOrUpdateMessage: IIncomingPacket<FurnitureListAddOrUpdateMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FurnitureListAddOrUpdateMessageType = {
        item: FurnitureListItemDataParser(wrapper)
    };

    return packet;
};
