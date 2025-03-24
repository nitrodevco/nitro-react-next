import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CfhChatlogDataParser } from './CfhChatlogDataParser';
import { ICfhChatlogData } from './ICfhChatlogData';

type CfhChatlogMessageType = {
    data: ICfhChatlogData;
};

export const CfhChatlogMessage: IIncomingPacket<CfhChatlogMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CfhChatlogMessageType = {
        data: CfhChatlogDataParser(wrapper)
    };

    return packet;
};
