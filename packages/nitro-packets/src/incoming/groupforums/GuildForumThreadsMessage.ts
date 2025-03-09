import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumThreadDataParser } from './ForumThreadDataParser';
import { IForumThreadData } from './IForumThreadData';

type GuildForumThreadsMessageType = {
    groupId: number;
    startIndex: number;
    amount: number;
    threads: IForumThreadData[];
};

export const GuildForumThreadsMessage: IIncomingPacket<GuildForumThreadsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuildForumThreadsMessageType = {
        groupId: wrapper.readInt(),
        startIndex: wrapper.readInt(),
        amount: wrapper.readInt(),
        threads: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.threads.push(ForumThreadDataParser(wrapper));

        count--;
    }

    return packet;
};
