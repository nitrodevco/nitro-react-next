import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CompetitionVotingResultTypeEnum } from './CompetitionVotingResultTypeEnum';

type CompetitionVotingInfoMessageType = {
    goalId: number;
    goalCode: string;
    resultCode: CompetitionVotingResultTypeEnum;
    votesRemaining: number;
};

export const CompetitionVotingInfoMessage: IIncomingPacket<CompetitionVotingInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CompetitionVotingInfoMessageType = {
        goalId: wrapper.readInt(),
        goalCode: wrapper.readString(),
        resultCode: wrapper.readInt(),
        votesRemaining: wrapper.readInt(),
    };

    return packet;
};
