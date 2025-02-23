import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogClubOfferDataParser } from './CatalogClubOfferDataParser';
import { ICatalogClubOfferData } from './ICatalogClubOfferData';

type HabboClubOffersMessageType = {
    offers: ICatalogClubOfferData[];
};

export const HabboClubOffersMessage: IIncomingPacket<HabboClubOffersMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboClubOffersMessageType = {
        offers: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.offers.push(CatalogClubOfferDataParser(wrapper));

        count--;
    }

    return packet;
};
