import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingConfirmationMessageType = {
};

export const TradingConfirmationMessage: IIncomingPacket<TradingConfirmationMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingConfirmationMessageType = {};

    return packet;
};
