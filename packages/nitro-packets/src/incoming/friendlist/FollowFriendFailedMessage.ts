import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FollowFriendFailedMessageType = {
    errorCode: number;
};

export const FollowFriendFailedMessage: IIncomingPacket<FollowFriendFailedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FollowFriendFailedMessageType = {
        errorCode: wrapper.readInt()
    };

    return packet;
};
