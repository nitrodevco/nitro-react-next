import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type IsUserPartOfCompetitionMessageType = {
    isPartOf: boolean;
    targetId: number;
};

export const IsUserPartOfCompetitionMessage: IIncomingPacket<IsUserPartOfCompetitionMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IsUserPartOfCompetitionMessageType = {
        isPartOf: wrapper.readBoolean(),
        targetId: wrapper.readInt(),
    };

    return packet;
};
