import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IMarketplaceOfferData } from './IMarketplaceOfferData';
import { MarketplaceOfferDataParser } from './MarketplaceOfferDataParser';

type MarketplaceOwnOffersMessageType = {
    offers: IMarketplaceOfferData[];
    creditsWaiting: number;
};

export const MarketplaceOwnOffersMessage: IIncomingPacket<MarketplaceOwnOffersMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceOwnOffersMessageType = {
        offers: [],
        creditsWaiting: wrapper.readInt()
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.offers.push(MarketplaceOfferDataParser(wrapper));

        count--;
    }

    return packet;
};
