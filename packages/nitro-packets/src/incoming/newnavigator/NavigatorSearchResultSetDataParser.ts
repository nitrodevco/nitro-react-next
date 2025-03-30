import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorSearchResultSetData } from './INavigatorSearchResultSetData';
import { NavigatorSearchResultListDataParser } from './NavigatorSearchResultListDataParser';

export const NavigatorSearchResultSetDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorSearchResultSetData = {
        code: wrapper.readString(),
        data: wrapper.readString(),
        results: []
    }

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.results.push(NavigatorSearchResultListDataParser(wrapper));

        count--;
    }

    return packet;
}
