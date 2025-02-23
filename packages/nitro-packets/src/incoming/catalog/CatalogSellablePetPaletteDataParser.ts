import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogSellablePetPaletteData } from './ICatalogSellablePetPaletteData';

export const CatalogSellablePetPaletteDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICatalogSellablePetPaletteData = {
        type: wrapper.readInt(),
        breedId: wrapper.readInt(),
        paletteId: wrapper.readInt(),
        sellable: wrapper.readBoolean(),
        rare: wrapper.readBoolean()
    };

    return packet;
}
