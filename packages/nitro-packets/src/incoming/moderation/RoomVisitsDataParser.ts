import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomVisitsData } from './IRoomVisitsData';
import { RoomVisitDataParser } from './RoomVisitDataParser';

export const RoomVisitsDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomVisitsData = {
        userId: wrapper.readInt(),
        userName: wrapper.readString(),
        rooms: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.rooms.push(RoomVisitDataParser(wrapper));

        count--;
    }

    return packet;
}
