import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupBuyDataMessageType = {
    groupCost: number;
    availableRooms: Record<number, string>;
};

export const GroupBuyDataMessage: IIncomingPacket<GroupBuyDataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupBuyDataMessageType = {
        groupCost: wrapper.readInt(),
        availableRooms: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.availableRooms[wrapper.readInt()] = wrapper.readString();

        wrapper.readBoolean();

        count--;
    }

    return packet;
};
