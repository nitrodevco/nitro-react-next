import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { GroupMemberDataParser } from './GroupMemberDataParser';
import { IGroupMemberData } from './IGroupMemberData';

type GroupMembersMessageType = {
    groupId: number;
    groupTitle: string;
    roomId: number;
    badge: string;
    totalMembersCount: number;
    members: IGroupMemberData[];
    admin: boolean;
    pageSize: number;
    pageIndex: number;
    level: number;
    query: string;
};

export const GroupMembersMessage: IIncomingPacket<GroupMembersMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupMembersMessageType = {
        groupId: wrapper.readInt(),
        groupTitle: wrapper.readString(),
        roomId: wrapper.readInt(),
        badge: wrapper.readString(),
        totalMembersCount: wrapper.readInt(),
        members: [],
    } as GroupMembersMessageType

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.members.push(GroupMemberDataParser(wrapper));

        count--;
    }

    packet.admin = wrapper.readBoolean();
    packet.pageSize = wrapper.readInt();
    packet.pageIndex = wrapper.readInt();
    packet.level = wrapper.readInt();
    packet.query = wrapper.readString();

    return packet;
};
