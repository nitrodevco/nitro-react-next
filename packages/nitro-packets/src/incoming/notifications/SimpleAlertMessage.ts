import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type SimpleAlertMessageType = {
    alertMessage: string;
    titleMessage: string;
};

export const SimpleAlertMessage: IIncomingPacket<SimpleAlertMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SimpleAlertMessageType = {
        alertMessage: wrapper.readString(),
        titleMessage: null
    };

    if (wrapper.bytesAvailable) packet.titleMessage = wrapper.readString();

    return packet;
};
