import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomEntryData } from './IRoomEntryData';

export const RoomEntryDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomEntryData = {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        hasControllers: wrapper.readBoolean()
    };

    return packet;
}
