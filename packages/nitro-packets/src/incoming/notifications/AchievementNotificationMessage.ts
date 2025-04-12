import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { AchievementLevelUpDataParser } from './AchievementLevelUpDataParser';
import { IAchievementLevelUpData } from './IAchievementLevelUpData';

type AchievementNotificationMessageType = {
    data: IAchievementLevelUpData;
};

export const AchievementNotificationMessage: IIncomingPacket<AchievementNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AchievementNotificationMessageType = {
        data: AchievementLevelUpDataParser(wrapper)
    };

    return packet;
};
