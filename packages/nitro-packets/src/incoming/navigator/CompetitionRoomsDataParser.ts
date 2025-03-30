import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICompetitionRoomsData } from './ICompetitionRoomsData';

export const CompetitionRoomsDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICompetitionRoomsData = {
        goalId: wrapper.readInt(),
        pageIndex: wrapper.readInt(),
        pageCount: wrapper.readInt()
    }

    return packet;
}
