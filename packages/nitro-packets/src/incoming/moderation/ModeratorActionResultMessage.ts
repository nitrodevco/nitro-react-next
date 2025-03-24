import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ModeratorActionResultMessageType = {
    userId: number;
    success: boolean;
};

export const ModeratorActionResultMessage: IIncomingPacket<ModeratorActionResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModeratorActionResultMessageType = {
        userId: wrapper.readInt(),
        success: wrapper.readBoolean(),
    };

    return packet;
};
