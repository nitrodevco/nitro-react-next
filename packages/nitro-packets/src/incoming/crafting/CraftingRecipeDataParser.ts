import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICraftingRecipeData } from './ICraftingRecipeData';

export const CraftingRecipeDataParser = (wrapper: IMessageDataWrapper): ICraftingRecipeData =>
{
    const packet: ICraftingRecipeData = {
        recipeName: wrapper.readString(),
        itemName: wrapper.readString()
    };

    return packet;
}
