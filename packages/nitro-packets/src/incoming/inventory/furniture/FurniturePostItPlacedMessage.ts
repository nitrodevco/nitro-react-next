import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FurniturePostItPlacedMessageType = {
    itemId: number;
    itemsLeft: number;
};

export const FurniturePostItPlacedMessage: IIncomingPacket<FurniturePostItPlacedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FurniturePostItPlacedMessageType = {
        itemId: wrapper.readInt(),
        itemsLeft: wrapper.readInt()
    };

    return packet;
};
