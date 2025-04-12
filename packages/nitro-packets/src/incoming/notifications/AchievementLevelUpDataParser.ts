import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IAchievementLevelUpData } from './IAchievementLevelUpData';

export const AchievementLevelUpDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IAchievementLevelUpData = {
        type: wrapper.readInt(),
        level: wrapper.readInt(),
        badgeId: wrapper.readInt(),
        badgeCode: wrapper.readString(),
        points: wrapper.readInt(),
        levelRewardPoints: wrapper.readInt(),
        levelRewardPointType: wrapper.readInt(),
        bonusPoints: wrapper.readInt(),
        achievementId: wrapper.readInt(),
        removedBadgeCode: wrapper.readString(),
        category: wrapper.readString(),
        showDialogToUser: wrapper.readBoolean()
    };

    return packet;
}
