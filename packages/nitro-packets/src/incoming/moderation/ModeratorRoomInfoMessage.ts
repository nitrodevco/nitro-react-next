import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomModerationData } from './IRoomModerationData';
import { RoomModerationDataParser } from './RoomModerationDataParser';

type ModeratorRoomInfoMessageType = {
    data: IRoomModerationData;
};

export const ModeratorRoomInfoMessage: IIncomingPacket<ModeratorRoomInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModeratorRoomInfoMessageType = {
        data: RoomModerationDataParser(wrapper)
    };

    return packet;
};
