import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CommunityVoteReceivedMessageType = {
    acknowledged: boolean;
};

export const CommunityVoteReceivedMessage: IIncomingPacket<CommunityVoteReceivedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CommunityVoteReceivedMessageType = {
        acknowledged: wrapper.readBoolean()
    };

    return packet;
};
