import { RoomChatFilterTypeEnum } from './RoomChatFilterTypeEnum';
import { RoomChatModeTypeEnum } from './RoomChatModeTypeEnum';
import { RoomChatSpeedTypeEnum } from './RoomChatSpeedTypeEnum';
import { RoomChatWidthTypeEnum } from './RoomChatWidthTypeEnum';

export interface IRoomChatSettingsData
{
    mode: RoomChatModeTypeEnum;
    width: RoomChatWidthTypeEnum;
    speed: RoomChatSpeedTypeEnum;
    distance: number;
    protection: RoomChatFilterTypeEnum;
}
