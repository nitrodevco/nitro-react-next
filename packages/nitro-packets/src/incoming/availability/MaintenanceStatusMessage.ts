import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MaintenanceStatusMessageType = {
    isInMaintenance: boolean;
    minutesUntilMaintenance: number;
    duration: number;
};

export const MaintenanceStatusMessage: IIncomingPacket<MaintenanceStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MaintenanceStatusMessageType = {
        isInMaintenance: false,
        minutesUntilMaintenance: 0,
        duration: 15
    };

    packet.isInMaintenance = wrapper.readBoolean();
    packet.minutesUntilMaintenance = wrapper.readInt();

    if (wrapper.bytesAvailable) packet.duration = wrapper.readInt();

    return packet;
};
