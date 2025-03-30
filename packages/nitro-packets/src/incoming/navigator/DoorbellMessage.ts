import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type DoorbellMessageType = {
    userName: string;
};

export const DoorbellMessage: IIncomingPacket<DoorbellMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: DoorbellMessageType = {
        userName: wrapper.readString()
    };

    return packet;
};
