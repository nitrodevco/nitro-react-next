import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type BonusRareInfoMessageType = {
    productType: string;
    productClassId: number;
    totalCoinsForBonus: number;
    coinsStillRequiredToBuy: number;
};

export const BonusRareInfoMessage: IIncomingPacket<BonusRareInfoMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BonusRareInfoMessageType = {
        totalCoinsForBonus: -1,
        coinsStillRequiredToBuy: -1,
        productType: '',
        productClassId: -1
    };

    packet.productType = wrapper.readString();
    packet.productClassId = wrapper.readInt();
    packet.totalCoinsForBonus = wrapper.readInt();
    packet.coinsStillRequiredToBuy = wrapper.readInt();

    return packet;
};
