import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ForumDataParser } from './ForumDataParser';
import { IForumData } from './IForumData';

type GetForumsListMessageType = {
    listCode: number;
    totalAmount: number;
    startIndex: number;
    amount: number;
    forums: IForumData[];
};

export const GetForumsListMessage: IIncomingPacket<GetForumsListMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GetForumsListMessageType = {
        listCode: wrapper.readInt(),
        totalAmount: wrapper.readInt(),
        startIndex: wrapper.readInt(),
        amount: wrapper.readInt(),
        forums: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.forums.push(ForumDataParser(wrapper));

        count--;
    }

    return packet;
};
