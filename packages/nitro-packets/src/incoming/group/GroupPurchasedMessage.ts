import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupPurchasedMessageType = {
    roomId: number;
    groupId: number;
};

export const GroupPurchasedMessage: IIncomingPacket<GroupPurchasedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupPurchasedMessageType = {
        roomId: wrapper.readInt(),
        groupId: wrapper.readInt()
    };

    return packet;
};
