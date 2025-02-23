import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type LimitedOfferAppearingNextMessageType = {
    appearsInSeconds: number;
    pageId: number;
    offerId: number;
    productType: string;
};

export const LimitedOfferAppearingNextMessage: IIncomingPacket<LimitedOfferAppearingNextMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: LimitedOfferAppearingNextMessageType = {
        appearsInSeconds: wrapper.readInt(),
        pageId: wrapper.readInt(),
        offerId: wrapper.readInt(),
        productType: wrapper.readString()
    };

    return packet;
};
