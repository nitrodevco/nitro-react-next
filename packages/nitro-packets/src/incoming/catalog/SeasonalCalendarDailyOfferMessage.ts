import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogOfferDataParser } from './CatalogOfferDataParser';
import { ICatalogOfferData } from './ICatalogOfferData';

type SeasonalCalendarDailyOfferMessageType = {
    pageId: number;
    data: ICatalogOfferData;
};

export const SeasonalCalendarDailyOfferMessage: IIncomingPacket<SeasonalCalendarDailyOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SeasonalCalendarDailyOfferMessageType = {
        pageId: wrapper.readInt(),
        data: CatalogOfferDataParser(wrapper)
    };

    return packet;
};
