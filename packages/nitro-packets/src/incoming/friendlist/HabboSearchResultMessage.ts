import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { HabboSearchResultDataParser } from './HabboSearchResultDataParser';
import { IHabboSearchResultData } from './IHabboSearchResultData';

type HabboSearchResultMessageType = {
    friends: IHabboSearchResultData[];
    others: IHabboSearchResultData[];
};

export const HabboSearchResultMessage: IIncomingPacket<HabboSearchResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: HabboSearchResultMessageType = {
        friends: [],
        others: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.friends.push(HabboSearchResultDataParser(wrapper));

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.others.push(HabboSearchResultDataParser(wrapper));
    }

    return packet;
};
