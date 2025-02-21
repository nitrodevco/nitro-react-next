import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type InitCameraMessageType = {
    creditPrice: number;
    ducketPrice: number;
    publishDucketPrice: number;
};

export const InitCameraMessage: IIncomingPacket<InitCameraMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: InitCameraMessageType = {
        creditPrice: wrapper.readInt(),
        ducketPrice: wrapper.readInt(),
        publishDucketPrice: 0
    };

    if (wrapper.bytesAvailable) packet.publishDucketPrice = wrapper.readInt();

    return packet;
};
