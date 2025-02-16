import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type SanctionStatusMessageType = {
    isSanctionNew: boolean;
    isSanctionActive: boolean;
    sanctionName: string;
    sanctionLengthHours: number;
    sanctionReason: string;
    sanctionCreationTime: string;
    probationHoursLeft: number;
    nextSanctionName: string;
    nextSanctionLengthHours: number;
    hasCustomMute: boolean;
    tradeLockExpiryTime: string;
};

export const SanctionStatusMessage: IIncomingPacket<SanctionStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SanctionStatusMessageType = {
        isSanctionNew: false,
        isSanctionActive: false,
        sanctionName: null,
        sanctionLengthHours: 0,
        sanctionReason: null,
        sanctionCreationTime: null,
        probationHoursLeft: 0,
        nextSanctionName: null,
        nextSanctionLengthHours: 0,
        hasCustomMute: false,
        tradeLockExpiryTime: null,
    };

    packet.isSanctionNew = wrapper.readBoolean();
    packet.isSanctionActive = wrapper.readBoolean();
    packet.sanctionName = wrapper.readString();
    packet.sanctionLengthHours = wrapper.readInt();

    wrapper.readInt();

    packet.sanctionReason = wrapper.readString();
    packet.sanctionCreationTime = wrapper.readString();
    packet.probationHoursLeft = wrapper.readInt();
    packet.nextSanctionName = wrapper.readString();
    packet.nextSanctionLengthHours = wrapper.readInt();

    wrapper.readInt();

    packet.hasCustomMute = wrapper.readBoolean();

    if (wrapper.bytesAvailable) packet.tradeLockExpiryTime = wrapper.readString();

    return packet;
};
