import { RoomModerationTypeEnum } from './RoomModerationTypeEnum';

export interface IRoomModerationSettingsData
{
    allowMute: RoomModerationTypeEnum;
    allowKick: RoomModerationTypeEnum;
    allowBan: RoomModerationTypeEnum;
}
