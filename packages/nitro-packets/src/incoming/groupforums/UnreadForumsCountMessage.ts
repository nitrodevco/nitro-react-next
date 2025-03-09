import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type UnreadForumsCountMessageType = {
    count: number;
};

export const UnreadForumsCountMessage: IIncomingPacket<UnreadForumsCountMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UnreadForumsCountMessageType = {
        count: wrapper.readInt()
    };

    return packet;
};
