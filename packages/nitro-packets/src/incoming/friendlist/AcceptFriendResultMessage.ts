import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { AcceptFriendFailureDataParser } from './AcceptFriendFailureDataParser';
import { IAcceptFriendFailureData } from './IAcceptFriendFailureData';

type AcceptFriendResultMessageType = {
    failures: IAcceptFriendFailureData[];
};

export const AcceptFriendResultMessage: IIncomingPacket<AcceptFriendResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AcceptFriendResultMessageType = {
        failures: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.failures.push(AcceptFriendFailureDataParser(wrapper));

        count--;
    }

    return packet;
};
