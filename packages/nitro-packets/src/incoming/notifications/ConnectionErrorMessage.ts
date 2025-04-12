import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ConnectionErrorMessageType = {
    messageId: number;
    errorCode: number;
    timestamp: string;
};

export const ConnectionErrorMessage: IIncomingPacket<ConnectionErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ConnectionErrorMessageType = {
        messageId: wrapper.readInt(),
        errorCode: wrapper.readInt(),
        timestamp: wrapper.readString()
    };

    return packet;
};
