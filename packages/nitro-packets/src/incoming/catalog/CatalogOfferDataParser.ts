import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogProductDataParser } from './CatalogProductDataParser';
import { ICatalogOfferData } from './ICatalogOfferData';

export const CatalogOfferDataParser = (wrapper: IMessageDataWrapper): ICatalogOfferData =>
{
    const packet = {} as ICatalogOfferData;

    packet.offerId = wrapper.readInt();
    packet.localizationId = wrapper.readString();
    packet.rent = wrapper.readBoolean();
    packet.priceCredits = wrapper.readInt();
    packet.priceActivityPoints = wrapper.readInt();
    packet.priceActivityPointsType = wrapper.readInt();
    packet.giftable = wrapper.readBoolean();
    packet.products = [];

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
