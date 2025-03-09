import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IForumThreadData } from './IForumThreadData';

export const ForumThreadDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IForumThreadData = {
        threadId: wrapper.readInt(),
        authorId: wrapper.readInt(),
        authorName: wrapper.readString(),
        header: wrapper.readString(),
        isPinned: wrapper.readBoolean(),
        isLocked: wrapper.readBoolean(),
        creationTimeAsSecondsAgo: wrapper.readInt(),
        totalMessages: wrapper.readInt(),
        unreadMessagesCount: wrapper.readInt(),
        lastMessageId: wrapper.readInt(),
        lastUserId: wrapper.readInt(),
        lastUserName: wrapper.readString(),
        lastCommentTime: wrapper.readInt(),
        state: wrapper.readByte(),
        adminId: wrapper.readInt(),
        adminName: wrapper.readString(),
        adminOperationTimeAsSecondsAgo: wrapper.readInt()
    };

    return packet;
}
