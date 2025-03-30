import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NavigatorCollapsedMessageType = {
    categories: string[];
};

export const NavigatorCollapsedMessage: IIncomingPacket<NavigatorCollapsedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NavigatorCollapsedMessageType = {
        categories: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.categories.push(wrapper.readString());

        count--;
    }

    return packet;
};
