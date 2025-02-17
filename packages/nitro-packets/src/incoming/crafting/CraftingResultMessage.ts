import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { CraftingRecipeDataParser } from './CraftingRecipeDataParser';
import { ICraftingRecipeData } from './ICraftingRecipeData';

type CraftingResultMessageType = {
    success: boolean;
    result: ICraftingRecipeData;
};

export const CraftingResultMessage: IIncomingPacket<CraftingResultMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: CraftingResultMessageType = {
        success: wrapper.readBoolean(),
        result: null
    };

    if (packet.success) packet.result = CraftingRecipeDataParser(wrapper);

    return packet;
};
