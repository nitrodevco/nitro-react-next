import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogProductDataParser } from './CatalogProductDataParser';
import { ICatalogProductData } from './ICatalogProductData';

type ClubGiftSelectedMessageType = {
    productCode: string;
    products: ICatalogProductData[];
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
