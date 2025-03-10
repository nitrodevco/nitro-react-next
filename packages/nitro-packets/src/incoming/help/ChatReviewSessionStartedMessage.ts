import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ChatReviewSessionStartedMessageType = {
    votingTimeout: number;
    chatRecord: string;
};

export const ChatReviewSessionStartedMessage: IIncomingPacket<ChatReviewSessionStartedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChatReviewSessionStartedMessageType = {
        votingTimeout: wrapper.readInt(),
        chatRecord: wrapper.readString()
    };

    return packet;
};
