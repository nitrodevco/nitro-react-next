import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FriendNotificationMessageType = {
    typeCode: number;
    avatarId: number;
    message: string;
};

export const FriendNotificationMessage: IIncomingPacket<FriendNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FriendNotificationMessageType = {
        typeCode: wrapper.readInt(),
        avatarId: wrapper.readInt(),
        message: wrapper.readString()
    };

    return packet;
};
