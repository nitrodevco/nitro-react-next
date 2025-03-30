import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICategoryWithVisitorCountData } from './ICategoryWithVisitorCountData';

export const CategoryWithVisitorCountDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICategoryWithVisitorCountData = {
        categoryToCurrentUserCount: {},
        categoryToMaxUserCount: {}
    }

    let count = wrapper.readInt();

    while (count > 0)
    {
        const categoryId = wrapper.readInt();

        packet.categoryToCurrentUserCount[categoryId] = wrapper.readInt();
        packet.categoryToMaxUserCount[categoryId] = wrapper.readInt();

        count--;
    }

    return packet;
}
