import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraStorageUrlMessageType = {
    url: string;
};

export const CameraStorageUrlMessage: IIncomingPacket<CameraStorageUrlMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraStorageUrlMessageType = {
        url: wrapper.readString()
    };

    return packet;
};
