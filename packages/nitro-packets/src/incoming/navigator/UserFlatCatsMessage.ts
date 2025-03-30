import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorCategoryData } from './INavigatorCategoryData';
import { NavigatorCategoryDataParser } from './NavigatorCategoryDataParser';

type UserFlatCatsMessageType = {
    categories: INavigatorCategoryData[];
};

export const UserFlatCatsMessage: IIncomingPacket<UserFlatCatsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UserFlatCatsMessageType = {
        categories: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.categories.push(NavigatorCategoryDataParser(wrapper));

        count--;
    }

    return packet;
};
