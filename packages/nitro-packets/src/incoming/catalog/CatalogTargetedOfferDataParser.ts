import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogTargetedOfferData } from './ICatalogTargetedOfferData';

export const CatalogTargetedOfferDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICatalogTargetedOfferData = {
        trackingState: wrapper.readInt(),
        id: wrapper.readInt(),
        identifier: wrapper.readString(),
        productCode: wrapper.readString(),
        priceInCredits: wrapper.readInt(),
        priceInActivityPoints: wrapper.readInt(),
        activityPointType: wrapper.readInt(),
        purchaseLimit: wrapper.readInt(),
        expirationTime: wrapper.readInt(),
        title: wrapper.readString(),
        description: wrapper.readString(),
        imageUrl: wrapper.readString(),
        iconImageUrl: wrapper.readString(),
        type: wrapper.readInt(),
        subProductCodes: []
    };

    packet.expirationTime = ((packet.expirationTime > 0) ? ((packet.expirationTime * 1000) + Date.now()) : 0);

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.subProductCodes.push(wrapper.readString());

        count--;
    }

    return packet;
}
