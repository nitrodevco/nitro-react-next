import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogClubOfferExtendData } from './ICatalogClubOfferExtendData';

export const CatalogClubOfferExtendDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICatalogClubOfferExtendData = {
        originalPrice: wrapper.readInt(),
        originalActivityPointPrice: wrapper.readInt(),
        originalActivityPointType: wrapper.readInt(),
        subscriptionDaysLeft: wrapper.readInt()
    };

    return packet;
}
