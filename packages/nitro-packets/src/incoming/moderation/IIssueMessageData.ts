import { IPatternMatchData } from './IPatternMatchData';
import { IssueMessageTypeEnum } from './IssueMessageTypeEnum';

export interface IIssueMessageData
{
    issueId: number;
    state: IssueMessageTypeEnum;
    categoryId: number;
    reportedCategoryId: number;
    issueAgeInMilliseconds: number;
    priority: number;
    groupingId: number;
    reporterUserId: number;
    reporterUserName: string;
    reportedUserId: number;
    reportedUserName: string;
    pickerUserId: number;
    pickerUserName: string;
    message: string;
    chatRecordId: number;
    patterns: IPatternMatchData[];
}
