import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NotEnoughBalanceMessageType = {
    notEnoughCredits: boolean;
    notEnoughActivityPoints: boolean;
    activityPointType: number;
};

export const NotEnoughBalanceMessage: IIncomingPacket<NotEnoughBalanceMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NotEnoughBalanceMessageType = {
        notEnoughCredits: wrapper.readBoolean(),
        notEnoughActivityPoints: wrapper.readBoolean(),
        activityPointType: 0
    };

    if (wrapper.bytesAvailable) packet.activityPointType = wrapper.readInt();

    return packet;
};
