import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';

type CraftingRecipesAvailableMessageType = {
    count: number;
    hasRecipes: boolean;
};

export const CraftingRecipesAvailableMessage: IIncomingPacket<CraftingRecipesAvailableMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CraftingRecipesAvailableMessageType = {
        count: wrapper.readInt(),
        hasRecipes: wrapper.readBoolean()
    };

    return packet;
};
