import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type SellablePetPalettesParserType = {
    productCode: string;
};

export const SellablePetPalettesParser: IIncomingPacket<SellablePetPalettesParserType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SellablePetPalettesParserType = {
        productCode: '',
        palettes: [],
    };

    packet.productCode = wrapper.readString();

    return packet;
};