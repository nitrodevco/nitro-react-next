import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogProductTypeEnum } from './CatalogProductTypeEnum';
import { ICatalogOfferProductData } from './ICatalogOfferProductData';

export const CatalogProductDataParser = (wrapper: IMessageDataWrapper): ICatalogOfferProductData =>
{
    const packet = {
        productType: wrapper.readString()
    } as ICatalogOfferProductData;

    if (packet.productType === CatalogProductTypeEnum.Badge)
    {
        packet.extraParam = wrapper.readString();
        packet.productCount = 1;
    }
    else
    {
        packet.furniClassId = wrapper.readInt();
        packet.extraParam = wrapper.readString();
        packet.productCount = wrapper.readInt();
        packet.uniqueLimitedItem = wrapper.readBoolean();

        if (packet.uniqueLimitedItem)
        {
            packet.uniqueLimitedItemSeriesSize = wrapper.readInt();
            packet.uniqueLimitedItemsLeft = wrapper.readInt();
        }
    }

    return packet;
}
