import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type LimitedEditionSoldOutMessageType = {

};

export const LimitedEditionSoldOutMessage: IIncomingPacket<LimitedEditionSoldOutMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: LimitedEditionSoldOutMessageType = {};

    return packet;
};
