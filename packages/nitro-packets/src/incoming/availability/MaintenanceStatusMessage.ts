import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MaintenanceStatusMessageType = {
    isInMaintenance: boolean;
    minutesUntilMaintenance: number;
    duration: number;
};

export const MaintenanceStatusMessage: IIncomingPacket<MaintenanceStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MaintenanceStatusMessageType = {
        isInMaintenance: wrapper.readBoolean(),
        minutesUntilMaintenance: wrapper.readInt(),
        duration: 15
    };

    if (wrapper.bytesAvailable) packet.duration = wrapper.readInt();

    return packet;
};
