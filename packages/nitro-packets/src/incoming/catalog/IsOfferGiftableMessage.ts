import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type IsOfferGiftableMessageType = {
    offerId: number;
    isGiftable: boolean;
};

export const IsOfferGiftableMessage: IIncomingPacket<IsOfferGiftableMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: IsOfferGiftableMessageType = {
        offerId: 0,
        isGiftable: false,
    };

    packet.offerId = wrapper.readInt();
    packet.isGiftable = wrapper.readBoolean();

    return packet;
};