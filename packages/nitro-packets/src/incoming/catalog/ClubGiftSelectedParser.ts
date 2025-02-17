import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type ClubGiftSelectedParserType = {
    productCode: string;
};

export const ClubGiftSelectedParser: IIncomingPacket<ClubGiftSelectedParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: ClubGiftSelectedParserType = {
        productCode: null,
        products: [],
    };

    packet.productCode = wrapper.readString();

    return packet;
};