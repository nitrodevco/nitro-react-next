import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type GiftReceiverNotFoundMessageType = {

};

export const GiftReceiverNotFoundMessage: IIncomingPacket<GiftReceiverNotFoundMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: GiftReceiverNotFoundMessageType = {};

    return packet;
};
