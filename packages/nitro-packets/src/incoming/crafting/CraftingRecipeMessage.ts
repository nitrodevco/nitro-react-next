import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CraftingRecipeIngredientDataParser } from './CraftingRecipeIngredientDataParser';
import { ICraftingRecipeIngredientData } from './ICraftingRecipeIngredientData';

type CraftingRecipeMessageType = {
    ingredients: ICraftingRecipeIngredientData[];
};

export const CraftingRecipeMessage: IIncomingPacket<CraftingRecipeMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CraftingRecipeMessageType = {
        ingredients: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.ingredients.push(CraftingRecipeIngredientDataParser(wrapper));

        count--;
    }

    return packet;
};
