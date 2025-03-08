import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FriendRequestDataParser } from './FriendRequestDataParser';
import { IFriendRequestData } from './IFriendRequestData';

type FriendRequestsMessageType = {
    totalRequests: number;
    requests: IFriendRequestData[];
};

export const FriendRequestsMessage: IIncomingPacket<FriendRequestsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FriendRequestsMessageType = {
        totalRequests: wrapper.readInt(),
        requests: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.requests.push(FriendRequestDataParser(wrapper));

        count--;
    }

    return packet;
};
