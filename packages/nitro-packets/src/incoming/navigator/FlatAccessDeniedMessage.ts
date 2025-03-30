import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FlatAccessDeniedMessageType = {
    userName: string;
};

export const FlatAccessDeniedMessage: IIncomingPacket<FlatAccessDeniedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FlatAccessDeniedMessageType = {
        userName: wrapper.readString()
    };

    return packet;
};
