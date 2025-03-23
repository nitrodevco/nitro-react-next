import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingOtherNotAllowedMessageType = {
};

export const TradingOtherNotAllowedMessage: IIncomingPacket<TradingOtherNotAllowedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingOtherNotAllowedMessageType = {};

    return packet;
};
