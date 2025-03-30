export interface ICategoryWithVisitorCountData
{
    categoryToCurrentUserCount: Record<number, number>;
    categoryToMaxUserCount: Record<number, number>;
}
