import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ShowMysteryBoxWaitMessageType = {
};

export const ShowMysteryBoxWaitMessage: IIncomingPacket<ShowMysteryBoxWaitMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ShowMysteryBoxWaitMessageType = {};

    return packet;
};
