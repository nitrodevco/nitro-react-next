import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IRoomChatSettingsData } from './IRoomChatSettingsData';
import { IRoomData } from './IRoomData';
import { IRoomModerationSettingsData } from './IRoomModerationSettingsData';
import { RoomChatSettingsDataParser } from './RoomChatSettingsDataParser';
import { RoomDataParser } from './RoomDataParser';
import { RoomModerationSettingsDataParser } from './RoomModerationSettingsDataParser';

type GetGuestRoomResultMessageType = {
    roomEnter: boolean;
    roomForward: boolean;
    data: IRoomData;
    staffPick: boolean;
    isGroupMember: boolean;
    moderation: IRoomModerationSettingsData;
    chat: IRoomChatSettingsData;
};

export const GetGuestRoomResultMessage: IIncomingPacket<GetGuestRoomResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GetGuestRoomResultMessageType = {
        roomEnter: wrapper.readBoolean(),
        data: RoomDataParser(wrapper),
        roomForward: wrapper.readBoolean(),
        staffPick: wrapper.readBoolean(),
        isGroupMember: wrapper.readBoolean(),
        moderation: null,
        chat: null
    };

    packet.data.allInRoomMuted = wrapper.readBoolean();
    packet.moderation = RoomModerationSettingsDataParser(wrapper);
    packet.data.canMute = wrapper.readBoolean();
    packet.chat = RoomChatSettingsDataParser(wrapper);

    return packet;
};
