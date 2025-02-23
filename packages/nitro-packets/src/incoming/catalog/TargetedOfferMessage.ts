import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogTargetedOfferDataParser } from './CatalogTargetedOfferDataParser';
import { ICatalogTargetedOfferData } from './ICatalogTargetedOfferData';

type TargetedOfferMessageType = {
    data: ICatalogTargetedOfferData;
};

export const TargetedOfferMessage: IIncomingPacket<TargetedOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TargetedOfferMessageType = {
        data: CatalogTargetedOfferDataParser(wrapper),
    };

    return packet;
};
