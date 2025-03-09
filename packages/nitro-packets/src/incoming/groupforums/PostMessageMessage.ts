import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumMessageDataParser } from './ForumMessageDataParser';
import { IForumMessageData } from './IForumMessageData';

type PostMessageMessageType = {
    groupId: number;
    threadId: number;
    message: IForumMessageData;
};

export const PostMessageMessage: IIncomingPacket<PostMessageMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PostMessageMessageType = {
        groupId: wrapper.readInt(),
        threadId: wrapper.readInt(),
        message: ForumMessageDataParser(wrapper)
    };

    return packet;
};
