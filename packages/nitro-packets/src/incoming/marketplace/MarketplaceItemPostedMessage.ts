import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MarketplaceItemPostedMessageType = {
    result: number;
};

export const MarketplaceItemPostedMessage: IIncomingPacket<MarketplaceItemPostedMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceItemPostedMessageType = {
        result: wrapper.readInt()
    };

    return packet;
};
