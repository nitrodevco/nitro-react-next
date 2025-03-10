import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CallForHelpResultMessageType = {
    resultType: number;
    messageText: string;
};

export const CallForHelpResultMessage: IIncomingPacket<CallForHelpResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CallForHelpResultMessageType = {
        resultType: wrapper.readInt(),
        messageText: wrapper.readString()
    };

    return packet;
};
