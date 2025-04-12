import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type HabboBroadcastMessageType = {
    message: string;
};

export const HabboBroadcastMessage: IIncomingPacket<HabboBroadcastMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboBroadcastMessageType = {
        message: wrapper.readString()
    };

    return packet;
};
