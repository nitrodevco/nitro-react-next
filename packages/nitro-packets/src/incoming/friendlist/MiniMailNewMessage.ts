import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MiniMailNewMessageType = {

};

export const MiniMailNewMessage: IIncomingPacket<MiniMailNewMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MiniMailNewMessageType = {};

    return packet;
};
