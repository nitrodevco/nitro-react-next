import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GenericErrorMessageType = {
    errorCode: number;
};

export const GenericErrorMessage: IIncomingPacket<GenericErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GenericErrorMessageType = {
        errorCode: wrapper.readInt()
    };

    return packet;
};
