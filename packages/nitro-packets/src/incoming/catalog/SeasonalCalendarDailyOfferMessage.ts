import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type SeasonalCalendarDailyOfferMessageType = {
    pageId: number;
};

export const SeasonalCalendarDailyOfferMessage: IIncomingPacket<SeasonalCalendarDailyOfferMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SeasonalCalendarDailyOfferMessageType = {
        pageId: -1,
        data: null,
    };

    packet.pageId = wrapper.readInt();

    return packet;
};