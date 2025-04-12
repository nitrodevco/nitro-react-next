import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NotificationDialogMessageType = {
    type: string;
    parameters: Record<string, string>;
};

export const NotificationDialogMessage: IIncomingPacket<NotificationDialogMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NotificationDialogMessageType = {
        type: wrapper.readString(),
        parameters: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.parameters[wrapper.readString()] = wrapper.readString();

        count--;
    }

    return packet;
};
