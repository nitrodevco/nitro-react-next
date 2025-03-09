import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumThreadDataParser } from './ForumThreadDataParser';
import { IForumThreadData } from './IForumThreadData';

type PostThreadMessageType = {
    groupId: number;
    thread: IForumThreadData;
};

export const PostThreadMessage: IIncomingPacket<PostThreadMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PostThreadMessageType = {
        groupId: wrapper.readInt(),
        thread: ForumThreadDataParser(wrapper)
    };

    return packet;
};
