import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ITradingItemData } from './ITradingItemData';
import { TradingItemDataParser } from './TradingItemDataParser';

type TradingListItemMessageType = {
    firstUserId: number;
    firstUserItems: ITradingItemData[];
    firstUserItemCount: number;
    firstUserCredits: number;
    secondUserId: number;
    secondUserItems: ITradingItemData[];
    secondUserItemCount: number;
    secondUserCredits: number;
};

export const TradingListItemMessage: IIncomingPacket<TradingListItemMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        firstUserId: wrapper.readInt(),
        firstUserItems: [],
        secondUserItems: []
    } as TradingListItemMessageType;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.firstUserItems.push(TradingItemDataParser(wrapper));

        count--;
    }

    packet.firstUserItemCount = wrapper.readInt();
    packet.firstUserCredits = wrapper.readInt();
    packet.secondUserId = wrapper.readInt();

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.secondUserItems.push(TradingItemDataParser(wrapper));

        count--;
    }

    packet.secondUserItemCount = wrapper.readInt();
    packet.secondUserCredits = wrapper.readInt();

    return packet;
};
