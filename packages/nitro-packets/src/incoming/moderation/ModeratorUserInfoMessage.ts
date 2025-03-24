import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IModeratorUserData } from './IModeratorUserData';
import { ModeratorUserDataParser } from './ModeratorUserDataParser';

type ModeratorUserInfoMessageType = {
    data: IModeratorUserData;
};

export const ModeratorUserInfoMessage: IIncomingPacket<ModeratorUserInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModeratorUserInfoMessageType = {
        data: ModeratorUserDataParser(wrapper)
    };

    return packet;
};
