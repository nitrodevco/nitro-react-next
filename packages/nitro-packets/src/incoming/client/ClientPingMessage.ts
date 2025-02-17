import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ClientPingMessageType = {
};

export const ClientPingMessage: IIncomingPacket<ClientPingMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ClientPingMessageType = {};

    return packet;
};
