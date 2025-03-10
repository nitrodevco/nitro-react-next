import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CallForHelpReplyMessageType = {
    message: string;
};

export const CallForHelpReplyMessage: IIncomingPacket<CallForHelpReplyMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CallForHelpReplyMessageType = {
        message: wrapper.readString()
    };

    return packet;
};
