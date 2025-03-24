import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IIssueMessageData } from './IIssueMessageData';
import { PatternMatchDataParser } from './PatternMatchDataParser';

export const IssueMessageDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IIssueMessageData = {
        issueId: wrapper.readInt(),
        state: wrapper.readInt(),
        categoryId: wrapper.readInt(),
        reportedCategoryId: wrapper.readInt(),
        issueAgeInMilliseconds: wrapper.readInt(),
        priority: wrapper.readInt(),
        groupingId: wrapper.readInt(),
        reporterUserId: wrapper.readInt(),
        reporterUserName: wrapper.readString(),
        reportedUserId: wrapper.readInt(),
        reportedUserName: wrapper.readString(),
        pickerUserId: wrapper.readInt(),
        pickerUserName: wrapper.readString(),
        message: wrapper.readString(),
        chatRecordId: wrapper.readInt(),
        patterns: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.patterns.push(PatternMatchDataParser(wrapper));

        count--;
    }

    return packet;
}
