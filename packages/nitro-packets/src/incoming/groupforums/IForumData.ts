export interface IForumData
{
    groupId: number;
    name: string;
    description: string;
    icon: string;
    totalThreads: number;
    leaderboardScore: number;
    totalMessages: number;
    unreadMessages: number;
    lastMessageId: number;
    lastMessageAuthorId: number;
    lastMessageAuthorName: string;
    lastMessageTimeAsSecondsAgo: number;
}
