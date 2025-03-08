import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HabboGroupDeactivatedMessageType = {
    groupId: number;
};

export const HabboGroupDeactivatedMessage: IIncomingPacket<HabboGroupDeactivatedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboGroupDeactivatedMessageType = {

    };

    packet.groupId = wrapper.readInt();

    return packet;
};