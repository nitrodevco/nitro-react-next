import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type IssueDeletedMessageType = {
    issueId: number;
};

export const IssueDeletedMessage: IIncomingPacket<IssueDeletedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IssueDeletedMessageType = {
        issueId: wrapper.readInt()
    };

    return packet;
};
