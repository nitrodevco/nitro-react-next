import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupInformationMessageType = {
    id: number;
    someBoolean: boolean;
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
        id: wrapper.readInt(),
        someBoolean: wrapper.readBoolean(),
        type: wrapper.readInt(),
        title: wrapper.readString(),
        description: wrapper.readString(),
        badge: wrapper.readString(),
        roomId: wrapper.readInt(),
        roomName: wrapper.readString(),
        membershipType: wrapper.readInt(),
        membersCount: wrapper.readInt(),
        isFavorite: wrapper.readBoolean(),
        createdAt: wrapper.readString(),
        isOwner: wrapper.readBoolean(),
        isAdmin: wrapper.readBoolean(),
        ownerName: wrapper.readString(),
        flag: wrapper.readBoolean(),
        canMembersDecorate: wrapper.readBoolean(),
        pendingRequestsCount: wrapper.readInt()
    };

    return packet;
};
