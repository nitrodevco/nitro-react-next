import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPendingGuideTicketData } from './IPendingGuideTicketData';

export const PendingGuideTicketDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPendingGuideTicketData = {
        type: wrapper.readInt(),
        secondsAgo: wrapper.readInt(),
        isGuide: wrapper.readBoolean(),
        otherPartyName: wrapper.readString(),
        otherPartyFigure: wrapper.readString(),
        description: wrapper.readString(),
        roomName: wrapper.readString()
    };

    return packet;
}
