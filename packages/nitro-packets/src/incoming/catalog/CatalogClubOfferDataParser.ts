import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogClubOfferData } from './ICatalogClubOfferData';

export const CatalogClubOfferDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICatalogClubOfferData = {
        offerId: wrapper.readInt(),
        productCode: wrapper.readString(),
        unknownValue: wrapper.readBoolean(),
        priceCredits: wrapper.readInt(),
        priceActivityPoints: wrapper.readInt(),
        priceActivityPointsType: wrapper.readInt(),
        vip: wrapper.readBoolean(),
        months: wrapper.readInt(),
        extraDays: wrapper.readInt(),
        giftable: wrapper.readBoolean(),
        daysLeftAfterPurchase: wrapper.readInt(),
        year: wrapper.readInt(),
        month: wrapper.readInt(),
        day: wrapper.readInt()
    };

    return packet;
}
