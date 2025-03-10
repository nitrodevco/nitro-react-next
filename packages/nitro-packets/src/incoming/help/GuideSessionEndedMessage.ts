import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionEndedMessageType = {
    endReason: number;
};

export const GuideSessionEndedMessage: IIncomingPacket<GuideSessionEndedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionEndedMessageType = {
        endReason: wrapper.readInt()
    };

    return packet;
};
