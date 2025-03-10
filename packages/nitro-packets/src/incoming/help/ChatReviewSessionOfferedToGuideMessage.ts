import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ChatReviewSessionOfferedToGuideMessageType = {
    acceptanceTimeout: number;
};

export const ChatReviewSessionOfferedToGuideMessage: IIncomingPacket<ChatReviewSessionOfferedToGuideMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChatReviewSessionOfferedToGuideMessageType = {
        acceptanceTimeout: wrapper.readInt()
    };

    return packet;
};
