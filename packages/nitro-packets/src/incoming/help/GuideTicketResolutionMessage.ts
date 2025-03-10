import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { GuideTicketResolutionEnum } from './GuideTicketResolutionEnum';

type GuideTicketResolutionMessageType = {
    resolution: GuideTicketResolutionEnum;
};

export const GuideTicketResolutionMessage: IIncomingPacket<GuideTicketResolutionMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideTicketResolutionMessageType = {
        resolution: wrapper.readInt()
    };

    return packet;
};
