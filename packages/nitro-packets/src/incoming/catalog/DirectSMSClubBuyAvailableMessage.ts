import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type DirectSMSClubBuyAvailableMessageType = {
    pricePointUrl: string;
    available: boolean;
    market: string;
    lengthInDays: number;
};

export const DirectSMSClubBuyAvailableMessage: IIncomingPacket<DirectSMSClubBuyAvailableMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: DirectSMSClubBuyAvailableMessageType = {
        pricePointUrl: wrapper.readString(),
        available: false,
        market: wrapper.readString(),
        lengthInDays: wrapper.readInt()
    };

    return packet;
};
