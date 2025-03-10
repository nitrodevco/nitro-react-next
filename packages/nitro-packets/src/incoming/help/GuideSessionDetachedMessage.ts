import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionDetachedMessageType = {
};

export const GuideSessionDetachedMessage: IIncomingPacket<GuideSessionDetachedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionDetachedMessageType = {};

    return packet;
};
