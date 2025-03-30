import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NavigatorOpenRoomCreatorMessageType = {
};

export const NavigatorOpenRoomCreatorMessage: IIncomingPacket<NavigatorOpenRoomCreatorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorOpenRoomCreatorMessageType = {};

    return packet;
};
