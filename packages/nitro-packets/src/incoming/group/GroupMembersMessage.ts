import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupMembersMessageType = {
    groupId: number;
    groupTitle: string;
    roomId: number;
    badge: string;
    totalMembersCount: number;
};

export const GroupMembersMessage: IIncomingPacket<GroupMembersMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupMembersMessageType = {
        groupId: 0,
        groupTitle: null,
        roomId: 0,
        badge: null,
        totalMembersCount: 0,
        result: [],
        admin: false,
        pageSize: 0,
        pageIndex: 0,
        level: 0,
        query: null,
    };

    packet.groupId = wrapper.readInt();
    packet.groupTitle = wrapper.readString();
    packet.roomId = wrapper.readInt();
    packet.badge = wrapper.readString();
    packet.totalMembersCount = wrapper.readInt();

    return packet;
};