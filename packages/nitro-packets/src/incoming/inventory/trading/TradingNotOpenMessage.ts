import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingNotOpenMessageType = {
};

export const TradingNotOpenMessage: IIncomingPacket<TradingNotOpenMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingNotOpenMessageType = {};

    return packet;
};
