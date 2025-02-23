import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CatalogSellablePetPaletteDataParser } from './CatalogSellablePetPaletteDataParser';
import { ICatalogSellablePetPaletteData } from './ICatalogSellablePetPaletteData';

type SellablePetPalettesMessageType = {
    productCode: string;
    palettes: ICatalogSellablePetPaletteData[];
};

export const SellablePetPalettesMessage: IIncomingPacket<SellablePetPalettesMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: SellablePetPalettesMessageType = {
        productCode: wrapper.readString(),
        palettes: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.palettes.push(CatalogSellablePetPaletteDataParser(wrapper));

        count--;
    }

    return packet;
};
