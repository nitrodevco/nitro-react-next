import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomEventData } from './IRoomEventData';
import { RoomEventDataParser } from './RoomEventDataParser';

type RoomEventMessageType = {
    data: IRoomEventData;
};

export const RoomEventMessage: IIncomingPacket<RoomEventMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomEventMessageType = {
        data: RoomEventDataParser(wrapper)
    };

    return packet;
};
