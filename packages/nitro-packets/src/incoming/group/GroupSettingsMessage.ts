import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupSettingsMessageType = {
    roomId: number;
    roomName: string;
};

export const GroupSettingsMessage: IIncomingPacket<GroupSettingsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupSettingsMessageType = {
        roomId: 0,
        roomName: null,
        id: 0,
        title: null,
        description: null,
        colorA: 0,
        colorB: 0,
        state: 0,
        canMembersDecorate: false,
        badgeParts: false,
        badgeCode: null,
        membersCount: 0,
    };

    packet.roomId = wrapper.readInt();
    packet.roomName = wrapper.readString();

    return packet;
};