import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvailabilityStatusMessageType = {
    isOpen: boolean;
    onShutdown: boolean;
    isAuthenticUser: boolean;
};

export const AvailabilityStatusMessage: IIncomingPacket<AvailabilityStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvailabilityStatusMessageType = {
        isOpen: wrapper.readBoolean(),
        onShutdown: wrapper.readBoolean(),
        isAuthenticUser: false
    };

    if (wrapper.bytesAvailable) packet.isAuthenticUser = wrapper.readBoolean();

    return packet;
};
