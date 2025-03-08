import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IHabboSearchResultData } from './IHabboSearchResultData';

export const HabboSearchResultDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IHabboSearchResultData = {
        avatarId: wrapper.readInt(),
        avatarName: wrapper.readString(),
        avatarMotto: wrapper.readString(),
        isAvatarOnline: wrapper.readBoolean(),
        canFollow: wrapper.readBoolean(),
        lastOnlineData: wrapper.readString(),
        avatarGender: wrapper.readInt(),
        avatarFigure: wrapper.readString(),
        realName: wrapper.readString()
    };

    return packet;
}
