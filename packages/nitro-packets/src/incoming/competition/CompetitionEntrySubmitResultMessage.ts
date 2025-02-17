import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CompetitionEntryResultTypeEnum } from './CompetitionEntryResultTypeEnum';

type CompetitionEntrySubmitResultMessageType = {
    goalId: number;
    goalCode: string;
    result: CompetitionEntryResultTypeEnum;
    requiredFurnis: string[];
    missingFurnis: string[];
};

export const CompetitionEntrySubmitResultMessage: IIncomingPacket<CompetitionEntrySubmitResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CompetitionEntrySubmitResultMessageType = {
        goalId: wrapper.readInt(),
        goalCode: wrapper.readString(),
        result: wrapper.readInt(),
        requiredFurnis: [],
        missingFurnis: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.requiredFurnis.push(wrapper.readString());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.missingFurnis.push(wrapper.readString());

        count--;
    }

    return packet;
};
