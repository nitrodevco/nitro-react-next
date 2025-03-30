import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorEventCategoryData } from './INavigatorEventCategoryData';
import { NavigatorEventCategoryDataParser } from './NavigatorEventCategoryDataParser';

type UserEventCatsMessageType = {
    categories: INavigatorEventCategoryData[];
};

export const UserEventCatsMessage: IIncomingPacket<UserEventCatsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: UserEventCatsMessageType = {
        categories: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.categories.push(NavigatorEventCategoryDataParser(wrapper));

        count--;
    }

    return packet;
};
