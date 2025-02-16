import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BotRemovedFromInventoryMessageType = {
    itemId: number;
};

export const BotRemovedFromInventoryMessage: IIncomingPacket<BotRemovedFromInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BotRemovedFromInventoryMessageType = {
        itemId: 0
    };

    packet.itemId = wrapper.readInt();

    return packet;
};
