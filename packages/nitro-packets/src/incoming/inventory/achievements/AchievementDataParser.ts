import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IAchievementData } from './IAchievementData';

export const AchievementDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IAchievementData = {
        achievementId: wrapper.readInt(),
        level: wrapper.readInt(),
        badgeId: wrapper.readString(),
        scoreAtStartOfLevel: wrapper.readInt(),
        scoreLimit: Math.max(1, wrapper.readInt()),
        levelRewardPoints: wrapper.readInt(),
        levelRewardPointType: wrapper.readInt(),
        currentPoints: wrapper.readInt(),
        finalLevel: wrapper.readBoolean(),
        category: wrapper.readString(),
        subCategory: wrapper.readString(),
        levelCount: wrapper.readInt(),
        displayMethod: wrapper.readInt()
    };

    return packet;
}
