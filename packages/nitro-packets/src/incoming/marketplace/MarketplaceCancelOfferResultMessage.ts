import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MarketplaceCancelOfferResultMessageType = {
    offerId: number;
    success: boolean;
};

export const MarketplaceCancelOfferResultMessage: IIncomingPacket<MarketplaceCancelOfferResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceCancelOfferResultMessageType = {
        offerId: wrapper.readInt(),
        success: wrapper.readBoolean()
    };

    return packet;
};
