import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { GuideTicketCreationResultEnum } from './GuideTicketCreationResultEnum';

type GuideTicketCreationResultMessageType = {
    result: GuideTicketCreationResultEnum;
};

export const GuideTicketCreationResultMessage: IIncomingPacket<GuideTicketCreationResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideTicketCreationResultMessageType = {
        result: wrapper.readInt()
    };

    return packet;
};
