export interface IForumThreadData
{
    threadId: number;
    authorId: number;
    authorName: string;
    creationTimeAsSecondsAgo: number;
    header: string;
    totalMessages: number;
    unreadMessagesCount: number;
    lastMessageId: number;
    lastUserId: number;
    lastUserName: string;
    lastCommentTime: number;
    state: number;
    adminId: number;
    adminName: string;
    adminOperationTimeAsSecondsAgo: number;
    isPinned: boolean;
    isLocked: boolean;
}
