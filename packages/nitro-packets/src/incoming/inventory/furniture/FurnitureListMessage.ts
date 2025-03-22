import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FurnitureListItemDataParser } from './FurnitureListItemDataParser';
import { IFurnitureListItemData } from './IFurnitureListItemData';

type FurnitureListMessageType = {
    totalFragments: number;
    fragmentNumber: number;
    fragment: Record<number, IFurnitureListItemData>;
};

export const FurnitureListMessage: IIncomingPacket<FurnitureListMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FurnitureListMessageType = {
        totalFragments: wrapper.readInt(),
        fragmentNumber: wrapper.readInt(),
        fragment: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const item = FurnitureListItemDataParser(wrapper);

        packet.fragment[item.itemId] = item;

        count--;
    }

    return packet;
};
