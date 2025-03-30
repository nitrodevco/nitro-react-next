import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IPopularRoomTagData } from './IPopularRoomTagData';

export const PopularRoomTagDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IPopularRoomTagData = {
        tagName: wrapper.readString(),
        userCount: wrapper.readInt()
    };

    return packet;
}
