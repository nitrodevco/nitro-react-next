import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumMessageDataParser } from './ForumMessageDataParser';
import { IForumMessageData } from './IForumMessageData';

type UpdateMessageMessageType = {
    groupId: number;
    threadId: number;
    message: IForumMessageData;
};

export const UpdateMessageMessage: IIncomingPacket<UpdateMessageMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UpdateMessageMessageType = {
        groupId: wrapper.readInt(),
        threadId: wrapper.readInt(),
        message: ForumMessageDataParser(wrapper)
    };

    return packet;
};
