import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogProductDataParser } from './CatalogProductDataParser';
import { ICatalogPurchaseOkOfferData } from './ICatalogPurchaseOkOfferData';

export const CatalogPurchaseOkOfferDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        offerId: wrapper.readInt(),
        localizationId: wrapper.readString(),
        rent: wrapper.readBoolean(),
        priceCredits: wrapper.readInt(),
        priceActivityPoints: wrapper.readInt(),
        priceActivityPointsType: wrapper.readInt(),
        giftable: wrapper.readBoolean(),
        products: []
    } as ICatalogPurchaseOkOfferData;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.products.push(CatalogProductDataParser(wrapper));

        count--;
    }

    packet.clubLevel = wrapper.readInt();
    packet.bundlePurchaseAllowed = wrapper.readBoolean();

    return packet;
}
