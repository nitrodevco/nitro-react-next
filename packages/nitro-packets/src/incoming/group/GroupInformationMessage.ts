import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupInformationMessageType = {
    id: number;
    type: number;
    title: string;
    description: string;
    badge: string;
    roomId: number;
    roomName: string;
    membershipType: number;
    membersCount: number;
    isFavorite: boolean;
    createdAt: string;
    isOwner: boolean;
    isAdmin: boolean;
    ownerName: string;
    flag: boolean;
    canMembersDecorate: boolean;
    pendingRequestsCount: number;
};

export const GroupInformationMessage: IIncomingPacket<GroupInformationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupInformationMessageType = {
        id: 0,
        type: 0,
        title: null,
        description: null,
        badge: null,
        roomId: 0,
        roomName: null,
        membershipType: 0,
        membersCount: 0,
        isFavorite: false,
        createdAt: null,
        isOwner: false,
        isAdmin: false,
        ownerName: null,
        flag: false,
        canMembersDecorate: false,
        pendingRequestsCount: 0,
    };

    packet.id = wrapper.readInt();
    packet.type = wrapper.readInt();
    packet.title = wrapper.readString();
    packet.description = wrapper.readString();
    packet.badge = wrapper.readString();
    packet.roomId = wrapper.readInt();
    packet.roomName = wrapper.readString();
    packet.membershipType = wrapper.readInt();
    packet.membersCount = wrapper.readInt();
    packet.isFavorite = wrapper.readBoolean();
    packet.createdAt = wrapper.readString();
    packet.isOwner = wrapper.readBoolean();
    packet.isAdmin = wrapper.readBoolean();
    packet.ownerName = wrapper.readString();
    packet.flag = wrapper.readBoolean();
    packet.canMembersDecorate = wrapper.readBoolean();
    packet.pendingRequestsCount = wrapper.readInt();

    return packet;
};