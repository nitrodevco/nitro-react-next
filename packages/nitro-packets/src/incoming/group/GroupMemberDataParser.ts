import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IGroupMemberData } from './IGroupMemberData';

export const GroupMemberDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IGroupMemberData = {
        rank: wrapper.readInt(),
        id: wrapper.readInt(),
        name: wrapper.readString(),
        figure: wrapper.readString(),
        joinedAt: wrapper.readString()
    };

    return packet;
}
