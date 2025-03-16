export interface IAchievementData
{
    achievementId: number;
    level: number;
    badgeId: string;
    scoreAtStartOfLevel: number;
    scoreLimit: number;
    levelRewardPoints: number;
    levelRewardPointType: number;
    currentPoints: number;
    finalLevel: boolean;
    category: string;
    subCategory: string;
    levelCount: number;
    displayMethod: number;
}
