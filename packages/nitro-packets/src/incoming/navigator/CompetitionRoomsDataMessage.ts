import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CompetitionRoomsDataParser } from './CompetitionRoomsDataParser';
import { ICompetitionRoomsData } from './ICompetitionRoomsData';

type CompetitionRoomsDataMessageType = {
    data: ICompetitionRoomsData;
};

export const CompetitionRoomsDataMessage: IIncomingPacket<CompetitionRoomsDataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CompetitionRoomsDataMessageType = {
        data: CompetitionRoomsDataParser(wrapper)
    };

    return packet;
};
