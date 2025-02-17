import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ProductOfferMessageType = {

};

export const ProductOfferMessage: IIncomingPacket<ProductOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ProductOfferMessageType = {
        offer: null,
    };



    return packet;
};