import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NotEnoughBalanceMessageType = {
    notEnoughCredits: boolean;
    notEnoughActivityPoints: boolean;
    activityPointType: number;
};

export const NotEnoughBalanceMessage: IIncomingPacket<NotEnoughBalanceMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NotEnoughBalanceMessageType = {
        notEnoughCredits: false,
        notEnoughActivityPoints: false,
        activityPointType: 0,
    };

    packet.notEnoughCredits = wrapper.readBoolean();
    packet.notEnoughActivityPoints = wrapper.readBoolean();
    packet.activityPointType = wrapper.readInt();

    return packet;
};