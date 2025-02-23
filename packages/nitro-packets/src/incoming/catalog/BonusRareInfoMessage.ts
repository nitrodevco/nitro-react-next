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
        productType: wrapper.readString(),
        productClassId: wrapper.readInt(),
        totalCoinsForBonus: wrapper.readInt(),
        coinsStillRequiredToBuy: wrapper.readInt()
    };

    return packet;
};
