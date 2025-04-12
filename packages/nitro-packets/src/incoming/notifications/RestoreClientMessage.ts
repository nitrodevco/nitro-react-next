import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RestoreClientMessageType = {
};

export const RestoreClientMessage: IIncomingPacket<RestoreClientMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RestoreClientMessageType = {};

    return packet;
};
