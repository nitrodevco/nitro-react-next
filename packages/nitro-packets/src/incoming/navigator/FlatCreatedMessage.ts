import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type FlatCreatedMessageType = {
    roomId: number;
    roomName: string;
};

export const FlatCreatedMessage: IIncomingPacket<FlatCreatedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FlatCreatedMessageType = {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString()
    };

    return packet;
};
