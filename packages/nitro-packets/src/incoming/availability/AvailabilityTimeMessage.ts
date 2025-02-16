import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type AvailabilityTimeMessageType = {
    isOpen: boolean;
    minutesUntilChange: number;
};

export const AvailabilityTimeMessage: IIncomingPacket<AvailabilityTimeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: AvailabilityTimeMessageType = {
        isOpen: false,
        minutesUntilChange: 0
    };

    packet.isOpen = (wrapper.readInt() > 0);
    packet.minutesUntilChange = wrapper.readInt();

    return packet;
};
