import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogClubGiftData } from './ICatalogClubGiftData';

export const CatalogClubGiftDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICatalogClubGiftData = {
        offerId: wrapper.readInt(),
        isVip: wrapper.readBoolean(),
        daysRequired: wrapper.readInt(),
        isSelectable: wrapper.readBoolean()
    };

    return packet;
}
