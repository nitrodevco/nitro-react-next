import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogProductDataParser } from './CatalogProductDataParser';
import { ICatalogOfferProductData } from './ICatalogOfferProductData';

type ClubGiftSelectedMessageType = {
    productCode: string;
    products: ICatalogOfferProductData[];
};

export const ClubGiftSelectedMessage: IIncomingPacket<ClubGiftSelectedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ClubGiftSelectedMessageType = {
        productCode: wrapper.readString(),
        products: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.products.push(CatalogProductDataParser(wrapper));

        count--;
    }

    return packet;
};
