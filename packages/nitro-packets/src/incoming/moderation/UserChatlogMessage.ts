import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IUserChatlogData } from './IUserChatlogData';
import { UserChatlogDataParser } from './UserChatlogDataParser';

type UserChatlogMessageType = {
    data: IUserChatlogData;
};

export const UserChatlogMessage: IIncomingPacket<UserChatlogMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UserChatlogMessageType = {
        data: UserChatlogDataParser(wrapper)
    };

    return packet;
};
