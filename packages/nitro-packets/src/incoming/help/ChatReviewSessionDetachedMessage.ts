import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ChatReviewSessionDetachedMessageType = {
};

export const ChatReviewSessionDetachedMessage: IIncomingPacket<ChatReviewSessionDetachedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChatReviewSessionDetachedMessageType = {};

    return packet;
};
