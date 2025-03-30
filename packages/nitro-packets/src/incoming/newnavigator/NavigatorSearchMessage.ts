import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorSearchResultSetData } from './INavigatorSearchResultSetData';
import { NavigatorSearchResultSetDataParser } from './NavigatorSearchResultSetDataParser';

type NavigatorSearchMessageType = {
    result: INavigatorSearchResultSetData;
};

export const NavigatorSearchMessage: IIncomingPacket<NavigatorSearchMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorSearchMessageType = {
        result: NavigatorSearchResultSetDataParser(wrapper)
    };

    return packet;
};
