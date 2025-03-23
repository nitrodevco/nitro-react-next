import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingCompletedMessageType = {
};

export const TradingCompletedMessage: IIncomingPacket<TradingCompletedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingCompletedMessageType = {};

    return packet;
};
