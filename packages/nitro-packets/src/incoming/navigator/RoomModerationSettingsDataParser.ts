import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomModerationSettingsData } from './IRoomModerationSettingsData';
import { RoomModerationTypeEnum } from './RoomModerationTypeEnum';

export const RoomModerationSettingsDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomModerationSettingsData = {
        allowMute: wrapper.readInt() as RoomModerationTypeEnum,
        allowKick: wrapper.readInt() as RoomModerationTypeEnum,
        allowBan: wrapper.readInt() as RoomModerationTypeEnum
    };

    return packet;
}
