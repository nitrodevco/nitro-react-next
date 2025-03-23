import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IMarketplaceOfferData } from './IMarketplaceOfferData';
import { MarketplaceOfferDataParser } from './MarketplaceOfferDataParser';

type MarketplaceOffersMessageType = {
    offers: IMarketplaceOfferData[];
    totalItemsFound: number;
};

export const MarketplaceOffersMessage: IIncomingPacket<MarketplaceOffersMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceOffersMessageType = {
        offers: [],
        totalItemsFound: 0
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const offer = MarketplaceOfferDataParser(wrapper);
        const offerCount = wrapper.readInt();

        offer.offerCount = offerCount;

        packet.offers.push(offer);

        count--;
    }

    packet.totalItemsFound = wrapper.readInt();

    return packet;
};
