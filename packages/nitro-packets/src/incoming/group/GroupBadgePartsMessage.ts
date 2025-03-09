import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GroupBadgePartsMessageType = {
    bases: Record<number, string[]>;
    symbols: Record<number, string[]>;
    partColors: Record<number, string>;
    colorsA: Record<number, string>;
    colorsB: Record<number, string>;
};

export const GroupBadgePartsMessage: IIncomingPacket<GroupBadgePartsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GroupBadgePartsMessageType = {
        bases: {},
        symbols: {},
        partColors: {},
        colorsA: {},
        colorsB: {}
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.bases[wrapper.readInt()] = [wrapper.readString(), wrapper.readString()];

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.symbols[wrapper.readInt()] = [wrapper.readString(), wrapper.readString()];

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.partColors[wrapper.readInt()] = wrapper.readString();

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.colorsA[wrapper.readInt()] = wrapper.readString();

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.colorsB[wrapper.readInt()] = wrapper.readString();

        count--;
    }

    return packet;
};
