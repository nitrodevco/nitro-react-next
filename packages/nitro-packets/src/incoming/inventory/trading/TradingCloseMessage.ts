import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { TradingCloseReasonEnum } from './TradingCloseReasonEnum';

type TradingCloseMessageType = {
    userId: number;
    reason: TradingCloseReasonEnum;
};

export const TradingCloseMessage: IIncomingPacket<TradingCloseMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingCloseMessageType = {
        userId: wrapper.readInt(),
        reason: wrapper.readInt() as TradingCloseReasonEnum
    };

    return packet;
};
