import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingAcceptMessageType = {
    userID: number;
    userAccepts: boolean;
};

export const TradingAcceptMessage: IIncomingPacket<TradingAcceptMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingAcceptMessageType = {
        userID: wrapper.readInt(),
        userAccepts: (wrapper.readInt() > 0)
    };

    return packet;
};
