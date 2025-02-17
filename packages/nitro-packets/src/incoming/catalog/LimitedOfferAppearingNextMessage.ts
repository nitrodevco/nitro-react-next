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
        appearsInSeconds: -1,
        pageId: -1,
        offerId: -1,
        productType: '',
    };

    packet.appearsInSeconds = wrapper.readInt();
    packet.pageId = wrapper.readInt();
    packet.offerId = wrapper.readInt();
    packet.productType = wrapper.readString();

    return packet;
};