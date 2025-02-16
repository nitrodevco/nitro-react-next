import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IOutfitData } from './IOutfitData';

export const OutfitParser = (wrapper: IMessageDataWrapper): IOutfitData =>
{
    return {
        slotId: wrapper.readInt(),
        figureString: wrapper.readString(),
        gender: wrapper.readString()
    };
}
