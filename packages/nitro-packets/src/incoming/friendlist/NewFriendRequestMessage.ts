import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FriendRequestDataParser } from './FriendRequestDataParser';
import { IFriendRequestData } from './IFriendRequestData';

type NewFriendRequestMessageType = {
    request: IFriendRequestData;
};

export const NewFriendRequestMessage: IIncomingPacket<NewFriendRequestMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NewFriendRequestMessageType = {
        request: FriendRequestDataParser(wrapper)
    };

    return packet;
};
