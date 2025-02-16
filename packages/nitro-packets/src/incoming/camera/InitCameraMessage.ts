import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type InitCameraMessageType = {
    creditPrice: number;
    ducketPrice: number;
    publishDucketPrice: number;
};

export const InitCameraMessage: IIncomingPacket<InitCameraMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: InitCameraMessageType = {
        creditPrice: 0,
        ducketPrice: 0,
        publishDucketPrice: 0
    };

    packet.creditPrice = wrapper.readInt();
    packet.ducketPrice = wrapper.readInt();

    if (wrapper.bytesAvailable) packet.publishDucketPrice = wrapper.readInt();

    return packet;
};
