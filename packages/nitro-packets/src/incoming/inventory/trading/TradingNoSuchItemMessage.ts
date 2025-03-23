import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingNoSuchItemMessageType = {
};

export const TradingNoSuchItemMessage: IIncomingPacket<TradingNoSuchItemMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingNoSuchItemMessageType = {};

    return packet;
};
