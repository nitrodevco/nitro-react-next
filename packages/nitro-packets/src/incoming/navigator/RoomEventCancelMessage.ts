import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type RoomEventCancelMessageType = {
};

export const RoomEventCancelMessage: IIncomingPacket<RoomEventCancelMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomEventCancelMessageType = {};

    return packet;
};
