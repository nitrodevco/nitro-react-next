import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogPurchaseOkOfferDataParser } from './CatalogPurchaseOkOfferDataParser';
import { ICatalogPurchaseOkOfferData } from './ICatalogPurchaseOkOfferData';

type PurchaseOKMessageType = {
    offer: ICatalogPurchaseOkOfferData;
};

export const PurchaseOKMessage: IIncomingPacket<PurchaseOKMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PurchaseOKMessageType = {
        offer: CatalogPurchaseOkOfferDataParser(wrapper)
    };

    return packet;
};
