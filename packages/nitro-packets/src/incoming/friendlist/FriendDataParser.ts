import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IFriendData } from './IFriendData';

export const FriendDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IFriendData = {
        id: wrapper.readInt(),
        name: wrapper.readString(),
        gender: wrapper.readInt(),
        online: wrapper.readBoolean(),
        followingAllowed: wrapper.readBoolean(),
        figure: wrapper.readString(),
        categoryId: wrapper.readInt(),
        motto: wrapper.readString(),
        realName: wrapper.readString(),
        lastAccess: wrapper.readString(),
        persistedMessageUser: wrapper.readBoolean(),
        vipMember: wrapper.readBoolean(),
        pocketHabboUser: wrapper.readBoolean(),
        relationshipStatus: wrapper.readInt()
    };

    return packet;
}
