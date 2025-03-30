import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { INavigatorTopLevelContextData } from './INavigatorTopLevelContextData';
import { NavigatorTopLevelContextDataParser } from './NavigatorTopLevelContextDataParser';

type NavigatorMetadataMessageType = {
    topLevelContexts: INavigatorTopLevelContextData[];
};

export const NavigatorMetadataMessage: IIncomingPacket<NavigatorMetadataMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorMetadataMessageType = {
        topLevelContexts: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.topLevelContexts.push(NavigatorTopLevelContextDataParser(wrapper));

        count--;
    }

    return packet;
};
