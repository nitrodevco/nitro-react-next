import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomInviteMessageType = {
    senderId: number;
    messageText: string;
};

export const RoomInviteMessage: IIncomingPacket<RoomInviteMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomInviteMessageType = {
        senderId: wrapper.readInt(),
        messageText: wrapper.readString()
    };

    return packet;
};
