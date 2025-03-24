import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomVisitData } from './IRoomVisitData';

export const RoomVisitDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomVisitData = {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        enterHour: wrapper.readInt(),
        enterMinute: wrapper.readInt()
    };

    return packet;
}
