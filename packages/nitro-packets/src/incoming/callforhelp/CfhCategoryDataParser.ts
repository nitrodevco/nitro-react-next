import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CfhTopicDataParser } from './CfhTopicDataParser';
import { ICfhCategoryData } from './ICfhCategoryData';

export const CfhCategoryDataParser = (wrapper: IMessageDataWrapper): ICfhCategoryData =>
{
    const packet = {} as ICfhCategoryData;

    packet.name = wrapper.readString();
    packet.topics = [];

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.topics.push(CfhTopicDataParser(wrapper));

        count--;
    }

    return packet;
}
