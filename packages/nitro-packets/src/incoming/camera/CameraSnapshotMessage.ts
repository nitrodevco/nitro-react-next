import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CameraSnapshotMessageType = {
    roomType: string;
    roomId: number;
};

export const CameraSnapshotMessage: IIncomingPacket<CameraSnapshotMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CameraSnapshotMessageType = {
        roomType: null,
        roomId: -1
    };

    packet.roomType = wrapper.readString();
    packet.roomId = wrapper.readInt();

    return packet;
};
