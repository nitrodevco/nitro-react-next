import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPendingGuideTicketData } from './IPendingGuideTicketData';
import { PendingGuideTicketDataParser } from './PendingGuideTicketDataParser';

type GuideReportingStatusMessageType = {
    statusCode: number;
    pendingTicket: IPendingGuideTicketData;
};

export const GuideReportingStatusMessage: IIncomingPacket<GuideReportingStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideReportingStatusMessageType = {
        statusCode: wrapper.readInt(),
        pendingTicket: PendingGuideTicketDataParser(wrapper)
    };

    return packet;
};
