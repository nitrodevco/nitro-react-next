import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ChatReviewVotingStatusEnum } from './ChatReviewVotingStatusEnum';

type ChatReviewSessionVotingStatusMessageType = {
    status: ChatReviewVotingStatusEnum[];
};

export const ChatReviewSessionVotingStatusMessage: IIncomingPacket<ChatReviewSessionVotingStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ChatReviewSessionVotingStatusMessageType = {
        status: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.status.push(wrapper.readInt());

        count--;
    }

    return packet;
};
