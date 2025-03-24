import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ChatRecordDataParser } from './ChatRecordDataParser';
import { IUserChatlogData } from './IUserChatlogData';

export const UserChatlogDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IUserChatlogData = {
        userId: wrapper.readInt(),
        userName: wrapper.readString(),
        roomChatlogs: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.roomChatlogs.push(ChatRecordDataParser(wrapper));

        count--;
    }

    return packet;
}
