import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CraftingRecipeMessageParser } from '../../parser';

export class CraftingRecipeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftingRecipeMessageParser);
    }

    public getParser(): CraftingRecipeMessageParser
    {
        return this.parser as CraftingRecipeMessageParser;
    }
}
