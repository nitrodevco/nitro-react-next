import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingYouAreNotAllowedMessageType = {
};

export const TradingYouAreNotAllowedMessage: IIncomingPacket<TradingYouAreNotAllowedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingYouAreNotAllowedMessageType = {};

    return packet;
};
