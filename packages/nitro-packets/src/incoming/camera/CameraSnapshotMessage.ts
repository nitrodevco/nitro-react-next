import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraSnapshotMessageType = {
    roomType: string;
    roomId: number;
};

export const CameraSnapshotMessage: IIncomingPacket<CameraSnapshotMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraSnapshotMessageType = {
        roomType: wrapper.readString(),
        roomId: wrapper.readInt()
    };

    return packet;
};
