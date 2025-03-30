import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorLiftedData } from './INavigatorLiftedData';
import { NavigatorLiftedDataParser } from './NavigatorLiftedDataParser';

type NavigatorLiftedMessageType = {
    rooms: INavigatorLiftedData[];
};

export const NavigatorLiftedMessage: IIncomingPacket<NavigatorLiftedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorLiftedMessageType = {
        rooms: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.rooms.push(NavigatorLiftedDataParser(wrapper));

        count--;
    }

    return packet;
};
