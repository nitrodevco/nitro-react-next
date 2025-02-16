import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvailabilityStatusMessageType = {
    isOpen: boolean;
    onShutdown: boolean;
    isAuthenticUser: boolean;
};

export const AvailabilityStatusMessage: IIncomingPacket<AvailabilityStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvailabilityStatusMessageType = {
        isOpen: false,
        onShutdown: false,
        isAuthenticUser: false
    };

    packet.isOpen = wrapper.readBoolean();
    packet.onShutdown = wrapper.readBoolean();

    if (wrapper.bytesAvailable) packet.isAuthenticUser = wrapper.readBoolean();

    return packet;
};
