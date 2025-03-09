export interface IForumMessageData
{
    groupId: number;
    messageId: number;
    messageIndex: number;
    authorId: number;
    threadId: number;
    creationTime: number;
    messageText: string;
    authorName: string;
    authorFigure: string;
    state: number;
    adminId: number;
    adminName: string;
    adminOperationTimeAsSeccondsAgo: number;
    authorPostCount: number;
}
