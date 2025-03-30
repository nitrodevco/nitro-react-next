import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CategoryWithVisitorCountDataParser } from './CategoryWithVisitorCountDataParser';
import { ICategoryWithVisitorCountData } from './ICategoryWithVisitorCountData';

type CategoriesWithVisitorCountMessageType = {
    data: ICategoryWithVisitorCountData;
};

export const CategoriesWithVisitorCountMessage: IIncomingPacket<CategoriesWithVisitorCountMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CategoriesWithVisitorCountMessageType = {
        data: CategoryWithVisitorCountDataParser(wrapper)
    };

    return packet;
};
