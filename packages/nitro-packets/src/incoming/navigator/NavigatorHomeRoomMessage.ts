import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NavigatorHomeRoomMessageType = {
    homeRoomId: number;
    roomIdToEnter: number;
};

export const NavigatorHomeRoomMessage: IIncomingPacket<NavigatorHomeRoomMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorHomeRoomMessageType = {
        homeRoomId: wrapper.readInt(),
        roomIdToEnter: wrapper.readInt()
    };

    return packet;
};
