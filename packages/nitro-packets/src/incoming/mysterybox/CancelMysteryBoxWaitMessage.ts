import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CancelMysteryBoxWaitMessageType = {
};

export const CancelMysteryBoxWaitMessage: IIncomingPacket<CancelMysteryBoxWaitMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CancelMysteryBoxWaitMessageType = {};

    return packet;
};
