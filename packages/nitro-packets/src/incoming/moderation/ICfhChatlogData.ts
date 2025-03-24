import { IChatRecordData } from './IChatRecordData';

export interface ICfhChatlogData
{
    issueId: number;
    callerUserId: number;
    reportedUserId: number;
    chatRecordId: number;
    chatRecord: IChatRecordData;
}
