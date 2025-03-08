import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IFriendCategoryData } from './IFriendCategoryData';

export const FriendCategoryDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IFriendCategoryData = {
        id: wrapper.readInt(),
        name: wrapper.readString()
    };

    return packet;
}
