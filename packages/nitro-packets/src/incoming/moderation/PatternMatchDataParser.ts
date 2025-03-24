import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPatternMatchData } from './IPatternMatchData';

export const PatternMatchDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPatternMatchData = {
        pattern: wrapper.readString(),
        startIndex: wrapper.readInt(),
        endIndex: wrapper.readInt()
    };

    return packet;
}
