import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BotDataParser } from './BotDataParser';
import { IBotData } from './IBotData';

type BotAddedToInventoryMessageType = {
    item: IBotData;
    openInventory: boolean;
};

export const BotAddedToInventoryMessage: IIncomingPacket<BotAddedToInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BotAddedToInventoryMessageType = {
        item: BotDataParser(wrapper),
        openInventory: wrapper.readBoolean()
    };

    return packet;
};
