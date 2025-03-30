import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorSavedSearchData } from './INavigatorSavedSearchData';
import { NavigatorSavedSearchDataParser } from './NavigatorSavedSearchDataParser';

type NavigatorSavedSearchesMessageType = {
    searches: INavigatorSavedSearchData[];
};

export const NavigatorSavedSearchesMessage: IIncomingPacket<NavigatorSavedSearchesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorSavedSearchesMessageType = {
        searches: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.searches.push(NavigatorSavedSearchDataParser(wrapper));

        count--;
    }

    return packet;
};
