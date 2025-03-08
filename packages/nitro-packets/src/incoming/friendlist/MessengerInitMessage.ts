import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FriendCategoryDataParser } from './FriendCategoryDataParser';
import { IFriendCategoryData } from './IFriendCategoryData';

type MessengerInitMessageType = {
    userFriendLimit: number;
    normalFriendLimit: number;
    extendedFriendLimit: number;
    categories: IFriendCategoryData[];
};

export const MessengerInitMessage: IIncomingPacket<MessengerInitMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MessengerInitMessageType = {
        userFriendLimit: wrapper.readInt(),
        normalFriendLimit: wrapper.readInt(),
        extendedFriendLimit: wrapper.readInt(),
        categories: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.categories.push(FriendCategoryDataParser(wrapper));

        count--;
    }

    return packet;
};
