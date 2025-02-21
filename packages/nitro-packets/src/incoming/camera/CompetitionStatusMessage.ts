import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CompetitionStatusMessageType = {
    ok: boolean;
    errorReason: string;
};

export const CompetitionStatusMessage: IIncomingPacket<CompetitionStatusMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CompetitionStatusMessageType = {
        ok: wrapper.readBoolean(),
        errorReason: wrapper.readString()
    };

    packet.ok = wrapper.readBoolean();
    packet.errorReason = wrapper.readString();

    return packet;
};
