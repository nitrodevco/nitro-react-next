import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IAcceptFriendFailureData } from './IAcceptFriendFailureData';

export const AcceptFriendFailureDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IAcceptFriendFailureData = {
        senderId: wrapper.readInt(),
        errorCode: wrapper.readInt()
    };

    return packet;
}
