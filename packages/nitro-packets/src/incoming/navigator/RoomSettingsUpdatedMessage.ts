import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomSettingsUpdatedMessageType = {
    roomId: number;
};

export const RoomSettingsUpdatedMessage: IIncomingPacket<RoomSettingsUpdatedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomSettingsUpdatedMessageType = {
        roomId: wrapper.readInt()
    };

    return packet;
};
