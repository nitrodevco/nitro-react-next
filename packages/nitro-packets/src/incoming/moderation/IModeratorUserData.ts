export interface IModeratorUserData
{
    userId: number;
    userName: string;
    registrationAgeInMinutes: number;
    minutesSinceLastLogin: number;
    online: boolean;
    cfhCount: number;
    abusiveCfhCount: number;
    cautionCount: number;
    banCount: number;
    tradingLockCount: number;
    tradingExpiryDate: string;
    lastPurchaseDate: string;
    identityId: number;
    identityRelatedBanCount: number;
    primaryEmailAddress: string;
    figure: string;
    userClassification: string;
    lastSanctionTime: string;
    sanctionAgeHours: number;
}
