import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MarketplaceItemStatsMessageType = {
    averagePrice: number;
    currentOfferCount: number;
    historyLength: number;
    dayOffsets: number[];
    averagePrices: number[];
    soldAmounts: number[];
    furniTypeId: number;
    furniCategoryId: number;
};

export const MarketplaceItemStatsMessage: IIncomingPacket<MarketplaceItemStatsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        averagePrice: wrapper.readInt(),
        currentOfferCount: wrapper.readInt(),
        historyLength: wrapper.readInt(),
        dayOffsets: [],
        averagePrices: [],
        soldAmounts: []
    } as MarketplaceItemStatsMessageType;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.dayOffsets.push(wrapper.readInt());
        packet.averagePrices.push(wrapper.readInt());
        packet.soldAmounts.push(wrapper.readInt());

        count--;
    }

    packet.furniCategoryId = wrapper.readInt();
    packet.furniTypeId = wrapper.readInt();

    return packet;
};
