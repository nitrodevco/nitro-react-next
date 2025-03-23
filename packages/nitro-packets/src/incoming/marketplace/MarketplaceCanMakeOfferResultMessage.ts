import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MarketplaceCanMakeOfferResultMessageType = {
    result: number;
    tokenCount: number;
};

export const MarketplaceCanMakeOfferResultMessage: IIncomingPacket<MarketplaceCanMakeOfferResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceCanMakeOfferResultMessageType = {
        result: wrapper.readInt(),
        tokenCount: wrapper.readInt()
    };

    return packet;
};
