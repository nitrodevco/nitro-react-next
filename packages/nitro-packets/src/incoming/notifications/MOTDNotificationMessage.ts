import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MOTDNotificationMessageType = {
    messages: string[];
};

export const MOTDNotificationMessage: IIncomingPacket<MOTDNotificationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MOTDNotificationMessageType = {
        messages: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.messages.push(wrapper.readString());

        count--;
    }

    return packet;
};
