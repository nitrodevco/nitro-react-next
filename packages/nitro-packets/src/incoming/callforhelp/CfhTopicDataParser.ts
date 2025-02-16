import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICfhTopicData } from './ICfhTopicData';

export const CfhTopicDataParser = (wrapper: IMessageDataWrapper): ICfhTopicData =>
{
    return {
        name: wrapper.readString(),
        id: wrapper.readInt(),
        consequence: wrapper.readString()
    };
}
