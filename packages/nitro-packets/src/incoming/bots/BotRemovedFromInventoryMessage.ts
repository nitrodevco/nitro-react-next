import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BotRemovedFromInventoryMessageType = {
    itemId: number;
};

export const BotRemovedFromInventoryMessage: IIncomingPacket<BotRemovedFromInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BotRemovedFromInventoryMessageType = {
        itemId: wrapper.readInt()
    };

    return packet;
};
