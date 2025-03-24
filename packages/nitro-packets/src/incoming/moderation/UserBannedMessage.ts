import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type UserBannedMessageType = {
    message: string;
};

export const UserBannedMessage: IIncomingPacket<UserBannedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UserBannedMessageType = {
        message: wrapper.readString()
    };

    return packet;
};
