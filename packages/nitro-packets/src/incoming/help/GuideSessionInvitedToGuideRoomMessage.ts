import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionInvitedToGuideRoomMessageType = {
    roomId: number;
    roomName: string;
};

export const GuideSessionInvitedToGuideRoomMessage: IIncomingPacket<GuideSessionInvitedToGuideRoomMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionInvitedToGuideRoomMessageType = {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString()
    };

    return packet;
};
