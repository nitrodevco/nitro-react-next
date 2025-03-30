import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPopularRoomTagsData } from './IPopularRoomTagsData';
import { PopularRoomTagDataParser } from './PopularRoomTagDataParser';

export const PopularRoomTagsDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPopularRoomTagsData = {
        tags: []
    }

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.tags.push(PopularRoomTagDataParser(wrapper));

        count--;
    }

    return packet;
}
