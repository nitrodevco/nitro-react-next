import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorTopLevelContextData } from './INavigatorTopLevelContextData';
import { NavigatorSavedSearchDataParser } from './NavigatorSavedSearchDataParser';

export const NavigatorTopLevelContextDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorTopLevelContextData = {
        code: wrapper.readString(),
        savedSearches: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.savedSearches.push(NavigatorSavedSearchDataParser(wrapper));

        count--;
    }

    return packet;
}
