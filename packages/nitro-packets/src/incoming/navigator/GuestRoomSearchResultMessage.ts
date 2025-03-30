import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { GuestRoomSearchResultDataParser } from './GuestRoomSearchResultDataParser';
import { IGuestRoomSearchResultData } from './IGuestRoomSearchResultData';

type GuestRoomSearchResultMessageType = {
    data: IGuestRoomSearchResultData;
};

export const GuestRoomSearchResultMessage: IIncomingPacket<GuestRoomSearchResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GuestRoomSearchResultMessageType = {
        data: GuestRoomSearchResultDataParser(wrapper)
    };

    return packet;
};
