import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type DirectSMSClubBuyAvailableMessageType = {
    pricePointUrl: string;
    market: string;
    lengthInDays: number;
};

export const DirectSMSClubBuyAvailableMessage: IIncomingPacket<DirectSMSClubBuyAvailableMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: DirectSMSClubBuyAvailableMessageType = {
        available: false,
        pricePointUrl: null,
        market: null,
        lengthInDays: 0,
    };

    packet.pricePointUrl = wrapper.readString();
    packet.market = wrapper.readString();
    packet.lengthInDays = wrapper.readInt();

    return packet;
};