import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionRequesterRoomMessageType = {
    requesterRoomId: number;
};

export const GuideSessionRequesterRoomMessage: IIncomingPacket<GuideSessionRequesterRoomMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionRequesterRoomMessageType = {
        requesterRoomId: wrapper.readInt()
    };

    return packet;
};
