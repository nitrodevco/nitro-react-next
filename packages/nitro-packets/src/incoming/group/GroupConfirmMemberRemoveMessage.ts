import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupConfirmMemberRemoveMessageType = {
    userId: number;
    furnitureCount: number;
};

export const GroupConfirmMemberRemoveMessage: IIncomingPacket<GroupConfirmMemberRemoveMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupConfirmMemberRemoveMessageType = {
        userId: wrapper.readInt(),
        furnitureCount: wrapper.readInt()
    };

    return packet;
};
