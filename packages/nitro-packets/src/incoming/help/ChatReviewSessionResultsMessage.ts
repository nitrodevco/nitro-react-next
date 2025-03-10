import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ChatReviewSessionResultsMessageType = {
    winningVoteCode: number;
    ownVoteCode: number;
    finalStatus: number[];
};

export const ChatReviewSessionResultsMessage: IIncomingPacket<ChatReviewSessionResultsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChatReviewSessionResultsMessageType = {
        winningVoteCode: wrapper.readInt(),
        ownVoteCode: wrapper.readInt(),
        finalStatus: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.finalStatus.push(wrapper.readInt());

        count--;
    }

    return packet;
};
