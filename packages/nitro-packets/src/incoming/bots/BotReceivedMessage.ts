import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BotDataParser } from './BotDataParser';
import { IBotData } from './IBotData';

type BotReceivedMessageType = {
    boughtAsGift: boolean;
    item: IBotData;
};

export const BotReceivedMessage: IIncomingPacket<BotReceivedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BotReceivedMessageType = {
        boughtAsGift: wrapper.readBoolean(),
        item: BotDataParser(wrapper)
    };

    return packet;
};
