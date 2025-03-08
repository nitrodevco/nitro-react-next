import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { FriendDataParser } from './FriendDataParser';
import { IFriendData } from './IFriendData';

type FriendListFragmentMessageType = {
    totalFragments: number;
    fragmentNumber: number;
    fragment: IFriendData[];
};

export const FriendListFragmentMessage: IIncomingPacket<FriendListFragmentMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: FriendListFragmentMessageType = {
        totalFragments: wrapper.readInt(),
        fragmentNumber: wrapper.readInt(),
        fragment: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.fragment.push(FriendDataParser(wrapper));
        count--;
    }

    return packet;
};
