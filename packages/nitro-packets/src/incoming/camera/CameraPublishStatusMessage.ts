import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraPublishStatusMessageType = {
    ok: boolean;
    secondsToWait: number;
    extraDataId: string;
};

export const CameraPublishStatusMessage: IIncomingPacket<CameraPublishStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraPublishStatusMessageType = {
        ok: false,
        secondsToWait: 0,
        extraDataId: null
    };

    packet.ok = wrapper.readBoolean();
    packet.secondsToWait = wrapper.readInt();

    if (packet.ok && wrapper.bytesAvailable) packet.extraDataId = wrapper.readString();

    return packet;
};
