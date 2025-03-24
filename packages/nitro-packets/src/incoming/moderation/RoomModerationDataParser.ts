import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomModerationData } from './IRoomModerationData';
import { ModRoomDataParser } from './ModRoomDataParser';

export const RoomModerationDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomModerationData = {
        flatId: wrapper.readInt(),
        userCount: wrapper.readInt(),
        ownerInRoom: wrapper.readBoolean(),
        ownerId: wrapper.readInt(),
        ownerName: wrapper.readString(),
        room: ModRoomDataParser(wrapper)
    };

    return packet;
}
