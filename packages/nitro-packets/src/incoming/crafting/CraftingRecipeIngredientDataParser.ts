import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICraftingRecipeIngredientData } from './ICraftingRecipeIngredientData';

export const CraftingRecipeIngredientDataParser = (wrapper: IMessageDataWrapper): ICraftingRecipeIngredientData =>
{
    const packet = {
        count: wrapper.readInt(),
        itemName: wrapper.readString()
    } as ICraftingRecipeIngredientData;

    return packet;
}
