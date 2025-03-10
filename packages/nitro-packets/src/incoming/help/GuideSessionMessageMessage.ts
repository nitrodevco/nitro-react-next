import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionMessageMessageType = {
    chatMessage: string;
    senderId: number;
};

export const GuideSessionMessageMessage: IIncomingPacket<GuideSessionMessageMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionMessageMessageType = {
        chatMessage: wrapper.readString(),
        senderId: wrapper.readInt()
    };

    return packet;
};
