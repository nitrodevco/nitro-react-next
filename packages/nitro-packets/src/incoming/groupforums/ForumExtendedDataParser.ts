import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumDataParser } from './ForumDataParser';
import { IForumData } from './IForumData';
import { IForumExtendedData } from './IForumExtendedData';

export const ForumExtendedDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IForumExtendedData & IForumData = {
        ...ForumDataParser(wrapper),
        readPermissions: wrapper.readInt(),
        postMessagePermissions: wrapper.readInt(),
        postThreadPermissions: wrapper.readInt(),
        moderatePermissions: wrapper.readInt(),
        readPermissionError: wrapper.readString(),
        postMessagePermissionError: wrapper.readString(),
        postThreadPermissionError: wrapper.readString(),
        moderatePermissionError: wrapper.readString(),
        reportPermissionError: wrapper.readString(),
        canChangeSettings: wrapper.readBoolean(),
        isStaff: wrapper.readBoolean()
    };

    return packet;
}
