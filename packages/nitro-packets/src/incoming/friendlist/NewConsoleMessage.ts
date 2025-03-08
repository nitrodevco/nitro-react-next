import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type NewConsoleMessageType = {
    senderId: number;
    messageText: string;
    secondsSinceSent: number;
    extraData: string;
};

export const NewConsoleMessage: IIncomingPacket<NewConsoleMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: NewConsoleMessageType = {
        senderId: wrapper.readInt(),
        messageText: wrapper.readString(),
        secondsSinceSent: wrapper.readInt(),
        extraData: null
    };

    if (wrapper.bytesAvailable) packet.extraData = wrapper.readString();

    return packet;
};
