import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { AchievementDataParser } from './AchievementDataParser';
import { IAchievementData } from './IAchievementData';

type AchievementsMessageType = {
    achievements: IAchievementData[];
    defaultCategory: string;
};

export const AchievementsMessage: IIncomingPacket<AchievementsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AchievementsMessageType = {
        achievements: [],
        defaultCategory: null
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.achievements.push(AchievementDataParser(wrapper));

        count--;
    }

    packet.defaultCategory = wrapper.readString();

    return packet;
};
