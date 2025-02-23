import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogProductDataParser } from './CatalogProductDataParser';
import { ICatalogOfferData } from './ICatalogOfferData';

export const CatalogOfferDataParser = (wrapper: IMessageDataWrapper): ICatalogOfferData =>
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
    } as ICatalogOfferData;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.products.push(CatalogProductDataParser(wrapper));

        count--;
    }

    packet.clubLevel = wrapper.readInt();
    packet.bundlePurchaseAllowed = wrapper.readBoolean();
    packet.isPet = wrapper.readBoolean();
    packet.previewImage = wrapper.readString();

    return packet;
}
