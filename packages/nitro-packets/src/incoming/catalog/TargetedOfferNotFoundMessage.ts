import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TargetedOfferNotFoundMessageType = {

};

export const TargetedOfferNotFoundMessage: IIncomingPacket<TargetedOfferNotFoundMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TargetedOfferNotFoundMessageType = {};

    return packet;
};
