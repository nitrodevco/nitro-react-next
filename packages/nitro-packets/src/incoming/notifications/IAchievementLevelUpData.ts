export interface IAchievementLevelUpData
{
    type: number;
    level: number;
    points: number;
    levelRewardPoints: number;
    levelRewardPointType: number;
    bonusPoints: number;
    badgeId: number;
    badgeCode: string;
    removedBadgeCode: string;
    achievementId: number;
    category: string;
    showDialogToUser: boolean;
}
