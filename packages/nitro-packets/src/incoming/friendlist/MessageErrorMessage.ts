import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MessageErrorMessageType = {
    clientMessageId: number;
    errorCode: number;
};

export const MessageErrorMessage: IIncomingPacket<MessageErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MessageErrorMessageType = {
        clientMessageId: wrapper.readInt(),
        errorCode: wrapper.readInt()
    };

    return packet;
};
