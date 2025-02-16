import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CompetitionStatusMessageType = {
    ok: boolean;
    errorReason: string;
};

export const CompetitionStatusMessage: IIncomingPacket<CompetitionStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CompetitionStatusMessageType = {
        ok: false,
        errorReason: null
    };

    packet.ok = wrapper.readBoolean();
    packet.errorReason = wrapper.readString();

    return packet;
};
