import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IIssueMessageData } from './IIssueMessageData';
import { IssueMessageTypeEnum } from './IssueMessageTypeEnum';

type IssuePickFailedMessageType = {
    issues: IIssueMessageData[];
    retryEnabled: boolean;
    retryCount: number;
};

export const IssuePickFailedMessage: IIncomingPacket<IssuePickFailedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IssuePickFailedMessageType = {
        issues: [],
        retryEnabled: false,
        retryCount: 0
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const issueId = wrapper.readInt();
        const pickerUserId = wrapper.readInt();
        const pickerUserName = wrapper.readString();

        packet.issues.push({
            issueId,
            state: IssueMessageTypeEnum.Failed,
            categoryId: 0,
            reportedCategoryId: 0,
            issueAgeInMilliseconds: 0,
            priority: 0,
            groupingId: 0,
            reporterUserId: 0,
            reporterUserName: null,
            reportedUserId: 0,
            reportedUserName: null,
            pickerUserId,
            pickerUserName,
            message: null,
            chatRecordId: 0,
            patterns: []
        });

        count--;
    }

    return packet;
};
