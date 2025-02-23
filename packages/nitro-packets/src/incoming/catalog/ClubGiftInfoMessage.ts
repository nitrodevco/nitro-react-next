import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogClubGiftDataParser } from './CatalogClubGiftDataParser';
import { CatalogOfferDataParser } from './CatalogOfferDataParser';
import { ICatalogClubGiftData } from './ICatalogClubGiftData';
import { ICatalogOfferData } from './ICatalogOfferData';

type ClubGiftInfoMessageType = {
    daysUntilNextGift: number;
    giftsAvailable: number;
    offers: ICatalogOfferData[];
    gifts: ICatalogClubGiftData[];
};

export const ClubGiftInfoMessage: IIncomingPacket<ClubGiftInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ClubGiftInfoMessageType = {
        daysUntilNextGift: wrapper.readInt(),
        giftsAvailable: wrapper.readInt(),
        offers: [],
        gifts: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.offers.push(CatalogOfferDataParser(wrapper));

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.gifts.push(CatalogClubGiftDataParser(wrapper));

        count--;
    }

    return packet;
};
