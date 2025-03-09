import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumMessageDataParser } from './ForumMessageDataParser';
import { IForumMessageData } from './IForumMessageData';

type ThreadMessagesMessageType = {
    groupId: number;
    threadId: number;
    startIndex: number;
    amount: number;
    messages: IForumMessageData[];
};

export const ThreadMessagesMessage: IIncomingPacket<ThreadMessagesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ThreadMessagesMessageType = {
        groupId: wrapper.readInt(),
        threadId: wrapper.readInt(),
        startIndex: wrapper.readInt(),
        amount: wrapper.readInt(),
        messages: []
    };

    let count = packet.amount;

    while (count > 0)
    {
        const message = ForumMessageDataParser(wrapper);

        message.groupId = packet.groupId;
        message.threadId = packet.threadId;

        packet.messages.push(message);

        count--;
    }

    return packet;
};
