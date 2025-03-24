import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ChatContextTypeEnum } from './ChatContextTypeEnum';
import { ChatLineDataParser } from './ChatLineDataParser';
import { ChatRecordTypeEnum } from './ChatRecordTypeEnum';
import { IChatRecordData } from './IChatRecordData';

export const ChatRecordDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IChatRecordData = {
        recordType: wrapper.readByte() as ChatRecordTypeEnum,
        context: {},
        chatlog: []
    };

    let count = wrapper.readShort();

    while (count > 0)
    {
        const key = wrapper.readString();
        const type = wrapper.readByte() as ChatContextTypeEnum;

        switch (type)
        {
            case ChatContextTypeEnum.Boolean:
                packet.context[key] = wrapper.readBoolean();
                break;
            case ChatContextTypeEnum.Integer:
                packet.context[key] = wrapper.readInt();
                break;
            case ChatContextTypeEnum.String:
                packet.context[key] = wrapper.readString();
                break;
        }

        count--;
    }

    count = wrapper.readShort();

    while (count > 0)
    {
        packet.chatlog.push(ChatLineDataParser(wrapper));

        count--;
    }

    return packet;
}
