import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICampaignCalendarData } from './ICampaignCalendarData';

export const CampaignCalendarDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {} as ICampaignCalendarData;

    packet.campaignName = wrapper.readString();
    packet.campaignImage = wrapper.readString();
    packet.currentDay = wrapper.readInt();
    packet.campaignDays = wrapper.readInt();
    packet.openedDays = [];
    packet.missedDays = [];

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.openedDays.push(wrapper.readInt());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.missedDays.push(wrapper.readInt());

        count--;
    }

    return packet;
}
