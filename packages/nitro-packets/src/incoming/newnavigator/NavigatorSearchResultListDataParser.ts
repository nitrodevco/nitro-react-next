import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { RoomDataParser } from '../navigator/RoomDataParser';
import { INavigatorSearchResultListData } from './INavigatorSearchResultListData';

export const NavigatorSearchResultListDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: INavigatorSearchResultListData = {
        code: wrapper.readString(),
        data: wrapper.readString(),
        action: wrapper.readInt(),
        closed: wrapper.readBoolean(),
        mode: wrapper.readInt(),
        rooms: []
    }

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.rooms.push(RoomDataParser(wrapper));

        count--;
    }

    return packet;
}
