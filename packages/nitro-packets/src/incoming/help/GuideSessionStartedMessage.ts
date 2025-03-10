import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GuideSessionStartedMessageType = {
    requesterUserId: number;
    requesterName: string;
    requesterFigure: string;
    guideUserId: number;
    guideName: string;
    guideFigure: string;
};

export const GuideSessionStartedMessage: IIncomingPacket<GuideSessionStartedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuideSessionStartedMessageType = {
        requesterUserId: wrapper.readInt(),
        requesterName: wrapper.readString(),
        requesterFigure: wrapper.readString(),
        guideUserId: wrapper.readInt(),
        guideName: wrapper.readString(),
        guideFigure: wrapper.readString()
    };

    return packet;
};
