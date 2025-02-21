import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraPublishStatusMessageType = {
    ok: boolean;
    secondsToWait: number;
    extraDataId: string;
};

export const CameraPublishStatusMessage: IIncomingPacket<CameraPublishStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraPublishStatusMessageType = {
        ok: wrapper.readBoolean(),
        secondsToWait: wrapper.readInt(),
        extraDataId: null
    };
    if (packet.ok && wrapper.bytesAvailable) packet.extraDataId = wrapper.readString();

    return packet;
};
