import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICraftingRecipeIngredientData } from './ICraftingRecipeIngredientData';

export const CraftingRecipeIngredientDataParser = (wrapper: IMessageDataWrapper): ICraftingRecipeIngredientData =>
{
    const packet: ICraftingRecipeIngredientData = {
        count: wrapper.readInt(),
        itemName: wrapper.readString()
    };

    return packet;
}
