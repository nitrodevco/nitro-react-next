import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AchievementsScoreMessageType = {
    score: number;
};

export const AchievementsScoreMessage: IIncomingPacket<AchievementsScoreMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AchievementsScoreMessageType = {
        score: wrapper.readInt()
    };

    return packet;
};
