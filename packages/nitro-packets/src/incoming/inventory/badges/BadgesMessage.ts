import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BadgesMessageType = {
    allBadgeCodes: string[];
    activeBadgeCodes: string[];
    badgeIds: Record<string, number>;
};

export const BadgesMessage: IIncomingPacket<BadgesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BadgesMessageType = {
        allBadgeCodes: [],
        activeBadgeCodes: [],
        badgeIds: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        const badgeId = wrapper.readInt();
        const badgeCode = wrapper.readString();

        packet.badgeIds[badgeCode] = badgeId;
        packet.allBadgeCodes.push(badgeCode);

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        const badgeSlot = wrapper.readInt();
        const badgeCode = wrapper.readString();

        packet.activeBadgeCodes.push(badgeCode);

        count--;
    }

    return packet;
};
