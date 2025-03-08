import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type InstantMessageErrorMessageType = {
    errorCode: number;
    userId: number;
    message: string;
};

export const InstantMessageErrorMessage: IIncomingPacket<InstantMessageErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: InstantMessageErrorMessageType = {
        errorCode: wrapper.readInt(),
        userId: wrapper.readInt(),
        message: wrapper.readString()
    };

    return packet;
};
