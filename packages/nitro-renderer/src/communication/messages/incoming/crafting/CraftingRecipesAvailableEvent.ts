import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CraftingRecipesAvailableMessageParser } from '../../parser';

export class CraftingRecipesAvailableEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftingRecipesAvailableMessageParser);
    }

    public getParser(): CraftingRecipesAvailableMessageParser
    {
        return this.parser as CraftingRecipesAvailableMessageParser;
    }
}
