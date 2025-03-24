import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ChatRecordDataParser } from './ChatRecordDataParser';
import { ICfhChatlogData } from './ICfhChatlogData';

export const CfhChatlogDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICfhChatlogData = {
        issueId: wrapper.readInt(),
        callerUserId: wrapper.readInt(),
        reportedUserId: wrapper.readInt(),
        chatRecordId: wrapper.readInt(),
        chatRecord: ChatRecordDataParser(wrapper)
    };

    return packet;
}
