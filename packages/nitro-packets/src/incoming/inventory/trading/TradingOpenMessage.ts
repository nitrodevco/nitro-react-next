import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type TradingOpenMessageType = {
    userId: number;
    userCanTrade: boolean;
    otherUserId: number;
    otherUserCanTrade: boolean;
};

export const TradingOpenMessage: IIncomingPacket<TradingOpenMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: TradingOpenMessageType = {
        userId: wrapper.readInt(),
        userCanTrade: (wrapper.readInt() === 1),
        otherUserId: wrapper.readInt(),
        otherUserCanTrade: (wrapper.readInt() === 1),
    };

    return packet;
};
