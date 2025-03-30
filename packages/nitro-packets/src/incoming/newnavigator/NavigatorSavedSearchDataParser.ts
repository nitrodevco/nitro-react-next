import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorSavedSearchData } from './INavigatorSavedSearchData';

export const NavigatorSavedSearchDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorSavedSearchData = {
        id: wrapper.readInt(),
        code: wrapper.readString(),
        filter: wrapper.readString(),
        localization: wrapper.readString()
    };

    return packet;
}
