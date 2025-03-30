import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IGuestRoomSearchResultData } from './IGuestRoomSearchResultData';
import { OfficialRoomEntryDataParser } from './OfficialRoomEntryDataParser';
import { RoomDataParser } from './RoomDataParser';

export const GuestRoomSearchResultDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IGuestRoomSearchResultData = {
        searchType: wrapper.readInt(),
        searchParam: wrapper.readString(),
        rooms: [],
        ad: null
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.rooms.push(RoomDataParser(wrapper));

        count--;
    }

    const hasAdditional = wrapper.readBoolean();

    if (hasAdditional)
    {
        packet.ad = OfficialRoomEntryDataParser(wrapper);
    }

    return packet;
}
