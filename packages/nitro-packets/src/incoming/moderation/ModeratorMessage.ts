import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ModeratorMessageType = {
    message: string;
    url: string;
};

export const ModeratorMessage: IIncomingPacket<ModeratorMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ModeratorMessageType = {
        message: wrapper.readString(),
        url: wrapper.readString()
    };

    return packet;
};
