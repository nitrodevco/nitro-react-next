import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogOfferDataParser } from './CatalogOfferDataParser';
import { ICatalogOfferData } from './ICatalogOfferData';

type ProductOfferMessageType = {
    offer: ICatalogOfferData;
};

export const ProductOfferMessage: IIncomingPacket<ProductOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ProductOfferMessageType = {
        offer: CatalogOfferDataParser(wrapper)
    };

    return packet;
};
