import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ActivityPointNotificationMessageType = {
    amount: number;
    amountChanged: number;
    type: number;
};

export const ActivityPointNotificationMessage: IIncomingPacket<ActivityPointNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ActivityPointNotificationMessageType = {
        amount: wrapper.readInt(),
        amountChanged: wrapper.readInt(),
        type: wrapper.readInt()
    };

    return packet;
};
