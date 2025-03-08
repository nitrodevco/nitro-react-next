import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IFriendRequestData } from './IFriendRequestData';

export const FriendRequestDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IFriendRequestData = {
        requestId: wrapper.readInt(),
        requesterName: wrapper.readString(),
        figureString: wrapper.readString(),
        requesterUserId: -1
    }

    packet.requesterUserId = packet.requestId;

    return packet;
}
