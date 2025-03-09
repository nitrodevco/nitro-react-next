import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type DisconnectReasonMessageType = {
    reason: number;
};

export const DisconnectReasonMessage: IIncomingPacket<DisconnectReasonMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: DisconnectReasonMessageType = {
        reason: wrapper.readInt()
    };

    return packet;
};
