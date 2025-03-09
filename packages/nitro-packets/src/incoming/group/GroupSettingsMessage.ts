import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { GroupBadgePartDataParser } from './GroupBadgePartDataParser';
import { IGroupBadgePartData } from './IGroupBadgePartData';

type GroupSettingsMessageType = {
    roomId: number;
    roomName: string;
    unknownBooleanOne: boolean;
    unknownBooleanTwo: boolean;
    id: number;
    title: string;
    description: string;
    unknownIntOne: number;
    colorA: number;
    colorB: number;
    state: number;
    canMembersDecorate: boolean;
    unknownBooleanThree: boolean;
    unknownStringOne: string;
    badgeParts: IGroupBadgePartData[];
    badgeCode: string;
    membersCount: number;
};

export const GroupSettingsMessage: IIncomingPacket<GroupSettingsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupSettingsMessageType = {
        roomId: 0,
        roomName: null,
        unknownBooleanOne: false,
        unknownBooleanTwo: false,
        id: 0,
        title: null,
        description: null,
        unknownIntOne: 0,
        colorA: 0,
        colorB: 0,
        state: 0,
        canMembersDecorate: false,
        unknownBooleanThree: false,
        unknownStringOne: null,
        badgeParts: [],
        badgeCode: null,
        membersCount: 0,
    };

    const hasRoomData = wrapper.readInt();

    if (hasRoomData === 1)
    {
        packet.roomId = wrapper.readInt();
        packet.roomName = wrapper.readString();
        packet.unknownBooleanOne = wrapper.readBoolean();
    }

    packet.unknownBooleanTwo = wrapper.readBoolean();

    packet.id = wrapper.readInt();
    packet.title = wrapper.readString();
    packet.description = wrapper.readString();
    packet.unknownIntOne = wrapper.readInt();
    packet.colorA = wrapper.readInt();
    packet.colorB = wrapper.readInt();
    packet.state = wrapper.readInt();
    packet.canMembersDecorate = (wrapper.readInt() === 0);
    packet.unknownBooleanThree = wrapper.readBoolean();
    packet.unknownStringOne = wrapper.readString();

    let count = wrapper.readInt();
    let isBase = true;

    while (count > 0)
    {
        const part = GroupBadgePartDataParser(wrapper);

        if (isBase)
        {
            part.isBase = true;
            isBase = false;
        }

        packet.badgeParts.push(part);

        count--;
    }

    packet.badgeCode = wrapper.readString();
    packet.membersCount = wrapper.readInt();

    return packet;
};
