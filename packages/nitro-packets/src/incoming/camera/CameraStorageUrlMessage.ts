import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraStorageUrlMessageType = {
    url: string;
};

export const CameraStorageUrlMessage: IIncomingPacket<CameraStorageUrlMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraStorageUrlMessageType = {
        url: ''
    };

    packet.url = wrapper.readString();

    return packet;
};
