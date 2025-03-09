import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IForumData } from './IForumData';

export const ForumDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IForumData = {
        groupId: wrapper.readInt(),
        name: wrapper.readString(),
        description: wrapper.readString(),
        icon: wrapper.readString(),
        totalThreads: wrapper.readInt(),
        leaderboardScore: wrapper.readInt(),
        totalMessages: wrapper.readInt(),
        unreadMessages: wrapper.readInt(),
        lastMessageId: wrapper.readInt(),
        lastMessageAuthorId: wrapper.readInt(),
        lastMessageAuthorName: wrapper.readString(),
        lastMessageTimeAsSecondsAgo: wrapper.readInt()
    }

    return packet;
}
