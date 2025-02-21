import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomAdErrorMessageType = {
    errorCode: number;
    filteredText: string;
};

export const RoomAdErrorMessage: IIncomingPacket<RoomAdErrorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomAdErrorMessageType = {
        errorCode: wrapper.readInt(),
        filteredText: wrapper.readString()
    };

    return packet;
};
