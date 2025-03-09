import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IForumMessageData } from './IForumMessageData';

export const ForumMessageDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IForumMessageData = {
        groupId: null,
        messageId: wrapper.readInt(),
        messageIndex: wrapper.readInt(),
        authorId: wrapper.readInt(),
        threadId: null,
        authorName: wrapper.readString(),
        authorFigure: wrapper.readString(),
        creationTime: wrapper.readInt(),
        messageText: wrapper.readString(),
        state: wrapper.readByte(),
        adminId: wrapper.readInt(),
        adminName: wrapper.readString(),
        adminOperationTimeAsSeccondsAgo: wrapper.readInt(),
        authorPostCount: wrapper.readInt()
    };

    return packet;
}
