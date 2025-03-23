import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type MarketplaceBuyOfferResultMessageType = {
    result: number;
    newOfferId: number;
    newPrice: number;
    requestedOfferId: number;
};

export const MarketplaceBuyOfferResultMessage: IIncomingPacket<MarketplaceBuyOfferResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: MarketplaceBuyOfferResultMessageType = {
        result: wrapper.readInt(),
        newOfferId: wrapper.readInt(),
        newPrice: wrapper.readInt(),
        requestedOfferId: wrapper.readInt()
    };

    return packet;
};
