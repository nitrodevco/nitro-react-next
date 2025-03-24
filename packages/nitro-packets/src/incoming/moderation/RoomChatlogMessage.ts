import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ChatRecordDataParser } from './ChatRecordDataParser';
import { IChatRecordData } from './IChatRecordData';

type RoomChatlogMessageType = {
    data: IChatRecordData;
};

export const RoomChatlogMessage: IIncomingPacket<RoomChatlogMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomChatlogMessageType = {
        data: ChatRecordDataParser(wrapper)
    };

    return packet;
};
