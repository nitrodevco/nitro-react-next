import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CraftingRecipeDataParser } from './CraftingRecipeDataParser';
import { ICraftingRecipeData } from './ICraftingRecipeData';

type CraftableProductsMessageType = {
    recipes: ICraftingRecipeData[];
    ingredients: string[];
};

export const CraftableProductsMessage: IIncomingPacket<CraftableProductsMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CraftableProductsMessageType = {
        recipes: [],
        ingredients: [],
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.recipes.push(CraftingRecipeDataParser(wrapper));

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.ingredients.push(wrapper.readString());

        count--;
    }

    return packet;
};
