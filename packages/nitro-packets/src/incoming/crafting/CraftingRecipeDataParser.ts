import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICraftingRecipeData } from './ICraftingRecipeData';

export const CraftingRecipeDataParser = (wrapper: IMessageDataWrapper): ICraftingRecipeData =>
{
    const packet = {
        recipeName: wrapper.readString(),
        itemName: wrapper.readString()
    } as ICraftingRecipeData;

    return packet;
}
