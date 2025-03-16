import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CampaignCalendarDataParser } from './CampaignCalendarDataParser';
import { ICampaignCalendarData } from './ICampaignCalendarData';

type CampaignCalendarDataMessageType = {
    calendarData: ICampaignCalendarData;
};

export const CampaignCalendarDataMessage: IIncomingPacket<CampaignCalendarDataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CampaignCalendarDataMessageType = {
        calendarData: CampaignCalendarDataParser(wrapper)
    };

    return packet;
};
