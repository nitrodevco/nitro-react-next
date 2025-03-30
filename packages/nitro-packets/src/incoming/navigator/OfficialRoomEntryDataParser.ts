import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IOfficialRoomEntryData } from './IOfficialRoomEntryData';
import { OfficialRoomEntryTypeEnum } from './OfficialRoomEntryTypeEnum';
import { RoomDataParser } from './RoomDataParser';

export const OfficialRoomEntryDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IOfficialRoomEntryData = {
        index: wrapper.readInt(),
        popupCaption: wrapper.readString(),
        popupDesc: wrapper.readString(),
        showDetails: (wrapper.readInt() === 1),
        picText: wrapper.readString(),
        picRef: wrapper.readString(),
        folderId: wrapper.readInt(),
        userCount: wrapper.readInt(),
        type: wrapper.readInt() as OfficialRoomEntryTypeEnum,
        tag: null,
        guestRoomData: null,
        open: false
    };

    switch (packet.type)
    {
        case OfficialRoomEntryTypeEnum.Tag:
            packet.tag = wrapper.readString();
            break;
        case OfficialRoomEntryTypeEnum.GuestRoom:
            packet.guestRoomData = RoomDataParser(wrapper);
            break;
        case OfficialRoomEntryTypeEnum.Folder:
            packet.open = wrapper.readBoolean();
            break;
    }

    return packet;
}
