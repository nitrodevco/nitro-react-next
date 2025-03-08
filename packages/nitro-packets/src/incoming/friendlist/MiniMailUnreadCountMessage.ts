import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MiniMailUnreadCountMessageType = {
    count: number;
};

export const MiniMailUnreadCountMessage: IIncomingPacket<MiniMailUnreadCountMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MiniMailUnreadCountMessageType = {
        count: wrapper.readInt()
    };

    return packet;
};
