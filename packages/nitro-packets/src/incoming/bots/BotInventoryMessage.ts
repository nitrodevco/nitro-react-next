import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BotDataParser } from './BotDataParser';
import { IBotData } from './IBotData';

type BotInventoryMessageType = {
    items: Record<number, IBotData>;
};

export const BotInventoryMessage: IIncomingPacket<BotInventoryMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BotInventoryMessageType = {
        items: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const item = BotDataParser(wrapper);

        packet.items[item.id] = item;

        count--;
    }

    return packet;
};
