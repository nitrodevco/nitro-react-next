import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FindFriendsProcessResultMessageType = {
    success: boolean;
};

export const FindFriendsProcessResultMessage: IIncomingPacket<FindFriendsProcessResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FindFriendsProcessResultMessageType = {
        success: wrapper.readBoolean()
    };

    return packet;
};
