import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IIssueMessageData } from './IIssueMessageData';
import { IssueMessageDataParser } from './IssueMessageDataParser';

type IssueInfoMessageType = {
    issueData: IIssueMessageData;
};

export const IssueInfoMessage: IIncomingPacket<IssueInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IssueInfoMessageType = {
        issueData: IssueMessageDataParser(wrapper)
    };

    return packet;
};
