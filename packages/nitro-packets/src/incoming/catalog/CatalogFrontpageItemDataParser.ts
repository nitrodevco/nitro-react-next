import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogFrontpageItemTypeEnum } from './CatalogFrontpageItemTypeEnum';
import { ICatalogFrontpageItemData } from './ICatalogFrontpageItemData';

export const CatalogFrontpageItemDataParser = (wrapper: IMessageDataWrapper): ICatalogFrontpageItemData =>
{
    const packet = {
        position: wrapper.readInt(),
        itemName: wrapper.readString(),
        itemPromoImage: wrapper.readString(),
        type: wrapper.readInt()
    } as ICatalogFrontpageItemData;

    switch (packet.type)
    {
        case CatalogFrontpageItemTypeEnum.CatalogPage:
            packet.catalogPageLocation = wrapper.readString();
            break;
        case CatalogFrontpageItemTypeEnum.ProductOffer:
            packet.productOfferId = wrapper.readInt();
            break;
        case CatalogFrontpageItemTypeEnum.Iap:
            packet.productCode = wrapper.readString();
            break;
    }

    const time = wrapper.readInt();
    const tickerTime = Date.now(); // TODO GetTickerTime()

    packet.expirationTime = ((time > 0) ? ((time * 1000) + tickerTime) : 0);

    return packet;
}
