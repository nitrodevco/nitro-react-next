import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FurnitureListRemovedMessageType = {
    itemId: number;
};

export const FurnitureListRemovedMessage: IIncomingPacket<FurnitureListRemovedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FurnitureListRemovedMessageType = {
        itemId: wrapper.readInt()
    };

    return packet;
};
