import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { DoorModeTypeEnum } from './DoorModeTypeEnum';
import { IRoomData } from './IRoomData';
import { RoomBitmaskTypeEnum } from './RoomBitmaskTypeEnum';
import { TradeModeTypeEnum } from './TradeModeTypeEnum';

export const RoomDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        ownerId: wrapper.readInt(),
        ownerName: wrapper.readString(),
        doorMode: wrapper.readInt() as DoorModeTypeEnum,
        userCount: wrapper.readInt(),
        maxUserCount: wrapper.readInt(),
        description: wrapper.readString(),
        tradeMode: wrapper.readInt() as TradeModeTypeEnum,
        score: wrapper.readInt(),
        ranking: wrapper.readInt(),
        categoryId: wrapper.readInt(),
        tags: []
    } as IRoomData;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.tags.push(wrapper.readString());

        count--;
    }

    packet.bitMask = wrapper.readInt();

    if (packet.bitMask & RoomBitmaskTypeEnum.Thumbnail) packet.officialRoomPicRef = wrapper.readString();

    if (packet.bitMask & RoomBitmaskTypeEnum.GroupData)
    {
        packet.groupId = wrapper.readInt();
        packet.groupName = wrapper.readString();
        packet.groupBadge = wrapper.readString();
    }

    if (packet.bitMask & RoomBitmaskTypeEnum.RoomAd)
    {
        packet.adName = wrapper.readString();
        packet.adDescription = wrapper.readString();
        packet.adExpiresIn = wrapper.readInt();
    }

    packet.showOwner = (packet.bitMask & RoomBitmaskTypeEnum.ShowOwner) > 0;
    packet.allowPets = (packet.bitMask & RoomBitmaskTypeEnum.AllowPets) > 0;
    packet.displayAd = (packet.bitMask & RoomBitmaskTypeEnum.DisplayAd) > 0;

    return packet;
}
