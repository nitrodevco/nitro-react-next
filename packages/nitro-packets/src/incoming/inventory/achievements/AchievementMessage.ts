import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { AchievementDataParser } from './AchievementDataParser';
import { IAchievementData } from './IAchievementData';

type AchievementMessageType = {
    achievement: IAchievementData;
};

export const AchievementMessage: IIncomingPacket<AchievementMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AchievementMessageType = {
        achievement: AchievementDataParser(wrapper)
    };

    return packet;
};
