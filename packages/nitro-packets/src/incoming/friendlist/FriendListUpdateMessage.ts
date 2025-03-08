import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FriendCategoryDataParser } from './FriendCategoryDataParser';
import { FriendDataParser } from './FriendDataParser';
import { IFriendCategoryData } from './IFriendCategoryData';
import { IFriendData } from './IFriendData';

type FriendListUpdateMessageType = {
    categories: IFriendCategoryData[];
    removedFriendIds: number[];
    addedFriends: IFriendData[];
    updatedFriends: IFriendData[];
};

export const FriendListUpdateMessage: IIncomingPacket<FriendListUpdateMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FriendListUpdateMessageType = {
        categories: [],
        removedFriendIds: [],
        addedFriends: [],
        updatedFriends: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.categories.push(FriendCategoryDataParser(wrapper));

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        const type = wrapper.readInt();

        if (type === -1)
        {
            packet.removedFriendIds.push(wrapper.readInt());
        }

        else if (type === 0)
        {
            packet.updatedFriends.push(FriendDataParser(wrapper));
        }

        else if (type === 1)
        {
            packet.addedFriends.push(FriendDataParser(wrapper));
        }

        count--;
    }

    return packet;
};
