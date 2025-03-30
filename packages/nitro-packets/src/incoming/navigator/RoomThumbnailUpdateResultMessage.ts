import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomThumbnailUpdateResultMessageType = {
    flatId: number;
    resultCode: number;
};

export const RoomThumbnailUpdateResultMessage: IIncomingPacket<RoomThumbnailUpdateResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomThumbnailUpdateResultMessageType = {
        flatId: wrapper.readInt(),
        resultCode: wrapper.readInt()
    };

    return packet;
};
