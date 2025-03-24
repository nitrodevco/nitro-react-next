import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomVisitsData } from './IRoomVisitsData';
import { RoomVisitsDataParser } from './RoomVisitsDataParser';

type RoomVisitsMessageType = {
    data: IRoomVisitsData;
};

export const RoomVisitsMessage: IIncomingPacket<RoomVisitsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: RoomVisitsMessageType = {
        data: RoomVisitsDataParser(wrapper)
    };

    return packet;
};
