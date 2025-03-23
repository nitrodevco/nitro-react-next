import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { TradingOpenFailedEnum } from './TradingOpenFailedEnum';

type TradingOpenFailedMessageType = {
    reason: TradingOpenFailedEnum;
    otherUserName: string;
};

export const TradingOpenFailedMessage: IIncomingPacket<TradingOpenFailedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingOpenFailedMessageType = {
        reason: wrapper.readInt() as TradingOpenFailedEnum,
        otherUserName: wrapper.readString()
    };

    return packet;
};
