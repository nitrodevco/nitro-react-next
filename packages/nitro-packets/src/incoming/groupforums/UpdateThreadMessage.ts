import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumThreadDataParser } from './ForumThreadDataParser';
import { IForumThreadData } from './IForumThreadData';

type UpdateThreadMessageType = {
    groupId: number;
    thread: IForumThreadData;
};

export const UpdateThreadMessage: IIncomingPacket<UpdateThreadMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UpdateThreadMessageType = {
        groupId: wrapper.readInt(),
        thread: ForumThreadDataParser(wrapper)
    };

    return packet;
};
