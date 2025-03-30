import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPopularRoomTagsData } from './IPopularRoomTagsData';
import { PopularRoomTagsDataParser } from './PopularRoomTagsDataParser';

type PopularRoomTagsResultMessageType = {
    data: IPopularRoomTagsData;
};

export const PopularRoomTagsResultMessage: IIncomingPacket<PopularRoomTagsResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: PopularRoomTagsResultMessageType = {
        data: PopularRoomTagsDataParser(wrapper)
    };

    return packet;
};
