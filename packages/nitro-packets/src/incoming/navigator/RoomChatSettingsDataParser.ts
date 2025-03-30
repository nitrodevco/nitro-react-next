import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomChatSettingsData } from './IRoomChatSettingsData';
import { RoomChatFilterTypeEnum } from './RoomChatFilterTypeEnum';
import { RoomChatModeTypeEnum } from './RoomChatModeTypeEnum';
import { RoomChatSpeedTypeEnum } from './RoomChatSpeedTypeEnum';
import { RoomChatWidthTypeEnum } from './RoomChatWidthTypeEnum';

export const RoomChatSettingsDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IRoomChatSettingsData = {
        mode: wrapper.readInt() as RoomChatModeTypeEnum,
        width: wrapper.readInt() as RoomChatWidthTypeEnum,
        speed: wrapper.readInt() as RoomChatSpeedTypeEnum,
        distance: wrapper.readInt(),
        protection: wrapper.readInt() as RoomChatFilterTypeEnum
    };

    return packet;
}
