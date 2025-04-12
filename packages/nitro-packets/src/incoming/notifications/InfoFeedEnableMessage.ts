import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type InfoFeedEnableMessageType = {
    enabled: boolean;
};

export const InfoFeedEnableMessage: IIncomingPacket<InfoFeedEnableMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: InfoFeedEnableMessageType = {
        enabled: wrapper.readBoolean(),
    };

    return packet;
};
